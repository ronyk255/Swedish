from pathlib import Path
import subprocess
import sys
import webbrowser


def main() -> int:
    base = Path(sys.executable).resolve().parent if getattr(sys, "frozen", False) else Path(__file__).resolve().parent
    server = base / "RonsSwedishLearningJourneyServer.exe"
    if server.exists():
        subprocess.Popen(
            [str(server)],
            cwd=str(base),
            creationflags=getattr(subprocess, "CREATE_NO_WINDOW", 0),
        )
        return 0

    index = base / "index.html"
    if not index.exists():
        print("Could not find index.html next to the launcher.")
        return 1
    webbrowser.open(index.resolve().as_uri())
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
