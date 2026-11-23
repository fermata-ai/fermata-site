// The stage: three short scenes of Fermata at work, played in one window over a plant photo.
// One clock drives everything (requestAnimationFrame, never a timer): each scene is a list of moments, and
// the cursor's moves and the typing are tweens read off the same clock. The scenes are one session: each
// begins exactly where the last one ended, and the loop back to the start unwinds the map in place.
(() => {
  const root = document.querySelector("[data-fstage]");
  if (!root) return;
  const fit = root.querySelector(".st-fit");
  const win = root.querySelector(".st-win");
  const tabs = [...root.querySelectorAll(".st-step")];
  const stepsEl = root.querySelector(".st-steps");
  const W = 1120, H = 600;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- the project map, drawn once from data ----------
  // x is months since October 2025; each session leaves its project's line, runs its experiments, and joins
  // back, is dropped (its learning still joins), or becomes a project of its own.
  const svgNS = "http://www.w3.org/2000/svg";
  const mx = (i) => 150 + i * 44;
  const END = 14;
  const R = 36;
  const turn = (x, a, b, r = R) => `C${x + r / 2} ${a} ${x + r / 2} ${b} ${x + r} ${b}`;
  const cut = (x0, y0, y1, x1, r = R) => `M${x0} ${y0} ${turn(x0, y0, y1, r)} L${x1} ${y1}`;
  const round = (x0, y0, y1, x1, r = R) => `${cut(x0, y0, y1, x1 - r, r)} ${turn(x1 - r, y1, y0, r)}`;
  const TOP = 44, MAIN = 72, L1 = 102, L2 = 132, L3 = 176, PLANT = 248, PL = 276;
  function buildMap(svg) {
    const out = [];
    const el = (tag, attrs, g, text) => {
      const n = document.createElementNS(svgNS, tag);
      for (const [k, v] of Object.entries(attrs)) n.setAttribute(k, v);
      if (g) n.dataset.g = g;
      if (text !== undefined) n.innerHTML = text;
      out.push(n);
      return n;
    };
    ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov"].forEach((m, i) => {
      el("line", { x1: mx(i), y1: 22, x2: mx(i), y2: 300, class: "grid" });
      el("text", { x: mx(i), y: 13, class: "month" }, null, m + (i === 0 ? " ’25" : i === 3 ? " ’26" : ""));
    });
    el("text", { x: 0, y: MAIN - 2, class: "proj-name" }, null, "Faster drying step");
    el("text", { x: 0, y: MAIN + 13, class: "proj-team" }, null, "Team A · Team B");
    el("text", { x: 0, y: PLANT - 2, class: "proj-name" }, null, "Plant drying line");
    el("text", { x: 0, y: PLANT + 13, class: "proj-team" }, null, "Team C");
    const path = (d, g, extra = "") => el("path", { d, class: `trk draw ${extra}` }, g);
    const cm = (i, y, g) => el("circle", { cx: mx(i), cy: y, r: 4, class: "cm" }, g);
    const dot = (i, y, g) => el("circle", { cx: mx(i), cy: y, r: 5.5, class: "dot" }, g);
    const x = (i, y, g) => {
      const gEl = el("g", { class: "x", "data-x": g }, g);
      gEl.innerHTML = `<line x1="${mx(i) - 5}" y1="${y - 5}" x2="${mx(i) + 5}" y2="${y + 5}"/><line x1="${mx(i) - 5}" y1="${y + 5}" x2="${mx(i) + 5}" y2="${y - 5}"/>`;
    };
    const learn = (from, y0, to, y1, g) =>
      el("path", { d: `M${mx(from) + 7} ${y0} C${(mx(from) + mx(to)) / 2} ${y0} ${(mx(from) + mx(to)) / 2} ${y1} ${mx(to) - 6} ${y1}`, class: "learn" }, g);
    const who = (name, what) => `<tspan font-weight="600" fill="#1a1a1f">${name}</tspan> · ${what}`;
    const label = (xAt, y, name, what, g, anchor = "start", extra = "") => el("text", { x: xAt, y, "text-anchor": anchor, class: `lbl ${extra}` }, g, who(name, what));

    // the two projects
    el("path", { d: `M${mx(1)} ${MAIN} L${mx(END)} ${MAIN}`, class: "main draw" }, "main");
    el("path", { d: `M${mx(0)} ${PLANT} L${mx(END)} ${PLANT}`, class: "main draw" }, "main");
    dot(1, MAIN, "main"); dot(0, PLANT, "main");
    // Ravi, merged
    path(round(mx(1.2), MAIN, L1, mx(3.2)), "ravi"); [2, 2.6].forEach((i) => cm(i, L1, "ravi")); dot(3.2, MAIN, "ravi");
    label(mx(1.2) + R + 4, L1 + 17, "Team A", "Supplier B", "ravi");
    // Maya: two directions from one point; 140 °C dropped with its learning kept, 110 °C confirmed
    dot(3.8, MAIN, "maya");
    path(cut(mx(3.8), MAIN, L1, mx(5.6)), "maya"); cm(4.8, L1, "maya"); x(5.6, L1, "maya140"); learn(5.6, L1, 6.3, MAIN, "maya140"); dot(6.3, MAIN, "maya140");
    label(mx(3.8) + R + 4, L1 + 17, "Team A", "140 °C", "maya");
    path(round(mx(3.8), MAIN, L2, mx(7.4)), "maya"); [5, 5.8, 6.6].forEach((i) => cm(i, L2, "maya")); dot(7.4, MAIN, "maya110");
    label(mx(3.8) + R + 4, L2 + 17, "Team A", "110 °C", "maya");
    el("text", { x: mx(7.4) - 6, y: MAIN - 11, "text-anchor": "end", class: "lbl" }, "maya110", "8-hour drying better on the bench");
    // Ana: dropped, learning kept
    dot(8.2, MAIN, "ana"); path(cut(mx(8.2), MAIN, L1, mx(9.4)), "ana"); cm(8.9, L1, "ana"); x(9.4, L1, "ana"); learn(9.4, L1, 10.1, MAIN, "ana"); dot(10.1, MAIN, "ana");
    label(mx(8.2) - 6, L1 + 17, "Team A", "Additives", "ana");
    // Daniel: his session became a project of its own, on a lane below the open ones
    dot(10.6, MAIN, "daniel"); path(cut(mx(10.6), MAIN, L3, mx(12.4)), "daniel"); cm(11.9, L3, "daniel");
    el("path", { d: `M${mx(12.4)} ${L3} L${mx(END)} ${L3}`, class: "main draw" }, "daniel2"); dot(12.4, L3, "daniel2");
    label(mx(10.6) + R + 4, L3 - 9, "Team A", "Coating", "daniel");
    el("text", { x: mx(END), y: L3 + 17, "text-anchor": "end", class: "lbl new-proj" }, "daniel2", "New electrode coating");
    // Jen: still running
    dot(12, MAIN, "jen"); path(cut(mx(12), MAIN, L2, mx(END)), "jen", "open"); cm(13.2, L2, "jen");
    label(mx(END), L2 + 17, "Team B", "Oven mapping", "jen", "end");
    // Tom: today's session, above the line, shared back into the project (drawn at the end of step 3)
    dot(12.6, MAIN, "tom"); path(round(mx(12.6), MAIN, TOP, mx(13.95), 22), "tom", "you"); cm(13.2, TOP, "tom"); dot(13.95, MAIN, "tom");
    el("text", { x: mx(END), y: TOP - 8, "text-anchor": "end", class: "lbl you-lbl" }, "tom", `<tspan font-weight="600">Team B</tspan> · 11 points less at cycle 300`);
    // the plant
    path(round(mx(0.2), PLANT, PL, mx(1.9)), "kofi"); [0.8, 1.3].forEach((i) => cm(i, PL, "kofi")); dot(1.9, PLANT, "kofi");
    label(mx(0.2) + R + 4, PL + 17, "Team C", "Drying line upgrade report", "kofi");
    path(round(mx(8), PLANT, PL, mx(9.6)), "sara"); cm(8.8, PL, "sara"); dot(8, PLANT, "sara"); dot(9.6, PLANT, "sara");
    label(mx(8) + R + 4, PL + 17, "Team C", "Oven maintenance", "sara");

    // lines first, then dots and marks over them, then words
    const order = (n) => (n.classList.contains("dot") || n.classList.contains("cm") || n.classList.contains("x") ? 2 : n.tagName === "text" ? 3 : 1);
    out.sort((a, b) => order(a) - order(b)).forEach((n) => svg.appendChild(n));
    svg.querySelectorAll(".draw:not(.open)").forEach((p) => p.style.setProperty("--l", Math.ceil(p.getTotalLength())));
  }
  buildMap(win.querySelector("[data-map]"));
  const FRESH = win.innerHTML;
  const GROUPS = ["main", "kofi", "ravi", "maya", "maya140", "maya110", "sara", "ana", "daniel", "daniel2", "jen"];

  // ---------- scale the window to its frame ----------
  // On a wide screen the window, the steps and their lines fit one screen. On a phone the window keeps a
  // readable size and shows its working part, the conversation and the panel, not the sidebar.
  let s = 1, panX = 224;
  // where the phone's view starts, in window units: the main view, the conversation, the right panel
  const PAN = { view: 224, chat: 224, panel: W - 392 - 8 };
  const narrow = () => fit.clientWidth < 760;
  const placeX = () => {
    const w = fit.clientWidth;
    fit.style.setProperty("--x", `${Math.max(w - W * s, Math.min(0, -panX * s))}px`);
  };
  const resize = () => {
    const w = fit.clientWidth;
    if (w < 760) {
      s = 0.72;
      fit.style.setProperty("--s", s);
      placeX();
      return;
    }
    // as wide as the steps below, never larger than drawn, and small enough that the photo, the window and the
    // steps fit one screen with room around them
    const room = innerHeight - 40 - stepsEl.offsetHeight - 30 - 140;
    s = Math.min(w / W, Math.max(0.6, room / H), 1);
    fit.style.setProperty("--s", s);
    fit.style.setProperty("--x", `${Math.max(0, (w - W * s) / 2)}px`);
  };
  new ResizeObserver(resize).observe(fit);
  addEventListener("resize", resize);
  resize();

  // ---------- the clock ----------
  let q = [], tweens = [], elapsed = 0, last = null, playing = false, cur = 0, raf = 0, instant = false;
  const $ = (sel) => win.querySelector(sel);
  const $$ = (sel) => [...win.querySelectorAll(sel)];
  // one pace for the whole stage: every moment, move and hold scales with it
  const PACE = 0.86;
  const at = (t, fn) => { q.push({ t: t * PACE, fn }); q.sort((a, b) => a.t - b.t); };
  const later = (ms, fn) => (instant ? fn() : at(elapsed / PACE + ms, fn));
  const tween = (ms, step, done) => {
    if (instant) { step(1); done?.(); return; }
    tweens.push({ from: elapsed, ms: ms * PACE, step, done });
  };
  const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  function tick(t) {
    elapsed = t;
    while (q.length && q[0].t <= elapsed) q.shift().fn();
    tweens = tweens.filter((tw) => {
      const k = Math.min(1, (elapsed - tw.from) / tw.ms);
      tw.step(k);
      if (k >= 1) { tw.done?.(); return false; }
      return true;
    });
  }

  // ---------- what a scene can do ----------
  const HOME = { x: 1060, y: 560 };
  const cursor = { ...HOME };
  const putCursor = () => { $("[data-cursor]").style.transform = `translate(${cursor.x}px, ${cursor.y}px)`; };
  const pos = (sel, dx = 0, dy = 0, edge = 0.5) => {
    const r = $(sel).getBoundingClientRect(), w = win.getBoundingClientRect();
    return { x: (r.left - w.left) / s + (r.width / s) * edge + dx, y: (r.top - w.top) / s + (r.height / s) * 0.55 + dy };
  };
  // how long each typed character takes: a beat longer after a space, longer still after punctuation
  const weight = (ch) => (ch === " " ? 2.2 : /[.,?!:]/.test(ch) ? 4 : 1);
  const A = {
    screen(name, crumb) {
      $$("[data-screen]").forEach((n) => n.classList.toggle("on", n.dataset.screen === name));
      $$("[data-nav]").forEach((n) => n.classList.toggle("on", n.dataset.nav === name));
      $$("[data-ses]").forEach((n) => n.classList.toggle("on", name === "session" && n.dataset.ses === "tom"));
      $("[data-crumb]").textContent = crumb ?? "Faster drying step";
    },
    in(sel) { $$(sel).forEach((n) => n.classList.add("in")); },
    out(sel) { $$(sel).forEach((n) => n.classList.remove("in")); },
    stagger(sel, gap) { $$(sel).forEach((n, i) => later(i * gap, () => n.classList.add("in"))); },
    branch(g) { $$(`[data-g="${g}"]`).forEach((n) => n.classList.add("in")); },
    // the whole map as it stands, set at once: no line draws itself again
    mapNow() {
      const svg = $("[data-map]");
      svg.classList.add("setnow");
      GROUPS.forEach((g) => A.branch(g));
      void svg.getBoundingClientRect();
      later(40, () => svg.classList.remove("setnow"));
    },
    tab(name) {
      $$("[data-tab]").forEach((n) => n.classList.toggle("on", n.dataset.tab === name));
      $$("[data-pane]").forEach((n) => n.classList.toggle("on", n.dataset.pane === name));
    },
    // the window shows Fermata at work through the thinking line and the search, not a status chip
    busy() {},
    show() { $("[data-cursor]").classList.add("in"); putCursor(); },
    move(sel, ms, dx, dy, edge) {
      const from = { ...cursor }, to = pos(sel, dx, dy, edge);
      tween(ms, (k) => {
        const e = ease(k);
        // a slight arc, the way a hand moves a mouse
        const lift = Math.sin(Math.PI * e) * Math.min(36, Math.hypot(to.x - from.x, to.y - from.y) * 0.07);
        cursor.x = from.x + (to.x - from.x) * e;
        cursor.y = from.y + (to.y - from.y) * e - lift;
        putCursor();
      });
    },
    hot(sel) { $(sel).classList.add("hot"); },
    click(sel) {
      const c = $("[data-cursor]"), t = $(sel);
      c.classList.add("down");
      t?.classList.add("press");
      if (!instant) {
        const r = document.createElement("span");
        r.className = "st-ripple";
        r.style.left = `${cursor.x + 3}px`;
        r.style.top = `${cursor.y + 3}px`;
        win.appendChild(r);
        r.addEventListener("animationend", () => r.remove());
      }
      later(150, () => { c.classList.remove("down"); t?.classList.remove("press", "hot"); });
    },
    type(text, ms) {
      const box = $("[data-txt]");
      $("[data-compose]").classList.add("focus");
      const marks = [0];
      for (const ch of text) marks.push(marks[marks.length - 1] + weight(ch));
      const total = marks[marks.length - 1];
      tween(ms, (k) => {
        let n = 0;
        while (n < text.length && marks[n + 1] <= k * total) n++;
        box.innerHTML = `${text.slice(0, n)}<span class="caret"></span>`;
      });
    },
    send() {
      const text = $("[data-txt]").textContent;
      const file = $("[data-file]").classList.contains("in");
      $("[data-txt]").textContent = "";
      $("[data-file]").classList.remove("in");
      $("[data-compose]").classList.remove("focus");
      A.say(`<div class="st-msg">${text}${file ? `<span class="st-chipfile in"><b>CSV</b>pilot_runs_nov.csv</span>` : ""}</div>`);
    },
    // the status page scrolls inside the window to what just changed
    scrollStatus(sel, ms) {
      const page = $('[data-screen="status"]'), el = $(sel);
      const from = page.scrollTop, to = Math.max(0, el.offsetTop + el.offsetHeight - page.clientHeight + 14);
      tween(ms, (k) => { page.scrollTop = from + (to - from) * ease(k); });
    },
    say(html) {
      const wrap = document.createElement("div");
      wrap.innerHTML = html;
      const n = wrap.firstElementChild;
      n.classList.add("st-in");
      const think = $("[data-think]");
      if (think) think.parentNode.removeChild(think);
      const feed = $("[data-feed]");
      feed.appendChild(n);
      // the oldest words leave the top when the feed is full
      while (feed.scrollHeight > feed.clientHeight + 2 && feed.children.length > 1) feed.removeChild(feed.firstElementChild);
      later(30, () => n.classList.add("in"));
    },
    think(text) {
      let n = $("[data-think]");
      if (!n) {
        A.say(`<div class="st-think" data-think><svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" fill="currentColor"/></svg><span></span></div>`);
        n = $("[data-think]");
      }
      n.querySelector("span").textContent = text;
    },
    // the search sits under the cards already found, so a card never moves when the next search starts
    search(title, line, found = false) {
      const n = $("[data-search]");
      n.classList.remove("gone");
      n.toggleAttribute("data-found", found);
      n.querySelector("b").textContent = title;
      n.querySelector("small").textContent = line;
      n.classList.add("in");
    },
    searchDone() { const n = $("[data-search]"); n.classList.remove("in"); n.classList.add("gone"); },
    tip(sel, html) {
      const t = $("[data-tip]");
      if (!html) { t.classList.remove("in"); return; }
      t.innerHTML = html;
      const p = pos(sel), v = $(".st-view").getBoundingClientRect(), w = win.getBoundingClientRect();
      t.style.left = `${p.x - (v.left - w.left) / s - 200}px`;
      t.style.top = `${p.y - (v.top - w.top) / s + 62}px`;
      t.classList.add("in");
    },
    glow(sel) { const n = $(sel); n.classList.remove("glow"); void n.offsetWidth; n.classList.add("glow"); },
    drop(sel) { $$(sel).forEach((n) => n.parentNode.removeChild(n)); },
    // the part of the window a phone shows: "view" (its left), "chat" or "panel"
    pan(part, ms = 600) {
      const to = PAN[part] ?? 224;
      if (!narrow()) { panX = to; return; }
      const from = panX;
      tween(ms, (k) => { panX = from + (to - from) * ease(k); placeX(); });
    },
    // the loop: the year unwinds on the same map, and Tom's session leaves the list
    unwind() {
      $$("[data-map] [data-g]").forEach((n) => n.classList.remove("in"));
      A.out('[data-ses="tom"]');
      $("[data-cursor]").classList.remove("in");
    },
  };
  function run(d, ms) {
    const p = $(`[data-pd="${d}"]`);
    p.querySelector("[data-mark]").innerHTML = `<span class="st-spin"></span>`;
    p.querySelector("[data-state]").textContent = "Running";
    p.classList.add("going");
    void p.offsetWidth;
    A.busy(true);
    // each experiment's bar fills in turn, the last one finishing as the direction does
    const bars = [...p.querySelectorAll(".st-strip i")];
    bars.forEach((b, i) => {
      b.style.setProperty("--t", `${(ms * PACE) / bars.length}ms`);
      later((ms / bars.length) * i, () => b.classList.add("run"));
    });
  }
  function done(d) {
    const p = $(`[data-pd="${d}"]`);
    p.querySelector("[data-mark]").innerHTML = `<span class="st-ok">✓</span>`;
    p.querySelector("[data-state]").textContent = "Completed";
    p.querySelectorAll(".st-strip i").forEach((b) => b.classList.add("done"));
    p.querySelector("[data-res]").classList.add("in");
  }
  // step 2: the card that just came from the knowledge base is outlined, and only that one
  function focusCard(n) {
    $$("[data-card]").forEach((c) => c.classList.toggle("kbfocus", c.dataset.card === String(n)));
  }
  // the pilot-line row: what step 1 points at and step 3 settles
  function flipPilot() {
    const tag = $("[data-pilot-tag]");
    tag.className = "st-tag no";
    tag.textContent = "Not confirmed";
    $("[data-pilot-who]").textContent = "Team B · today · 11 points less at cycle 300";
    $("[data-next]").textContent = "both oven programs side by side, three rolls each (Team B)";
    const row = $("[data-pilot]");
    row.classList.remove("st-flash");
    void row.offsetWidth;
    row.classList.add("st-flash");
  }

  // ---------- the three scenes: one session, each picking up where the last left off ----------
  const Q1 = "The November pilot tests came back worse than April’s. Why?";
  const Q2 = "Could we dry hotter and keep the 8-hour cycle?";
  const OPEN = `<div class="st-started">Started from Project status · 14 Jul 2026</div>`;
  const R1 = `<div class="st-reply"><p>Team C saw the same drop in October 2025, in a drying line trial. It never reached this project.</p><span class="st-cite">↗ Team C report, Oct 2025</span></div>`;
  const R2 = `<div class="st-reply"><p>Team A tried 140 °C in March, in a direction they dropped. Nobody has tried 125 °C yet, so I added it as direction D.</p><span class="st-cite">↗ Team A notebook, p. 40</span></div>`;
  const R3 = `<div class="st-reply"><p>The 19 runs belong to directions A and B. Both are done, and the finding is going through the independent check.</p></div>`;
  const R4 = `<div class="st-reply"><p>The check passed. You decide when it updates the project status.</p></div>`;
  const SESSION = "Faster drying step / November pilot tests";

  const SCENES = [
    {
      dur: 13700,
      still: 12000,
      pre() { A.screen("map"); A.pan("view", 0); },
      moments: [
        [200, () => A.branch("main")],
        [800, () => { A.branch("kofi"); A.branch("ravi"); }],
        [1500, () => A.branch("maya")],
        [2100, () => A.branch("maya140")],
        [2500, () => A.branch("maya110")],
        [3100, () => A.branch("sara")],
        [3500, () => A.branch("ana")],
        [4200, () => A.branch("daniel")],
        [4600, () => A.branch("daniel2")],
        [5000, () => A.branch("jen")],
        [5600, () => { A.show(); A.move('[data-x="ana"]', 900, 2, 2); }],
        [6600, () => A.tip('[data-x="ana"]', "Dropped in July. <b>Learning kept:</b> the additive slows drying at 110 °C.")],
        [8800, () => { A.tip(); A.move('[data-nav="status"]', 900, -40); }],
        [9800, () => A.click('[data-nav="status"]')],
        [9900, () => { A.screen("status"); A.in("[data-c], [data-d]"); }],
        [10300, () => A.move("[data-pilot-text]", 650, 26, 0, 1)],
        [10950, () => $("[data-pilot]").classList.add("st-focus")],
        [12100, () => A.move('[data-hit="new"]', 700)],
        [12800, () => A.hot('[data-hit="new"]')],
        [13000, () => A.click('[data-hit="new"]')],
        [13150, () => A.in('[data-ses="tom"]')],
        [13450, () => { A.screen("session", SESSION); A.tab("findings"); A.say(OPEN); }],
      ],
    },
    {
      dur: 18600,
      still: 16500,
      pre() {
        A.screen("session", SESSION);
        A.in('[data-ses="tom"]');
        A.tab("findings");
        A.drop("[data-finding]");
        A.say(OPEN);
        A.show();
      },
      moments: [
        [150, () => { A.pan("chat"); A.move("[data-compose]", 500, -160, 0); }],
        [650, () => A.click("[data-compose]")],
        // the pointer steps aside to Send while the words are typed
        [750, () => A.move('[data-hit="send"]', 600, 0, 0)],
        [800, () => A.type(Q1, 1900)],
        [2900, () => A.click('[data-hit="send"]')],
        [3000, () => { A.send(); A.busy(true); A.think("Reading the November pilot sheet"); A.search("Searching the knowledge base", "4,212 files · notebooks · test sheets · plant reports"); }],
        [3850, () => { A.think("Searching the knowledge base for the same drop"); A.search("Searching the knowledge base", "Pilot sheets, QC logs and plant reports that mention 8-hour drying"); }],
        [4650, () => { A.think("Reading Team C’s drying line report, Oct 2025"); A.search("Found in Team C’s records", "Drying line upgrade report · Oct 2025", true); }],
        [5350, () => { A.pan("panel"); A.searchDone(); A.in("[data-kb]"); A.in('[data-card="1"]'); A.glow('[data-card="1"]'); focusCard(1); }],
        [5950, () => { A.say(R1); A.busy(false); A.move('[data-card="1"]', 900, 150, 110); }],
        [9400, () => { A.pan("chat"); A.move("[data-compose]", 800, -160, 0); }],
        [10250, () => A.click("[data-compose]")],
        [10350, () => A.move('[data-hit="send"]', 600, 0, 0)],
        [10400, () => A.type(Q2, 1500)],
        [12100, () => A.click('[data-hit="send"]')],
        [12200, () => { A.send(); A.busy(true); A.think("Searching the knowledge base for drying temperature"); A.search("Searching the knowledge base", "Drying trials above 110 °C, in every team’s records"); }],
        [13000, () => { A.think("Reading Team A’s notebook, p. 40"); A.search("Found in Team A’s records", "Team A notebook, p. 40 · Mar 2026", true); }],
        [13700, () => { A.pan("panel"); A.searchDone(); A.in('[data-card="2"]'); A.glow('[data-card="2"]'); focusCard(2); }],
        [14100, () => { A.say(R2); A.busy(false); A.move('[data-card="2"]', 900, 150, 104); }],
        [16900, () => A.move('[data-tab="directions"]', 800)],
        [17750, () => A.click('[data-tab="directions"]')],
        [17850, () => { focusCard(0); A.tab("directions"); A.stagger("[data-pd]", 90); }],
      ],
    },
    {
      dur: 24800,
      still: 19400,
      pre() {
        A.screen("session", SESSION);
        A.in('[data-ses="tom"]');
        A.searchDone();
        A.in("[data-kb], [data-card]");
        A.tab("directions");
        A.in("[data-pd]");
        A.say(OPEN);
        A.say(`<div class="st-msg">${Q1}</div>`);
        A.say(R1);
        A.say(`<div class="st-msg">${Q2}</div>`);
        A.say(R2);
        A.show();
        A.pan("panel", 0);
      },
      moments: [
        // the new pilot data, attached and sent
        [200, () => { A.pan("chat"); A.move('[data-hit="attach"]', 800); }],
        [1050, () => A.click('[data-hit="attach"]')],
        [1200, () => { A.in("[data-file]"); $("[data-compose]").classList.add("focus"); }],
        [1500, () => A.move('[data-hit="send"]', 600, 0, 0)],
        [1550, () => A.type("New pilot data for A and B. Analyse it.", 1300)],
        [3000, () => A.click('[data-hit="send"]')],
        [3100, () => { A.send(); A.busy(true); A.think("Reading pilot_runs_nov.csv: 19 runs"); }],
        [3900, () => { A.think("These runs belong to directions A and B"); A.pan("panel"); }],
        [4300, () => { run("A", 1600); run("B", 2300); }],
        [4500, () => A.think("A: comparing output at cycle 300")],
        [5700, () => { done("A"); A.think("B: reading Team A’s bench results"); }],
        [6600, () => done("B")],
        [7000, () => { A.pan("chat"); A.say(R3); }],
        [7400, () => { A.pan("panel"); A.move('[data-tab="findings"]', 800); }],
        [8250, () => A.click('[data-tab="findings"]')],
        // the knowledge-base cards fold to their titles, so the finding and its check fit the pane
        [8350, () => { $$("[data-card]").forEach((c) => c.classList.add("mini")); A.tab("findings"); A.in("[data-finding]"); }],
        [9000, () => A.move("[data-check]", 700, -60, 96)],
        [10400, () => {
          $("[data-check]").classList.add("pass");
          $("[data-check-hd]").innerHTML = `<span class="st-ok">✓</span>Independent check passed`;
          $("[data-find]").classList.add("pass");
          A.in("[data-check-body]");
          $('[data-hit="share"]').removeAttribute("data-off");
          A.busy(false);
          A.say(R4);
        }],
        [12000, () => A.move('[data-hit="share"]', 700)],
        [12800, () => A.click('[data-hit="share"]')],
        [12900, () => { const b = $('[data-hit="share"]'); b.classList.add("done"); b.textContent = "Project status updated ✓"; }],
        [13500, () => A.move('[data-nav="status"]', 900, -40)],
        [14500, () => A.click('[data-nav="status"]')],
        [14600, () => { A.in("[data-c], [data-d]"); A.screen("status"); A.pan("view"); }],
        [15100, () => A.move("[data-pilot-text]", 700, 26, 0, 1)],
        [15850, () => { flipPilot(); $("[data-upd]").textContent = "Updated today"; }],
        // Team B's session and its directions join the list, then its learning joins the others
        [16600, () => { A.in("[data-fresh-ses]"); A.scrollStatus("[data-fresh-ses]", 700); }],
        [18100, () => { A.in("[data-fresh]"); A.scrollStatus("[data-learnings]", 900); }],
        [19500, () => A.move('[data-nav="map"]', 900, -40)],
        [20500, () => A.click('[data-nav="map"]')],
        [20600, () => { A.mapNow(); A.screen("map"); A.pan("view"); }],
        [21100, () => A.branch("tom")],
        [23800, () => A.unwind()],
      ],
    },
  ];

  // ---------- playing a scene ----------
  function start(i, fresh = false) {
    const looped = !fresh && i === 0;
    cur = i;
    q = []; tweens = []; elapsed = 0; last = null;
    win.classList.add("still");
    win.innerHTML = FRESH;
    if (fresh) Object.assign(cursor, HOME);
    instant = true;
    SCENES[i].pre(looped);
    instant = false;
    void win.offsetWidth;
    win.classList.remove("still");
    // a jump to a step crossfades; the scenes themselves run on from one another
    if (fresh) $(".st-view").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 420, easing: "ease-out" });
    for (const [t, fn] of SCENES[i].moments) at(t, fn);
    tabs.forEach((b, k) => {
      b.setAttribute("aria-selected", String(k === i));
      b.classList.toggle("done", k < i);
      b.querySelector(".line i").style.width = k < i ? "100%" : "0%";
    });
    if (reduce) finish(i);
  }
  // a scene at its telling moment, all at once: what reduced motion shows
  function finish(i) {
    instant = true;
    win.classList.add("still");
    while (q.length && q[0].t <= SCENES[i].still * PACE) q.shift().fn();
    q = [];
    tweens.forEach((t) => { t.step(1); t.done?.(); });
    tweens = [];
    $(".st-view").getAnimations().forEach((a) => a.cancel());
    $("[data-cursor]").classList.remove("in");
    A.tip();
    instant = false;
    tabs[i].querySelector(".line i").style.width = "100%";
  }
  function frame(now) {
    raf = 0;
    if (!playing) return;
    tick(elapsed + (last !== null ? Math.min(64, now - last) : 0));
    last = now;
    const dur = SCENES[cur].dur * PACE;
    tabs[cur].querySelector(".line i").style.width = `${Math.min(100, (elapsed / dur) * 100)}%`;
    if (elapsed >= dur) start((cur + 1) % SCENES.length);
    raf = requestAnimationFrame(frame);
  }
  // the visitor's own pause holds until they play again or pick a step; scrolling away and back does not undo it
  let held = false;
  const play = () => { if (reduce || held || playing || window.__stageHold) return; playing = true; last = null; raf ||= requestAnimationFrame(frame); };
  const pause = () => { playing = false; };
  const pauseBtn = root.querySelector("[data-pause]");
  const showHeld = () => {
    pauseBtn.toggleAttribute("data-held", held);
    pauseBtn.setAttribute("aria-label", held ? "Play" : "Pause");
    win.classList.toggle("held", held);
  };
  pauseBtn.addEventListener("click", () => {
    held = !held;
    showHeld();
    if (held) pause();
    else if (seen && !document.hidden) play();
  });
  if (reduce) pauseBtn.hidden = true;

  tabs.forEach((b, i) => b.addEventListener("click", () => { held = false; showHeld(); start(i, true); play(); }));
  // plays while it is on screen and the tab is in front
  let seen = false;
  new IntersectionObserver(([e]) => { seen = e.isIntersecting; seen && !document.hidden ? play() : pause(); }, { threshold: 0.35 }).observe(root.querySelector(".stage-photo"));
  document.addEventListener("visibilitychange", () => (seen && !document.hidden ? play() : pause()));
  // a way to look at any moment, for checking the scenes: ?stage=2.6.5 is scene 2 at 6.5 s, held still
  const ask = new URLSearchParams(location.search).get("stage");
  start(0, true);
  if (ask) {
    const [n, sec] = ask.split(/\.(.*)/s);
    start(Math.max(0, Math.min(2, Number(n) - 1)), true);
    const until = Number(sec || 0) * 1000 * PACE;
    win.classList.add("still");
    $(".st-view").getAnimations().forEach((a) => a.cancel());
    for (let t = 0; t <= until; t += 16) tick(t);
    tabs[cur].querySelector(".line i").style.width = `${(until / (SCENES[cur].dur * PACE)) * 100}%`;
    window.__stageHold = true;
  } else if (reduce) finish(0);
  window.__stage = { start, play, pause, finish, get t() { return elapsed; } };
})();
