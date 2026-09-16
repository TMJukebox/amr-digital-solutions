/* ==========================================================================
   AMR DIGITAL SOLUTIONS — site interactivity
   ========================================================================== */

// ---------------------------------------------------------------------------
// PROJECT DATA — edit this array to swap in real client projects.
// `image` may be a path like "assets/img/project-01.jpg"; leave null to keep
// the placeholder initial-letter portrait.
// ---------------------------------------------------------------------------
const PROJECTS = [
  {
    name: "[Project Name 01]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description: what the client needed, what you built, and the result — e.g. faster load times, more bookings, a cleaner checkout flow.]",
    stack: ["[Tech]", "[Tech]", "[Tech]"],
    url: "#",
    image: null
  },
  {
    name: "[Project Name 02]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description of this project's goals and outcome.]",
    stack: ["[Tech]", "[Tech]"],
    url: "#",
    image: null
  },
  {
    name: "[Project Name 03]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description of this project's goals and outcome.]",
    stack: ["[Tech]", "[Tech]", "[Tech]"],
    url: "#",
    image: null
  },
  {
    name: "[Project Name 04]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description of this project's goals and outcome.]",
    stack: ["[Tech]", "[Tech]"],
    url: "#",
    image: null
  },
  {
    name: "[Project Name 05]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description of this project's goals and outcome.]",
    stack: ["[Tech]", "[Tech]", "[Tech]"],
    url: "#",
    image: null
  },
  {
    name: "[Project Name 06]",
    tag: "[Industry / Type]",
    description: "[Add a 2-3 sentence description of this project's goals and outcome.]",
    stack: ["[Tech]", "[Tech]"],
    url: "#",
    image: null
  }
];

document.addEventListener("DOMContentLoaded", () => {
  initIntroLoader();
  initCursorDot();
  initHeaderScroll();
  initMobileNav();
  initRoster();
  initModal();
  initRevealAnimations();
  initContactForm();
  document.getElementById("year").textContent = new Date().getFullYear();
});

// ---------------------------------------------------------------------------
// INTRO LOADER — plays once per session
// ---------------------------------------------------------------------------
function initIntroLoader() {
  const loader = document.getElementById("intro-loader");
  if (!loader) return;

  if (sessionStorage.getItem("amr-intro-seen")) {
    loader.remove();
    return;
  }

  const dismiss = () => {
    loader.classList.add("hidden");
    sessionStorage.setItem("amr-intro-seen", "1");
    setTimeout(() => loader.remove(), 600);
  };

  loader.addEventListener("click", dismiss);
  setTimeout(dismiss, 1600);
}

// ---------------------------------------------------------------------------
// CUSTOM CURSOR DOT
// ---------------------------------------------------------------------------
function initCursorDot() {
  const dot = document.getElementById("cursor-dot");
  if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  window.addEventListener("mousemove", (e) => {
    dot.style.opacity = "1";
    dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("a, button, .roster-card").forEach((el) => {
    el.addEventListener("mouseenter", () => dot.style.transform += " scale(2.4)");
  });
}

// ---------------------------------------------------------------------------
// HEADER SCROLL STATE
// ---------------------------------------------------------------------------
function initHeaderScroll() {
  const header = document.getElementById("site-header");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

// ---------------------------------------------------------------------------
// MOBILE NAV
// ---------------------------------------------------------------------------
function initMobileNav() {
  const toggle = document.getElementById("nav-toggle");
  const panel = document.getElementById("nav-mobile");
  if (!toggle || !panel) return;

  const close = () => {
    panel.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  panel.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

// ---------------------------------------------------------------------------
// ROSTER GRID
// ---------------------------------------------------------------------------
function initRoster() {
  const grid = document.getElementById("roster-grid");
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="roster-card reveal" tabindex="0" role="button"
              aria-label="View details for ${escapeHtml(p.name)}" data-index="${i}">
      <span class="roster-card__select">SELECT</span>
      <div class="roster-card__portrait">
        ${p.image ? `<img src="${p.image}" alt="${escapeHtml(p.name)}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;">` : `<span>${String(i + 1).padStart(2, "0")}</span>`}
      </div>
      <div class="roster-card__bar">
        <div class="roster-card__name">${escapeHtml(p.name)}</div>
        <div class="roster-card__tag">${escapeHtml(p.tag)}</div>
      </div>
    </article>
  `).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

// ---------------------------------------------------------------------------
// PROJECT MODAL
// ---------------------------------------------------------------------------
function initModal() {
  const modal = document.getElementById("project-modal");
  const grid = document.getElementById("roster-grid");
  if (!modal || !grid) return;

  const portrait = document.getElementById("modal-portrait");
  const tagEl = document.getElementById("modal-tag");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  const stackEl = document.getElementById("modal-stack");
  const linkEl = document.getElementById("modal-link");

  const open = (project) => {
    tagEl.textContent = project.tag;
    titleEl.textContent = project.name;
    descEl.textContent = project.description;
    stackEl.innerHTML = project.stack.map((s) => `<span>${escapeHtml(s)}</span>`).join("");
    linkEl.href = project.url;

    const index = PROJECTS.indexOf(project);
    portrait.innerHTML = project.image
      ? `<img src="${project.image}" alt="${escapeHtml(project.name)}" style="width:100%;height:100%;object-fit:cover;">`
      : `<span>${String(index + 1).padStart(2, "0")}</span>`;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".roster-card");
    if (!card) return;
    open(PROJECTS[Number(card.dataset.index)]);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".roster-card");
    if (!card) return;
    e.preventDefault();
    open(PROJECTS[Number(card.dataset.index)]);
  });

  modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", close));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) close();
  });
}

// ---------------------------------------------------------------------------
// SCROLL REVEAL ANIMATIONS
// ---------------------------------------------------------------------------
function initRevealAnimations() {
  const targets = document.querySelectorAll(".reveal, .stat-row");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((t) => observer.observe(t));
}

// ---------------------------------------------------------------------------
// CONTACT FORM — posts to Formspree if configured, else falls back to mailto
// ---------------------------------------------------------------------------
function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    const usesPlaceholderEndpoint = form.action.includes("YOUR_FORM_ID");

    if (usesPlaceholderEndpoint) {
      const subject = encodeURIComponent(`New project inquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:hello@amrdigitalsolutions.com?subject=${subject}&body=${body}`;
      status.textContent = "Opening your email client…";
      return;
    }

    status.textContent = "Sending…";
    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" }
      });
      if (res.ok) {
        status.textContent = "Message sent — I'll be in touch soon.";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please email hello@amrdigitalsolutions.com directly.";
      }
    } catch {
      status.textContent = "Something went wrong. Please email hello@amrdigitalsolutions.com directly.";
    }
  });
}
