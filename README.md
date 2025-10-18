# Brandon M. Navarro — Static Portfolio Site

## Quick start (local preview)

Recommended: serve files over HTTP to avoid ESM/CORS issues.

macOS / Linux:
```bash
# from the project root (the folder that contains index.html)
python3 -m http.server 8000
# open http://localhost:8000
```

Using Node (serve):
```bash
pnpm dlx serve .  # or: npx serve .
# open http://localhost:3000 (default port)
```

In VS Code: install Live Server and open `index.html`.

## Project overview

- Plain ES module-based frontend (no React/Vue).
- Views and components implemented in `js/scripts/`.
- Designed for simple static hosting (GitHub Pages, Netlify, Vercel static).

## Project Structure

```
brandon-m-navarro.github.io/
├─ index.html
├─ css/
│  ├─ globals.css
│  └─ ...stylesheets...
├─ assets/
│  ├─ images/
│  └─ ...static assets...
├─ js/
│  ├─ scripts/
│  │  ├─ BaseComponent.js
│  │  ├─ BasePanel.js
│  │  ├─ BaseView.js
│  │  ├─ Images.js
│  │  ├─ Main.js            # app bootstrap / entry
│  │  ├─ ViewManager.js     # view routing / switching
│  │  ├─ components/
│  │  │  ├─ Footer.js
│  │  │  ├─ Icon.js
│  │  │  ├─ Modal.js
│  │  │  ├─ NightSky.js
│  │  │  ├─ Picture.js
│  │  │  ├─ SkillRating.js
│  │  │  └─ SlideControl.js
│  │  ├─ home/
│  │  │  ├─ HomeView.js
│  │  │  └─ panels/
│  │  │     └─ HomePanel.js
│  │  ├─ projects/
│  │  │  ├─ ProjectsView.js
│  │  │  └─ panels/
│  │  │     └─ ProjectsPanel.js
│  │  ├─ resume/
│  │  │  ├─ ResumeView.js
│  │  │  └─ panels/
│  │  │     └─ ResumePanel.js
│  │  └─ utils/
│  │     └─ Utilities.js
└─ README.md
```

## Key files explained

- `index.html` — site entry, mounts the JS app and loads CSS.
- `css/globals.css` — global styles and theme.
- `js/scripts/Main.js` — initializes the app, preloads assets, starts the view manager.
- `js/scripts/ViewManager.js` — route/view switching and global state for views.
- `js/scripts/Base*.js` — reusable base classes for consistent behavior across components and views.
- `js/scripts/components/*` — UI primitives (modal, icons, rating).
- `js/scripts/*/` — feature-specific views and their panels.

## Development notes & recommended tooling

- Use an HTTP server for local development (see Quick start).
- Consider adding a minimal bundler/dev server for faster iteration:
  - Vite (recommended) or esbuild for ES module development and hot reload.
  - Example: add a `package.json` with:
    ```json
    {
      "scripts": {
        "dev": "vite",
        "build": "vite build",
        "serve": "vite preview"
      }
    }
    ```

## Deployment

- GitHub Pages:
  - Push repository, enable Pages in repo settings (select branch and root).
- Vercel / Netlify:
  - Connect the repo, set the framework to "Static", publish directory = repository root.
  - No build step required unless you add one.

## Suggested improvements (future)

- Add a dev toolchain (Vite) for faster development.
- Convert components to named ES module exports where helpful.
- Add simple unit tests for Utilities using Jest or Vitest.
- Add a `package.json` with `pnpm` scripts and CI for linting.
