# MAT hub (Mortgage AI Toolkit)

Booth hub that opens an interactive demo for each product. Static site: no build step, no dependencies.

## Deploy on GitHub Pages
1. Push the contents of this folder to the repository root (or a `/docs` folder).
2. Settings > Pages > Deploy from a branch > pick the branch and folder.
3. Open the Pages URL. The hub works offline after the first visit.

## Run locally
The demos are loaded with `fetch`, so use a local web server (opening `index.html` straight from disk will not load them):

    python3 -m http.server 8080

then open http://localhost:8080. For a double-click version, use the single-file edition (`MAT-hub-single-file.html`).

## Structure
| Path | What it is |
|---|---|
| `index.html` | Hub shell (minified). Readable copy: `src/index.unminified.html` |
| `demos/<product>.html` | One self-contained demo per product (Monicio, Collibry, Draftlee, DealStream, MyCriteria, AutoBook, Spentlee, SyfeHR) |
| `assets/img/` | Logos, QR code and favicon |
| `assets/clips/` | Collibry participant clips, loaded only when Collibry is opened |
| `sw.js` | Service worker: caches everything for offline use |

## Updating a demo
Replace the matching file in `demos/` (keep the file name). Then change `const VER` in `sw.js` (for example to `mat-hub-v2`) so booth devices pick up the new files.

## Loading
The hub shell is about 27 KB. Demos are fetched in the background after the page is ready, so opening a product is instant, and Collibry's clips load on demand.
