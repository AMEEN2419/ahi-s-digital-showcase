
# Ameen Islahi — Personal Portfolio

A dramatic, dark-mode-dominant black & white portfolio built around your resume, with smooth animations, an AI guide named **AHI**, and a working contact form that emails you at `ameenislahi24@gmail.com`.

## Visual Style

- **Theme:** Black background, white text, white/grey accents only — no color.
- **Typography:** Large editorial headings (e.g. Space Grotesk / Inter) with bold weights, fine letter-spacing for section labels.
- **Motion language** (taken from your reference recording — smooth scroll-driven reveals, soft fades, slow scale-ins, glow pulses, magnetic hover):
  - Section fade + slide-up on scroll
  - Letter-by-letter hero name reveal
  - Glow-pulse ring around your circular profile photo
  - Hover scale on cards & magnetic buttons
  - Animated underline on nav links
  - Cursor-following soft glow (desktop only)
  - Subtle grain/noise overlay for texture

## Page Structure (single-page, anchored sections)

1. **Hero**
   - Left: name "AMEEN ISLAHI B", role tag "Computer Science Engineer · UI/UX Designer", short tagline, CTA buttons (Contact, View Projects).
   - Right: **circular framed primary photo (`AM_PHOTO.jpeg`) with animated glowing ring** (pulsing white halo).
   - Sticky top nav with animated underline links.

2. **About**
   - Professional summary from resume.
   - Side accent: secondary formal photo (`AM_PHOTO-2.jpeg`) in a smaller framed card with a subtle white border + glow on hover — gives strong dual-photo visual rhythm (casual hero / formal about).

3. **Skills** (placed directly above Education as requested)
   - Four grouped cards: Design & UX · Technical & Front-End · AI & Productivity · Soft Skills.
   - Each skill as an animated chip that fades in on scroll.

4. **Education** (directly below Skills)
   - Timeline with two entries: BE CSE — Dhaanish Ahmed Institute of Technology (2023–2027), and Higher Secondary — Kumarapuram HSS (80%, 2021–2022).

5. **Projects**
   - Grid of cards with hover scale + reveal:
     - Ransomware Detection Web Application
     - Network Scanner & Web Application Scanner
     - Smart Electric Vehicle
     - **Symptom-Based Medicine Recommendation Chatbot** (Python) — built for KPR Engineering College Hackathon, Coimbatore. Suggests appropriate medicines from user-entered symptoms.

6. **Experience**
   - Cyber Security Intern — Ediglobe (07/2025 – 08/2025).

7. **Achievements & Leadership**
   - Team Captain across hackathons.
   - 1st Place — Inter-International Hackathon (college).

8. **Courses & Languages**
   - Courses: Ethical Hacking (NSDC), Cyber Security Ethical Hacking (Kshitij).
   - Languages: English, Malayalam, Tamil (Fluent), Hindi (Intermediate) — animated proficiency bars.

9. **Contact**
   - Functional form (Name, Email, Message) → emails `ameenislahi24@gmail.com`.
   - Side panel with phone (9778534700), email, location (Palakkad 678001), LinkedIn, GitHub.

10. **Footer** — minimal, social links, copyright.

## AHI — Interactive Guide Chatbot

Floating circular chat button (bottom-right) with glowing ring, opens a dark chat panel.

**Behavior:**
- Greets first: *"Hello! Nice to meet you — I'm AHI, Ameen's portfolio assistant. Ask me about his projects, skills, or anything from his resume."*
- AI-powered (Lovable AI / Gemini) with Ameen's full resume loaded as system context, so it can answer any question naturally.
- **Auto-scroll guidance:** when the visitor mentions a topic (e.g. "tell me about your projects", "ransomware", "education", "contact"), AHI replies AND smoothly scrolls the page to that section. Done by detecting intent keywords in the AI response (or via a small tool-call) and triggering `scrollIntoView` on the matching anchor.
- Suggestion chips: "Show projects", "His skills", "Education", "Contact him".

## Contact Form Email Delivery

- Edge function `send-contact-email` validates input (zod) and sends via **Resend** through the connector gateway to `ameenislahi24@gmail.com`.
- From address uses Resend's test sender `onboarding@resend.dev` until you verify a custom domain.
- Toast notifications for success / failure (rate-limit, validation, server errors).

## Responsiveness

- Mobile-first layout. Hero stacks vertically on phones (photo on top, text below). Grids collapse to single column. Nav becomes a slide-in drawer. Chat panel becomes near-fullscreen on small screens. Glow & cursor effects gracefully disabled on touch devices.

## Reference Video Usage

The screen recording you uploaded is used **only as motion reference** to match the animation feel — it will not be embedded anywhere on the site.

## Assets

- `src/assets/ameen-hero.jpg` ← `AM_PHOTO.jpeg` (hero, circular + glow)
- `src/assets/ameen-formal.jpg` ← `AM_PHOTO-2.jpeg` (about section)
- Resume PDF copied to `public/Ameen_Islahi_Resume.pdf` with a "Download Resume" button in hero.

## Technical Details

- React + Vite + Tailwind + shadcn/ui, design tokens in `index.css` (pure B&W HSL palette).
- Lovable Cloud enabled; Resend connector linked for contact email.
- Edge functions: `send-contact-email`, `ahi-chat` (streaming Lovable AI Gateway, model `google/gemini-3-flash-preview`, system prompt = full resume).
- Frontend chat parses streaming SSE token-by-token and renders markdown.
- Intersection Observer + Tailwind keyframes for scroll animations; Framer Motion only if needed for orchestrated sequences.
- Form validated client + server side with zod.
- Smooth scroll via native `scrollIntoView({behavior:'smooth'})` on section anchors.
