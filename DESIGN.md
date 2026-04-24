# Design Brief

## Direction
Terait Tech Enterprise — premium 3D landing page for enterprise IT managed services with immersive geometric animations and sophisticated dark theme.

## Tone
Bold Tech Minimalism — confident enterprise positioning with immersive 3D visual depth; sophisticated without excess ornamentation.

## Differentiation
Rotating 3D infrastructure visualizations synchronized with scroll velocity and parallax mouse tracking create a visceral sense of technological sophistication and control.

## Color Palette

| Token      | OKLCH            | Role                                           |
| ---------- | ---------------- | ---------------------------------------------- |
| background | 0.15 0.018 265   | Deep space navy; primary surface                |
| foreground | 0.95 0.008 265   | Clean white text; maximum contrast              |
| card       | 0.19 0.02 265    | Slightly elevated card backgrounds               |
| primary    | 0.72 0.22 185    | Vivid cyan/teal; CTAs, interactive highlights   |
| accent     | 0.65 0.24 295    | Electric purple; 3D element emphasis            |
| muted      | 0.25 0.02 265    | Subtle grey for disabled, secondary states       |
| destructive| 0.55 0.22 25     | Coral red for alerts                             |

## Typography
- Display: Space Grotesk — geometric, modern, tech-forward headlines and hero text
- Body: Plus Jakarta Sans — clean, contemporary UI copy and paragraphs
- Mono: JetBrains Mono — technical labels, infrastructure labels
- Scale: hero `text-6xl md:text-7xl font-bold tracking-tight`, h2 `text-4xl md:text-5xl font-bold`, label `text-xs font-semibold tracking-widest uppercase`, body `text-base md:text-lg`

## Elevation & Depth
Depth through layering and color separation; subtle elevated shadow on hover states; glassmorphism on navigation and service cards with semi-transparent borders.

## Structural Zones

| Zone    | Background      | Border                           | Notes                                             |
| ------- | --------------- | -------------------------------- | ------------------------------------------------- |
| Header  | glass           | rgba(primary, 0.1)               | Semi-transparent on scroll; fixed positioning     |
| Content | background      | —                                | Alternating muted/background for section rhythm   |
| 3D Hero | background      | —                                | Full viewport; parallax 3D element focus          |
| Cards   | card            | rgba(primary, 0.15)              | Elevated shadow on hover; light glow accent       |
| Footer  | 0.12 0.015 265  | rgba(primary, 0.1)               | Darker than content; upper border accent          |

## Spacing & Rhythm
Section gaps: 6rem–8rem vertical rhythm; content groups: 2.5rem; micro-spacing: 0.75rem. Breathing room around hero and 3D focal points; compressed spacing on service cards for visual density.

## Component Patterns
- Buttons: Primary (cyan bg, dark text, glow on hover), Secondary (transparent, border, accent on hover), minimal rounded corners (rounded-lg)
- Cards: 12px radius, glass background, subtle border, elevated shadow on hover
- Badges: Rounded-full, primary background, muted text
- CTAs: Glow effect, smooth scale on hover, animated underline on link hover

## Motion
- Entrance: Staggered fade-in-up on section scroll; 0.6s duration with cubic-bezier easing
- Hover: Smooth scale (1.02x), elevation shadow increase, glow intensity boost
- Decorative: Slow 3D spin (20s), floating accent shapes, scroll-tied rotation speed

## Constraints
- No full-page gradients; depth via layering and color shift
- Glow effects applied sparingly to CTAs and 3D elements only
- Maintain minimum 7:1 contrast on all text per WCAG AA+
- 3D animations throttled on scroll for performance; mobile falls back to static hero

## Signature Detail
Rotating 3D node infrastructure visualization with rotation speed linked to scroll velocity creates a tangible sense that the user is controlling the systems Terait manages—enterprise tech brought to human scale.
