from __future__ import annotations

import csv
import json
import os
import socket
import sqlite3
import subprocess
import sys
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse


APP_DIR = Path(sys.executable).resolve().parent if getattr(sys, "frozen", False) else Path(__file__).resolve().parent
DB_PATH = APP_DIR / "learning_progress.sqlite3"
HOST = "0.0.0.0"
PORT = 8765


def material_root() -> Path:
    candidates = [APP_DIR.parent, APP_DIR.parent.parent]
    for candidate in candidates:
        if (candidate / "Rivstart A1 + A2 - Updated Version").exists():
            return candidate
    return APP_DIR.parent


MATERIAL_ROOT = material_root()
TEXTBOOK_DIR = MATERIAL_ROOT / "Rivstart A1 + A2 - Updated Version" / "Rivstart A1 + A2 - Text Book"
WORKBOOK_DIR = MATERIAL_ROOT / "Rivstart A1 + A2 - Övningsbok- Updated Version" / "Rivstart A1 + A2 - Övningsbok"
RELATED_PROCESS_NAMES = (
    "RonsSwedishLearningJourneyServer.exe",
    "RonsSwedishLearningJourney.exe",
    "SwedishStartupKit.exe",
)


def run_quiet(command: list[str]) -> subprocess.CompletedProcess[str] | None:
    try:
        return subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=False,
            creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
        )
    except OSError:
        return None


def stop_process(pid: int) -> None:
    if pid == os.getpid():
        return
    run_quiet(["taskkill", "/PID", str(pid), "/F", "/T"])


def stop_existing_session() -> None:
    if os.name != "nt":
        return
    current_pid = os.getpid()

    netstat = run_quiet(["netstat", "-ano", "-p", "TCP"])
    if netstat and netstat.stdout:
        for line in netstat.stdout.splitlines():
            parts = line.split()
            if len(parts) >= 5 and parts[0].upper() == "TCP" and parts[3].upper() == "LISTENING":
                local_address = parts[1]
                if local_address.rsplit(":", 1)[-1] == str(PORT):
                    try:
                        stop_process(int(parts[-1]))
                    except ValueError:
                        pass

    if getattr(sys, "frozen", False):
        return

    for name in RELATED_PROCESS_NAMES:
        tasklist = run_quiet(["tasklist", "/FO", "CSV", "/NH", "/FI", f"IMAGENAME eq {name}"])
        if not tasklist or not tasklist.stdout:
            continue
        for row in csv.reader(tasklist.stdout.splitlines()):
            if len(row) < 2 or row[0].lower() != name.lower():
                continue
            try:
                pid = int(row[1])
            except ValueError:
                continue
            stop_process(pid)


def default_metrics() -> dict:
    return {
        "attempts": 0,
        "correct": 0,
        "completedModules": {},
        "moduleStats": {},
        "answerHistory": [],
        "studyDays": {},
        "lastStudy": "",
    }


