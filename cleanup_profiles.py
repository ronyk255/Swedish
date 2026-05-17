import sqlite3
from pathlib import Path

db = Path("learning_progress.sqlite3")
with sqlite3.connect(db) as conn:
    conn.execute("delete from profile_states where name in (?, ?)", ("Ron", "Wife"))
    conn.commit()
    rows = [row[0] for row in conn.execute("select name from profile_states order by name")]
print(rows)
