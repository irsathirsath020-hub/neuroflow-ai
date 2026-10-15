# Neuroflow AI delivery checklist

## 1. Optimized scroll-scrubbed video background

- [x] Use the uploaded video as a fixed, full-screen background with `object-fit: cover`.
- [x] Link video playback to scroll so scrolling forward plays the video and scrolling back rewinds it by scrubbing `currentTime` from scroll progress.
- [x] Add a dark gradient overlay so text stays readable.
- [x] Preload the video, mute it, and add a poster fallback for mobile, reduced motion, and unsupported playback.
- [x] Compress/optimize the source with ffmpeg to about 8 MB using H.264, maximum 1080p, no audio, and frequent keyframes with `-g 1` or `-g 2`.
- [x] Serve a lighter 720p version on mobile.

## 2. Modern AI startup visual system

- [x] Use dark mode, neon blue/purple gradients, glassmorphism cards, and clean sans-serif typography such as Inter or Space Grotesk.
- [x] Add animated gradient text and floating particles.
- [x] Add hover effects and micro-interactions on cards and buttons.
- [x] Support a dark/light mode toggle.
- [x] Keep the page fully responsive and mobile-first.

## 3. Content sections and scroll reveals

- [x] Add a Hero section with a large headline, supporting text, `Get Started` and `Watch Demo` buttons.
- [x] Add a Features section with 3–6 glass cards and icons.
- [x] Add a How It Works / WORKFLOW section with four animated steps: Input, AI Processing, Smart Output, and Results.
- [x] Give each workflow step a numbered icon, title, and short description.
- [x] Connect workflow steps with a glowing line that fills as the user scrolls.
- [x] Animate workflow steps in one by one, synchronized with the background video.
- [x] Add Use Cases, Pricing with three tiers, Testimonials, FAQ accordion, and Final CTA plus footer.
- [x] Make each major section fade/slide in on scroll.

## 4. Product interactions and conversion

- [x] Add a sticky blurred navbar with active-section highlighting.
- [x] Add a scroll progress bar at the top.
- [x] Add animated counters for users, accuracy, and speed.
- [x] Add a custom cursor glow effect for pointer devices.
- [x] Add an AI chatbot widget in the bottom-right corner.
- [x] Add an email signup form with validation and a clear success state.
- [x] Add smooth scrolling with GSAP + ScrollTrigger or an equivalent.

## 5. Quality and delivery

- [x] Keep code clean, commented, and easy to edit.
- [x] Keep meaningful page content in initial HTML with metadata for the public landing page.
- [x] Provide `GET /manus-routes.json` with the complete public route set.
- [x] Verify the project runs on the configured runtime port and preview is reachable.
- [x] Verify desktop and mobile layouts, keyboard focus, FAQ/chat/theme/form states, and reduced-motion fallback.
- [ ] Save a checkpoint and publish a live version when the build is validated.
