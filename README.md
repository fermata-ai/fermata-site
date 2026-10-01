# fermata-site

The landing page for Fermata: one static page whose call to action is **Download for Mac**.

- `index.html` holds the whole page: markup, styles and the two small scripts.
- The download button resolves the newest `.dmg` in
  [`fermata-ai/fermata-releases`](https://github.com/fermata-ai/fermata-releases/releases) through the
  GitHub API, because each asset name carries its version. Without JavaScript, or when the API call
  fails, it opens the latest release page.
- The background is a canvas flow field. The lines bend quietly toward the cursor. With Reduce Motion on, it draws one still frame.
- `assets/` holds the brand mark and icons, copied from the desktop app.

Preview it locally:

```bash
python3 -m http.server 8000
```
