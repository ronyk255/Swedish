# Shared Server Mode

Use `RonsSwedishLearningJourneyServer.exe` when two people want separate progress from different laptops.

## How to use it

1. Keep all files in this `swedish_startup_kit` folder together.
2. Double-click `RonsSwedishLearningJourneyServer.exe` on the host laptop.
3. A console window opens and shows two URLs:
   - `http://127.0.0.1:8765/index.html` for this laptop.
   - `http://YOUR-LAN-IP:8765/index.html` for another laptop on the same Wi-Fi.
4. Your wife opens the LAN URL in her browser.
5. Choose separate profiles in the **Learning Profile** panel: `Rony` or `Lincy`.

## Where progress is saved

The server creates:

```text
learning_progress.sqlite3
```

That database stores each profile separately:

- active quiz metrics
- answer history
- archived reports
- checklist progress

## Notes

- Windows Firewall may ask for permission the first time. Allow private/home network access.
- The server must stay open while another laptop is using the app.
- For solo offline use, `RonsSwedishLearningJourney.exe` still opens the local-only version.
