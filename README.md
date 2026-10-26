# fermata-site

The landing page for Fermata: one static page whose call to action is **Download for Mac**.

- `index.html` holds the whole page: markup, styles and the two small scripts.
- The download button resolves the newest `.dmg` in
  [`fermata-ai/fermata-releases`](https://github.com/fermata-ai/fermata-releases/releases) through the
  GitHub API, because each asset name carries its version. Without JavaScript, or when the API call
  fails, it opens the latest release page.
- The background is a canvas flow field. The lines bend quietly toward the cursor. With Reduce Motion on, it draws one still frame.
- `assets/` holds the brand mark and icons, copied from the desktop app.
- `guide/index.html` is the user guide, served at `getfermata.app/guide/` and linked from the header. It is
  one self-contained page (light and dark, no build step) that takes a new user from installing Claude Code
  to a first run. It carries the same PostHog snippet, so the deploy and the preview fill in its key too.
  Its **Copy for agent** button (top right) copies the whole guide as Markdown, to paste into Claude Code or
  Codex; its menu also shows that Markdown in a tab and opens ChatGPT or Claude on the guide. The Markdown is
  read off the page when clicked (`guideMarkdown()`), so it never drifts from the page; a sketch or control
  that should stay out of it goes in the script's `SKIP` list.
- Below the first screen, the film (`assets/fermata-film-3.mp4`, 86 s, with `assets/fermata-film-3-poster.jpg`)
  plays with sound on its first click, or from the hero's **How it works** button, which scrolls to it and
  starts it. The link to share is `getfermata.app/#how-it-works` (the older `#film` too): it opens the page with
  the film centred and ready to play, and `film_played` then says `from: link`. It loads nothing until then (`preload="none"`).
- `archive/films/` keeps films the page no longer plays (`fermata-film-2.mp4`, the 56 s film it showed until
  2026-10-26). The deploy does not publish `archive/`.
- PostHog records page views, time on page and clicks, plus a `download_clicked` event that says which
  button was used (`header` or `hero`), whether it pointed at the `.dmg` or the release page, and the
  version, and `film_played` (with `from`: `how_it_works`, `link` or `player`) / `film_finished` for the film below the fold. Every event carries `surface: site`, to tell it apart from the desktop app in the same project.
- The PostHog key is never in this repo. `index.html` says `__POSTHOG_KEY__`, and
  `.github/workflows/deploy.yml` puts the `POSTHOG_KEY` Actions secret in its place in the copy it
  publishes to GitHub Pages (Settings › Pages › Source: GitHub Actions).

Preview it locally:

```bash
./preview.sh
```

With `POSTHOG_KEY=` filled in a local `.env` (gitignored; see `.env.example`), the preview sends
analytics like the live site. Without it, the page works and sends nothing.
