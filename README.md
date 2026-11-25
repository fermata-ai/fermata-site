# fermata-site

The landing page for Fermata, for industrial R&D: one static page whose call to action is **Download for Mac**.

- `index.html` holds the whole page: markup, styles and scripts, with no build step and no library.
- The page is one story told by the scroll: the first screen's records gather into the company's knowledge base, a map
  that fills the screen (Team A, Team B, KPI) and then rests on the left while three stages play on the right: a
  project and its directions, a second team's result, and the team's decision. After it come one line, the film,
  questions and the close.
- The download button resolves the newest `.dmg` in
  [`fermata-ai/fermata-releases`](https://github.com/fermata-ai/fermata-releases/releases) through the
  GitHub API, because each asset name carries its version. Without JavaScript, or when the API call
  fails, it opens the latest release page.
- One fixed canvas draws the records and the map. The script moves everything the scroll moves (`driveDom`); the page
  uses no scroll-linked CSS animation, because Safari ran those wrongly. With Reduce Motion on, on a phone, or without
  JavaScript, the map rests in its place and every stage shows whole.
- `assets/` holds the brand mark and icons, copied from the desktop app.
- `guide/index.html` is the user guide, served at `getfermata.app/guide/` and linked from the header. It is
  one self-contained page (light and dark, no build step) that takes a new user from installing Claude Code
  to a first run. It carries the same PostHog snippet, so the deploy and the preview fill in its key too.
  Its **Copy for agent** button (top right) copies the whole guide as Markdown, to paste into Claude Code or
  Codex; its menu also shows that Markdown in a tab and opens ChatGPT or Claude on the guide. The Markdown is
  read off the page when clicked (`guideMarkdown()`), so it never drifts from the page; a sketch or control
  that should stay out of it goes in the script's `SKIP` list.
- After the story, the film (`assets/fermata-film-5.mp4`, 136 s, with `assets/fermata-film-5-poster.jpg`)
  plays with sound on its first click, or from the header's **Demo video** link, which scrolls to it and
  starts it. The link to share is `getfermata.app/#demo-video`: it opens the page with
  the film centred and ready to play, and `film_played` then says `from: link`. It loads nothing until then (`preload="none"`).
- `newsite/index.html` is the test copy of this landing page (from the `feature/site-revamp-lab-to-plant` branch), served at
  `getfermata.app/newsite/` so it can be shared by link while it is being built. It is a copy of that branch's
  `index.html` with its asset paths pointed at `../assets/`. It is marked `noindex`, nothing links to it, and it sends
  no analytics. Remove the folder when the new page replaces `index.html`. Its industry photographs are in
  `assets/industries/` (`SOURCES.md` says where each is from).
- `industries/index.html` is the industries page, served at `getfermata.app/industries/` and linked from the landing
  page's header and footer: five industries (batteries and energy storage; hydrogen and e-fuels; critical minerals;
  carbon capture, removal and use; coatings, adhesives and polymers), each with the targets teams work towards and a
  sliding row of photographs. All its words and photo paths are in `industries/industries-content.js`; the photos are
  in `industries/photos/` (`SOURCES.md` there gives each photo's source and license, and the page's footer carries the
  credits that some licenses require). It is marked `noindex` and sends no analytics.
- After the four-step story on `/newsite`, before the summary and the film, a three-step stage plays Fermata at
  work in a window over a plant photo:
  projects and directions, findings surfaced from other teams, and a checked result joining the project. Its
  markup is in `newsite/index.html`, its styles and scenes in `newsite/stage.css` and `newsite/stage.js` (one
  `requestAnimationFrame` clock, no timers). `?stage=2.6.5` holds scene 2 at 6.5 s, for checking a moment. The
  photo is `assets/stage/reactor-column.jpg` (`assets/stage/SOURCES.md`).
- `archive/films/` keeps films the page no longer plays (`fermata-film-2.mp4`, the 56 s film it showed until
  2026-10-26, `fermata-film-3.mp4`, the 86 s film it showed until 2026-11-13, and `fermata-film-4.mp4`, the 114 s film
  that film 5 replaced). The deploy does not publish `archive/`.
- PostHog records page views, time on page and clicks, plus a `download_clicked` event that says which
  button was used (`header`, `hero` or `close`), whether it pointed at the `.dmg` or the release page, and the
  version, and `film_played` (with `from`: `header`, `link` or `player`) / `film_finished` for the film below the fold. Every event carries `surface: site`, to tell it apart from the desktop app in the same project.
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
