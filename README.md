# Swedish Learning Guide

A browser-based Swedish study companion for Rivstart A1/A2 review, quizzes, audio practice, and progress tracking.

## Run On A Phone

This app can be hosted as a static site with GitHub Pages. Once Pages is enabled, open the published URL from any phone browser, including mobile data.

Progress on the hosted version is saved in that phone browser with `localStorage` and IndexedDB. The shared-profile SQLite server mode only works when running `server.py` or the Windows server app locally.

## GitHub Pages

Recommended repo settings:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/ (root)`

Then open:

```text
https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/
```

## Not Included

The local database, generated Windows executables, build folders, logs, and Rivstart PDF files should not be published to GitHub.