def init_db() -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            create table if not exists profile_states (
              name text primary key,
              metrics text not null,
              archives text not null,
              plan text not null,
              updated_at text not null
            )
            """
        )
        for name in ("Rony", "Lincy"):
            conn.execute(
                """
                insert or ignore into profile_states (name, metrics, archives, plan, updated_at)
                values (?, ?, ?, ?, datetime('now'))
                """,
                (name, json.dumps(default_metrics()), "[]", "{}"),
            )


def normalize_profile(name: str) -> str:
    cleaned = (name or "Rony").strip()[:40] or "Rony"
    if cleaned.lower() == "wife":
        return "Lincy"
    if cleaned.lower() == "ron":
        return "Rony"
    return cleaned


def get_lan_ip() -> str:
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        sock.connect(("8.8.8.8", 80))
        ip = sock.getsockname()[0]
        sock.close()
        return ip
    except OSError:
        return "127.0.0.1"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(APP_DIR), **kwargs)

    def end_headers(self) -> None:
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def send_json(self, payload: object, status: int = 200) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def read_json(self) -> dict:
        length = int(self.headers.get("Content-Length", "0") or "0")
        if not length:
            return {}
        return json.loads(self.rfile.read(length).decode("utf-8"))

    def do_GET(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path.startswith("/materials/"):
            self.serve_material(parsed.path)
            return
        redirect_paths = {
            "/": "/index.html",
            "/index.html/": "/index.html",
            "/index/": "/index.html",
            "/module.html/": "/module.html",
            "/module/": "/module.html",
            "/quiz.html/": "/quiz.html",
            "/quiz/": "/quiz.html",
            "/full_quiz.html/": "/full_quiz.html",
            "/full_quiz/": "/full_quiz.html",
            "/guide.html/": "/guide.html",
            "/practice.html/": "/practice.html",
        }
        if parsed.path in redirect_paths:
            self.send_response(301)
            location = redirect_paths[parsed.path]
            if parsed.query:
                location = f"{location}?{parsed.query}"
            self.send_header("Location", location)
            self.end_headers()
            return
        if parsed.path == "/favicon.ico":
            self.send_response(204)
            self.end_headers()
            return
        if parsed.path == "/api/server-info":
            self.send_json({"server": True, "lanUrl": f"http://{get_lan_ip()}:{PORT}", "port": PORT})
            return
        if parsed.path == "/api/profiles":
            with sqlite3.connect(DB_PATH) as conn:
                rows = conn.execute("select name from profile_states order by name").fetchall()
            self.send_json({"profiles": [row[0] for row in rows]})
            return
        if parsed.path == "/api/state":
            profile = normalize_profile(parse_qs(parsed.query).get("profile", ["Rony"])[0])
            self.send_json(load_state(profile))
            return
        super().do_GET()

    def serve_material(self, path: str) -> None:
        parts = [unquote(part) for part in path.split("/") if part]
        if len(parts) != 3 or parts[0] != "materials" or parts[1] not in {"textbook", "workbook"}:
            self.send_error(404, "File not found")
            return
        filename = parts[2]
        if "/" in filename or "\\" in filename or not filename.lower().endswith(".pdf"):
            self.send_error(404, "File not found")
            return
        base_dir = TEXTBOOK_DIR if parts[1] == "textbook" else WORKBOOK_DIR
        target = (base_dir / filename).resolve()
        try:
            target.relative_to(base_dir.resolve())
        except ValueError:
            self.send_error(404, "File not found")
            return
        if not target.exists() or not target.is_file():
            self.send_error(404, "File not found")
            return
        data = target.read_bytes()
        self.send_response(200)
        self.send_header("Content-Type", "application/pdf")
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Content-Disposition", f'inline; filename="{target.name}"')
        self.end_headers()
        self.wfile.write(data)

    def do_POST(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/profiles":
            body = self.read_json()
            name = normalize_profile(str(body.get("name", "")))
            if not name:
                self.send_json({"error": "Profile name required"}, 400)
                return
            ensure_profile(name)
            self.send_json({"ok": True, "profile": name})
            return
        if parsed.path == "/api/state":
            body = self.read_json()
            name = normalize_profile(str(body.get("profile", "Rony")))
            ensure_profile(name)
            with sqlite3.connect(DB_PATH) as conn:
                conn.execute(
                    """
                    update profile_states
                    set metrics = ?, archives = ?, plan = ?, updated_at = datetime('now')
                    where name = ?
                    """,
                    (
                        json.dumps(body.get("metrics", default_metrics()), ensure_ascii=False),
                        json.dumps(body.get("archives", []), ensure_ascii=False),
                        json.dumps(body.get("plan", {}), ensure_ascii=False),
                        name,
                    ),
                )
            self.send_json({"ok": True})
            return
        self.send_json({"error": "Not found"}, 404)

    def do_DELETE(self) -> None:
        parsed = urlparse(self.path)
        if parsed.path == "/api/profiles":
            profile = (parse_qs(parsed.query).get("profile", [""])[0] or "").strip()[:40]
            if not profile:
                self.send_json({"error": "Profile name required"}, 400)
                return
            with sqlite3.connect(DB_PATH) as conn:
                count = conn.execute("select count(*) from profile_states").fetchone()[0]
                if count <= 1:
                    self.send_json({"error": "Cannot delete the last profile"}, 400)
                    return
                conn.execute("delete from profile_states where name = ?", (profile,))
            if profile in ("Rony", "Lincy"):
                ensure_profile(profile)
                self.send_json({"ok": True, "profile": profile, "recreatedDefault": True})
                return
            self.send_json({"ok": True, "profile": profile})
            return
        self.send_json({"error": "Not found"}, 404)


def ensure_profile(name: str) -> None:
    name = normalize_profile(name)
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            insert or ignore into profile_states (name, metrics, archives, plan, updated_at)
            values (?, ?, ?, ?, datetime('now'))
            """,
            (name, json.dumps(default_metrics()), "[]", "{}"),
        )


def load_state(profile: str) -> dict:
    profile = normalize_profile(profile)
    ensure_profile(profile)
    with sqlite3.connect(DB_PATH) as conn:
        row = conn.execute(
            "select name, metrics, archives, plan, updated_at from profile_states where name = ?",
            (profile,),
        ).fetchone()
    return {
        "profile": row[0],
        "metrics": json.loads(row[1]),
        "archives": json.loads(row[2]),
        "plan": json.loads(row[3]),
        "updatedAt": row[4],
    }


def open_browser(url: str) -> None:
    time.sleep(0.8)
    webbrowser.open(url)


def main() -> int:
    stop_existing_session()
    init_db()
    lan_url = f"http://{get_lan_ip()}:{PORT}"
    local_url = f"http://127.0.0.1:{PORT}/index.html"
    print("Rons Swedish Learning Journey server is running.")
    print(f"Open on this laptop: {local_url}")
    print(f"Open from another laptop on same Wi-Fi: {lan_url}/index.html")
    print(f"Progress database: {DB_PATH}")
    threading.Thread(target=open_browser, args=(local_url,), daemon=True).start()
    server = ThreadingHTTPServer((HOST, PORT), Handler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
