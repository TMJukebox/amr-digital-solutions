# AMR Digital Solutions — Portfolio Site

A single-page portfolio site styled like a Persona 5-inspired character-select screen. No build step — plain HTML/CSS/JS, works on any static host.

## Preview locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500. (Opening `index.html` directly by double-clicking also works for looking at the design, but use the local server if you wire up the contact form to a live endpoint.)

## What to customize before launch

1. **Projects (the roster)** — [assets/js/script.js](assets/js/script.js), edit the `PROJECTS` array at the top. Each entry:
   ```js
   {
     name: "Real Client Name",
     tag: "Restaurant Website",
     description: "What they needed, what you built, the result.",
     stack: ["HTML", "CSS", "JS"],
     url: "https://theirsite.com",
     image: "assets/img/project-01.jpg" // or null for the placeholder number tile
   }
   ```
   Drop screenshots into `assets/img/` and point `image` at them. Card count adjusts automatically — add or remove entries freely.

2. **Contact info** — in [index.html](index.html), find the `#contact` section: update the `mailto:` email and the phone `tel:` link/text (currently `[Your Phone Number]`).

3. **Contact form submissions** — the form currently falls back to opening the visitor's email client (`mailto:`) because the Formspree endpoint is a placeholder. To get submissions sent to your inbox without a mailto popup:
   - Sign up free at [formspree.io](https://formspree.io), create a form, and copy its endpoint.
   - In `index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` (in the `<form>` tag's `action`) with your real endpoint.

4. **Business email** in the footer/contact section is currently `hello@amrdigitalsolutions.com` — update if that's not your real address.

## Deploying

Any static host works since there's no build step. Easiest options:

- **Netlify** — drag the project folder onto [app.netlify.com/drop](https://app.netlify.com/drop), or connect a GitHub repo for auto-deploys. Netlify Forms also works as a zero-signup alternative to Formspree if you host there (ask me to wire it up).
- **GitHub Pages** — push this folder to a repo, enable Pages in repo settings, done.
- **Vercel** — `vercel deploy` from this folder, or connect the repo in the dashboard.

Once you have a domain, point its DNS at whichever host you pick.
