# Neuroflow AI landing page plan

## Implementation approach

Build a static, content-rich single-page website with `index.html`, `styles.css`, and `script.js` so the landing page remains easy to edit, fast to publish, and crawler-readable without requiring a backend. Use GSAP + ScrollTrigger from pinned CDN URLs for reveal choreography and workflow progress, while keeping the video scrub loop in a small vanilla controller so it can respond directly to scroll progress.

The uploaded video will be transcoded into two muted H.264 assets with `-g 2`, `-movflags +faststart`, and no audio: a desktop 1280×720 file targeted near 8 MB and a lighter 720p-class mobile file. A poster frame will be used for mobile and for browsers that cannot play video. The desktop video is fixed beneath the page with `object-fit: cover`; a layered gradient and grain/palette overlays maintain contrast.

No server, database, authentication, or customer data is needed. The email form validates locally and shows a success state without sending data. The chatbot is a lightweight front-end widget with scripted responses and an accessible open/close interaction. The site ships with static metadata, a route manifest, and a no-build publish configuration.

## Project structure

- `index.html` — semantic, content-bearing single-page markup, metadata, video sources, sections, FAQ, chatbot, and footer.
- `styles.css` — theme tokens, responsive layout, glass surfaces, gradients, motion, accessibility, light mode, and mobile-specific rules.
- `script.js` — GSAP/ScrollTrigger setup, scroll-scrubbed video, section highlighting, counters, FAQ, form validation, chatbot, cursor glow, and theme toggle.
- `assets/flow-desktop.mp4` — optimized desktop scroll-scrub asset.
- `assets/flow-mobile.mp4` — lighter mobile scroll-scrub asset.
- `assets/flow-poster.jpg` — poster fallback and mobile visual fallback.
- `manus-routes.json` — declared public route set, served at the root.
- `app.config.ts` — static project-logo metadata when a durable logo asset is available.
- `plan.md` — this plan and design system.
- `TODO.md` — acceptance-driven delivery checklist.

## Design direction

### Style candidates

- **Neon Observatory / chosen (0.06)** — cinematic midnight canvas, electric cyan-to-violet signal trails, and translucent lab-glass panels.
- **Quiet Machine (0.04)** — warm graphite, restrained cobalt, and editorial whitespace with almost no glow.
- **Synthetic Bloom (0.03)** — deep plum, liquid magenta, and soft organic blobs with a more playful AI tone.

### Design Movement

Neon Observatory: cinematic sci-fi product design tempered by Swiss editorial structure and a restrained glassmorphism system.

### Core Principles

1. The uploaded motion is the primary brand surface; UI supports it instead of competing with it.
2. Every luminous detail communicates signal, progress, or intelligence.
3. Use clear asymmetry and staggered offsets so the page feels authored rather than template-driven.
4. Keep text contrast, focus states, reduced-motion behavior, and touch targets production-ready.

### Color Philosophy

Midnight navy and near-black create a quiet control room for the video to live inside. Electric cyan signals clarity and speed; violet-magenta indicates synthesis and creative range. Frosted white surfaces and cool lavender text keep glass panels legible without flattening the atmosphere.

### Layout Paradigm

A vertical narrative with a wide, offset hero composition; section headings sit on a left rail while content drifts on an asymmetric content plane. Workflow uses a horizontal signal path on desktop and a vertical rail on mobile so the journey remains legible at every size.

### Signature Elements

- A luminous “signal rail” that runs from the workflow through progress indicators.
- Tiny orbital particles and hairline grid marks that imply an active intelligence system.
- Pill-shaped micro labels and oversized gradient typography used as navigational landmarks.

### Interaction Philosophy

Interactions should feel like operating a calm, precise instrument: surfaces lift by a few pixels, borders glow at the point of attention, and state changes are accompanied by subtle signal pulses rather than noisy motion. The page always provides a non-animated equivalent for keyboard, touch, reduced-motion, or unsupported-video users.

### Animation

Hero copy enters with a short rise and blur removal. Section groups reveal with `ScrollTrigger` once, while workflow steps reveal sequentially as the same scroll progress fills the signal line and scrubs the video. Counters animate only when entering view. Hover interactions use quick 180–240 ms transforms. `prefers-reduced-motion` disables decorative motion, leaves the poster/background tint in place, and preserves content order.

### Typography System

Use `Space Grotesk` for the wordmark and display headlines, with `Inter` for body copy, labels, and controls. Display sizes step from `clamp(3.8rem, 10vw, 8.6rem)` for the hero through compact uppercase eyebrow labels. Body copy stays at 16–18px with generous line-height; numeric counters use tabular figures.

### Brand Essence

**Positioning:** Neuroflow turns messy inputs into decisions teams can act on immediately. **Personality:** lucid, kinetic, assured.

### Brand Voice

Short, specific, and quietly confident. Headlines frame a transformation; supporting copy names the friction being removed.

- “Signal in. Momentum out.”
- “Your next clear move is already in the data.”

### Wordmark & Logo

A lowercase `neuroflow` wordmark paired with a four-node orbital mark: four small points on a rounded square path, one node highlighted in cyan to represent the active signal.

### Signature Brand Color

**Flux Cyan** `#71E7FF` — a cool, almost-white cyan with enough saturation to own the interface and remain readable against midnight surfaces.

## Interaction and content map

1. **Hero:** “Signal in. Momentum out.”, supporting copy, `Get started` and `Watch demo` buttons, metrics row, video-driven backdrop.
2. **Features:** six glass cards covering multimodal intake, pattern discovery, decision trails, secure workspace, live signals, and team-ready outputs.
3. **Workflow:** Input → AI processing → Smart output → Results with a progress signal line and synchronized active states.
4. **Use cases:** product, revenue, and operations cards with a small “how teams use it” matrix.
5. **Pricing:** Starter, Scale (highlighted), and Enterprise tiers with clear feature stacks and CTAs.
6. **Testimonials:** three quotes with role/company metadata.
7. **FAQ:** accessible accordion for security, data sources, onboarding, and plan changes.
8. **Final CTA/footer:** email capture, resource links, status/availability note, and social/legal links.

## Technical and delivery notes

- Use semantic landmarks and meaningful initial HTML so the page is indexable before JavaScript runs.
- Keep browser scripts deferred and use CDN assets only for GSAP/ScrollTrigger and font loading.
- Use `preload="auto"`, `poster`, `muted`, `playsinline`, and a `<picture>`-style source selection via `<source media>` for the video so scroll scrubbing can seek immediately after `loadedmetadata`.
- Keep the poster as an independent background layer so unsupported video and reduced-motion users still get the intended visual fallback; the mobile source remains the lighter asset.
- Implement top scroll progress, active section highlight via `IntersectionObserver`, a custom cursor glow only for fine pointers, local theme persistence, and accessible form/chat/FAQ controls.
- Publish as a static build whose declared command copies editable root files and `assets/` into `dist/`, with route manifest `GET /manus-routes.json`.
- Verify local HTML/CSS/JS syntax, asset presence/size, route manifest response, preview readiness, desktop/mobile screenshots, and publish result before delivery.
