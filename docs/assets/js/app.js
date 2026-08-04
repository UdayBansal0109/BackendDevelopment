// =========================================================
// Backend Development coursework – renders data/coursework.json
// =========================================================
(function () {
  "use strict";

  const $ = (sel) => document.querySelector(sel);

  // Build an element safely (all text goes through textContent)
  function el(tag, attrs = {}, ...children) {
    const node = document.createElement(tag);
    for (const [key, value] of Object.entries(attrs)) {
      if (value === null || value === undefined || value === false) continue;
      if (key === "class") node.className = value;
      else if (key === "text") node.textContent = value;
      else node.setAttribute(key, value);
    }
    children.flat().forEach((child) => child && node.append(child));
    return node;
  }

  function linkButton(text, href, variant) {
    return el("a", { class: `btn ${variant}`, href }, text);
  }

  // One card for a lecture, experiment or assignment
  function card(item, section, viewLabel) {
    const readme = item.readmeUrl
      ? linkButton("Read Report", item.readmeUrl, "btn-outline")
      : el("span", { class: "btn btn-disabled", title: "No report for this item" }, "Report unavailable");

    const searchText = [item.code, item.title, item.desc, item.path, ...(item.tags || [])].join(" ").toLowerCase();

    return el("article", { class: "card", "data-section": section, "data-search": searchText },
      el("span", { class: "card-code", text: item.code }),
      el("h4", { text: item.title }),
      el("p", { text: item.desc }),
      el("div", { class: "tags" }, (item.tags || []).map((t) => el("span", { class: "tag", text: t }))),
      el("div", { class: "actions" }, linkButton(viewLabel, item.viewUrl, "btn-primary"), readme)
    );
  }

  function render(data) {
    const c = data.course;
    document.title = `${c.title} · Coursework – ${c.student}`;
    $("#course-title").textContent = c.title;
    $("#course-subtitle").textContent = c.subtitle;
    $("#course-meta").textContent = `${c.code} · ${c.program}`;
    $("#repo-link").href = c.repository;

    const profile = [["Student", c.student], ["SAP ID", c.sapId], ["University", c.university], ["Faculty", c.faculty]];
    $("#profile").append(...profile.map(([k, v]) => el("div", {}, el("dt", { text: k }), el("dd", { text: v }))));

    const lectureCount = data.units.reduce((n, u) => n + u.items.length, 0);
    const stats = [[data.units.length, "Units"], [lectureCount, "Theory lectures"], [data.labs.length, "Lab experiments"], [data.assignments.length + 1, "Assignments & PBL"]];
    $("#stats").append(...stats.map(([n, label]) => el("div", { class: "stat" }, el("strong", { text: String(n) }), el("span", { text: label }))));

    // Theory, unit by unit
    $("#unit-nav").append(...data.units.map((u) => el("a", { href: `#${u.id}` }, `Unit ${u.number} · ${u.name}`)));
    $("#units").append(...data.units.map((u) =>
      el("section", { class: "unit", id: u.id, "data-unit": "" },
        el("div", { class: "unit-head" },
          el("span", { class: "unit-badge", text: `UNIT ${u.number}` }),
          el("h3", { text: u.name })),
        el("div", { class: "grid" }, u.items.map((item) => card(item, "theory", "View Lecture"))))
    ));

    $("#lab-grid").append(...data.labs.map((item) => card(item, "labs", "View Experiment")));
    $("#assignment-grid").append(...data.assignments.map((item) => card(item, "assignments", "View Assignment")));

    // PBL
    const p = data.pbl;
    $("#pbl-card").append(
      el("div", {},
        el("span", { class: "card-code", text: "PBL" }),
        el("h3", { text: p.title }),
        el("p", { text: p.desc }),
        el("div", { class: "tags" }, p.tags.map((t) => el("span", { class: "tag", text: t }))),
        el("div", { class: "actions" },
          linkButton("View Repository", p.repoUrl, "btn-primary"),
          linkButton("Read README", p.readmeUrl, "btn-outline"))),
      el("ol", { class: "pipeline", "aria-label": "CI/CD pipeline" },
        ["git push to main", "Automation tests (automationTesting.py)", "Docker build + container smoke test", "Push image to Docker Hub"].map((s) => el("li", { text: s })))
    );

    $("#footer").append(
      el("span", { text: `© ${new Date().getFullYear()} ${c.student} · ${c.code} · ${c.university}` }),
      el("span", {},
        el("a", { href: c.repository }, "Source on GitHub"),
        " · ",
        el("a", { href: c.courseMaterial }, "Course material"))
    );
  }

  // ---------- Search + section filter ----------
  let activeFilter = "all";

  function applyFilters() {
    const query = $("#search").value.trim().toLowerCase();
    const terms = query.split(/\s+/).filter(Boolean);
    let visible = 0;

    document.querySelectorAll(".card[data-section]").forEach((cardEl) => {
      const sectionOk = activeFilter === "all" || cardEl.dataset.section === activeFilter;
      const textOk = terms.every((t) => cardEl.dataset.search.includes(t));
      cardEl.hidden = !(sectionOk && textOk);
      if (!cardEl.hidden) visible++;
    });

    // hide empty units and sections
    document.querySelectorAll("[data-unit]").forEach((u) => { u.hidden = !u.querySelector(".card:not([hidden])"); });
    document.querySelectorAll("section[data-section]").forEach((s) => { s.hidden = !s.querySelector(".card:not([hidden])"); });
    $("#unit-nav").hidden = Boolean(query);

    $("#empty-state").hidden = visible !== 0;
    $("#result-count").textContent = query || activeFilter !== "all" ? `${visible} item${visible === 1 ? "" : "s"} shown` : "";
  }

  function setupInteractions() {
    $("#search").addEventListener("input", applyFilters);

    document.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === chip));
        activeFilter = chip.dataset.filter;
        applyFilters();
      });
    });

    const toggle = $(".nav-toggle");
    const links = $("#nav-links");
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", (e) => {
      if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
    });

    // "/" focuses the search box
    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== $("#search")) { e.preventDefault(); $("#search").focus(); }
    });
  }

  fetch("data/coursework.json")
    .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
    .then((data) => { render(data); setupInteractions(); applyFilters(); })
    .catch((err) => {
      $("#units").append(el("p", { class: "empty-state", text: `Could not load the coursework list (${err.message}).` }));
    });
})();
