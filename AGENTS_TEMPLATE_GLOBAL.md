# AGENTS Template (Global)

Use este template como base para repositórios do ecossistema ESL do Rodrigo.

## Working Profile
- Owner builds ESL apps for live classes.
- Default priority: speed, reliability, classroom usability, low maintenance.
- Prefer Portuguese for collaboration; keep technical identifiers in English.

## Default Engineering Behavior
- Implement first, then explain briefly.
- Avoid overengineering and unnecessary abstractions.
- Keep changes local; preserve file structure and naming patterns.
- Do not introduce new frameworks/tooling unless explicitly requested.

## Decision Rules by Repo Type

### Static single-page app (most common)
- Usually `index.html` or one `*.html` file with embedded CSS/JS.
- No build step.
- Validate in browser and with `python3 -m http.server 8000` when needed.

### Static multi-file app
- Typical files: `index.html`, `script.js`/`app.js`, `style.css`/`styles.css`, `assets/`.
- Keep data contracts stable (`exerciseData`, JSON files, localStorage keys).
- Validate full user flow and keyboard shortcuts when present.

### Node/TypeScript app (exception)
- Use existing scripts in `package.json`.
- Run at least project baseline checks (`npm run dev`, build/test if configured).

## Code Style Baseline
- JavaScript: `const`/`let`, `camelCase`, explicit names.
- CSS: reuse existing variables/tokens before adding new ones.
- HTML: semantic structure and accessible labels/feedback regions when applicable.
- Keep helper functions small and testable.

## ESL UX Baseline
- Preserve instant feedback on answers.
- Preserve progress and recap/session summary behavior.
- Keep mobile usability (around 375px) and desktop presentation.
- If TTS/STT/audio exists, provide visible fallback/error states.

## Manual Validation Checklist
- App loads without console errors.
- Core flow works end-to-end.
- Critical controls work (`start`, `check`, `next`, `reset`, `reveal`).
- Responsive sanity check on mobile + desktop.

## Git Hygiene
- Commit messages: short, imperative, scoped when useful.
- Do not include unrelated changes.
- For UI changes, include concise impact summary and evidence (screenshots/GIF) in PR.
