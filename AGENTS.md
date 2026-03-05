# Repository Guidelines

## Project Structure & Module Organization
- `Simple_Past_Interactive_Practice_by_lovable.html` is the entire app. It contains the HTML markup, CSS design tokens/styles, and the JavaScript logic/data for activities.
- There are no separate `src/`, `assets/`, or `tests/` folders in this repository.

## Build, Test, and Development Commands
- No build step is required. Open the HTML file directly in a browser to run the app.
- Optional local server for relative asset resolution and browser testing:
  - `python3 -m http.server 8000` (from the repo root) then open `http://localhost:8000/Simple_Past_Interactive_Practice_by_lovable.html`.
- There are no automated tests configured.

## Coding Style & Naming Conventions
- HTML/CSS/JS are all in one file; keep changes localized and avoid large refactors unless necessary.
- CSS uses custom properties prefixed with `--esl-` and classes like `.esl-*`. Follow that pattern for new tokens and components.
- JavaScript uses `const`/`let`, `camelCase` for functions/variables, and `kebab-case` for HTML IDs/classes.
- Prefer small, pure helper functions (see `normalize`, `shuffleArray`, `createElement`) and keep DOM creation centralized.

## Testing Guidelines
- No test framework is present. Validate changes manually in a modern browser.
- Smoke-check flows: tab switching, activity scoring, hint toggles, and the session summary panel.

## Commit & Pull Request Guidelines
- This directory is not a Git repository, so no commit history or conventions are available.
- If this is later added to Git, use short, imperative commit messages (e.g., “Fix cloze scoring”) and include:
  - A concise summary of UI/logic changes.
  - Screenshots or GIFs for visual changes (activity screens or header).
  - Links to issues or tasks if applicable.

## Dependencies & External Resources
- The page loads Google Fonts and `canvas-confetti` via CDN. If offline support is required, vendor these assets and update the script/link tags.
