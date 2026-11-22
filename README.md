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
- Below the first screen, the film (`assets/fermata-film-4.mp4`, 114 s, with `assets/fermata-film-4-poster.jpg`)
  plays with sound on its first click, or from the hero's **How it works** button, which scrolls to it and
  starts it. The link to share is `getfermata.app/#how-it-works` (the older `#film` too): it opens the page with
  the film centred and ready to play, and `film_played` then says `from: link`. It loads nothing until then (`preload="none"`).
- `newsite/index.html` is a preview of the next landing page (the `feature/site-revamp-lab-to-plant` branch), served at
  `getfermata.app/newsite/` so it can be shared by link while it is being built. It is a copy of that branch's
  `index.html` with its asset paths pointed at `../assets/`. It is marked `noindex`, nothing links to it, and it sends
  no analytics. Remove the folder when the new page replaces `index.html`. Its industry photographs are in
  `assets/industries/` (`SOURCES.md` says where each is from).
- `newsite1/index.html` is a second preview at `getfermata.app/newsite1/`, to compare with `newsite/`: the same page
  with the first screen's violet edges 15% stronger. Remove it with `newsite/`.
- `industries/index.html` is the industries page, served at `getfermata.app/industries/`: five industries (batteries
  and energy storage; hydrogen and e-fuels; critical minerals; carbon capture, removal and use; coatings, adhesives and
  polymers), each with the targets teams work towards and a sliding row of photographs. All its words and photo paths
  are in `industries/industries-content.js`; the photos are in `industries/photos/` (`SOURCES.md` there gives each
  photo's source and license, and the page's footer carries the credits that some licenses require). Like
  `newsite/`, it is marked `noindex`, nothing links to it yet, and it sends no analytics.
- `archive/films/` keeps films the page no longer plays (`fermata-film-2.mp4`, the 56 s film it showed until
  2026-10-26, and `fermata-film-3.mp4`, the 86 s film it showed until 2026-11-13). The deploy does not publish `archive/`.
- PostHog records page views, time on page and clicks, plus a `download_clicked` event that says which
  button was used (`header` or `hero`), whether it pointed at the `.dmg` or the release page, and the
  version, and `film_played` (with `from`: `how_it_works`, `link` or `player`) / `film_finished` for the film below the fold. Every event carries `surface: site`, to tell it apart from the desktop app in the same project.
- The PostHog key is never in this repo. `index.html` says `__POSTHOG_KEY__`, and `build.sh` puts the
  `POSTHOG_KEY` Actions secret in its place in the copy it publishes.
- Each push to `main` builds an image (`Dockerfile`, `Caddyfile`) and runs it on the web machine on AWS,
  beside the web app (`.github/workflows/deploy.yml`; the machine is `docs/WEB.md` in `fermata-ai/fermata`).
  The job also publishes to GitHub Pages until DNS has moved to the machine. A rollback is a re-run of an
  earlier run of the workflow.

Preview it locally:

```bash
./preview.sh
```

With `POSTHOG_KEY=` filled in a local `.env` (gitignored; see `.env.example`), the preview sends
analytics like the live site. Without it, the page works and sends nothing.
