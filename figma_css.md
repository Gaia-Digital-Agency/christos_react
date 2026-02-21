# Figma CSS -> This Project (Step-by-Step Guide)

This guide explains how to take CSS from Figma and make it work correctly in this codebase.

Project stack (important for decisions):
- Next.js App Router
- Tailwind CSS
- SCSS Modules (`*.module.scss`)
- Global CSS at `src/app/globals.css`

## 1. Understand what Figma CSS is (and is not)

Figma's exported CSS is a visual snapshot, not production-ready frontend code.

What Figma CSS is good for:
- Exact color values
- Font sizes/weights/line-heights
- Border radius, shadow, spacing hints
- Basic layout intent

What Figma CSS is often bad for:
- Heavy `position: absolute` usage
- Fixed widths/heights that break on mobile
- Deeply nested, auto-generated names
- Pixel-perfect values that ignore responsiveness

Rule: treat Figma CSS as a design spec, not source code to paste directly.

## 2. Pick where each style should live in this repo

Use this mapping consistently:

- **Design tokens** (colors, spacing scale, radii, shadows):
  - `src/app/globals.css` (`:root` custom properties)
- **Tailwind utility access to tokens**:
  - `tailwind.config.ts` (`theme.extend`)
- **Component-specific styles**:
  - `src/components/**/Something.module.scss`
- **Page-level one-off layout wrappers**:
  - either `globals.css` utility classes or page-local module SCSS

If you skip this structure, styles become hard to maintain.

## 3. Extract tokens from Figma first

Before coding, list these from Figma:
- Colors (`#RRGGBB`, rgba)
- Typography scale (family, size, weight, line-height, letter-spacing)
- Radius values
- Shadow styles
- Spacing rhythm (e.g., 8/12/16/24/32)

Create a small token table in notes first, then implement.

Example token list:
- Primary green: `#487413`
- Accent gold: `#c9a538`
- Surface dark: `#2d2115`
- Radius pill: `999px`
- Radius panel: `16px`

## 4. Add/update CSS variables in `globals.css`

File:
- `src/app/globals.css`

Inside `:root`, add semantic variables (not raw names like `--green1`).

Example:

```css
:root {
  --color-bg: #ded0b6;
  --color-text: #2d2115;
  --color-primary: #487413;
  --color-accent: #c9a538;

  --radius-sm: 0.5rem;
  --radius-lg: 1rem;
  --radius-pill: 999px;

  --shadow-panel: 0 8px 30px rgba(0, 0, 0, 0.18);
}
```

Why: this gives a single source of truth and makes future restyling easier.

---

## 5. Map tokens into Tailwind config

File:
- `tailwind.config.ts`

Add your semantic token usage into `theme.extend` so Tailwind classes can use them.

Example pattern:

```ts
extend: {
  colors: {
    brand: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    surface: 'var(--color-bg)',
    textbase: 'var(--color-text)',
  },
  borderRadius: {
    panel: 'var(--radius-lg)',
    pill: 'var(--radius-pill)',
  },
}
```

Why: lets you use utility classes (`bg-brand`, `text-textbase`, `rounded-pill`) instead of repeating raw values.

## 6. Rebuild structure in JSX before styling details

Figma layout often uses absolute positioning. In app code, build semantic structure first:
- Header/Nav
- Hero content
- Section wrappers
- Cards/panels

Use Flex/Grid and document flow for layout.

Only use `position: absolute` for true overlays/decorative elements.

Why: responsive behavior depends more on structure than exact CSS values.

## 7. Move component styles into `*.module.scss`

For each component:
1. Create or open the module file
2. Add scoped class names (`.container`, `.title`, `.actions`)
3. Copy only relevant Figma rules (typography/spacing/surface)
4. Remove fixed pixel heights unless required
5. Replace hardcoded colors with CSS variables

Example:

```scss
.panel {
  background: rgba(45, 33, 21, 0.84);
  color: var(--color-bg);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-panel);
  padding: clamp(1rem, 2vw, 1.5rem);
}

.title {
  font-size: clamp(1.5rem, 2.6vw, 2.2rem);
  line-height: 1.2;
}
```

Why: module scoping prevents style collisions and keeps components portable.

## 8. Mix Tailwind + SCSS intentionally

Recommended split:
- Tailwind for layout/utilities:
  - spacing, flex/grid, width constraints, breakpoints
- SCSS modules for visual identity:
  - gradients, glass effects, special typography combinations

Do not duplicate the same rule in both Tailwind and SCSS.

Good:
- JSX: `className="grid gap-4 md:grid-cols-2"`
- Module: complex card background, custom hover effect


## 9. Handle fonts correctly (critical)

If Figma specifies custom fonts, load them in Next.js (e.g., `next/font/google` or local font setup).

If you do not load the exact font, the page will never match Figma.

Checklist:
- Confirm font family name in Figma
- Confirm font weights used (400/500/600/700 etc.)
- Ensure those weights are loaded
- Apply font family consistently


## 10. Convert fixed pixels to responsive rules

Common replacements:
- `font-size: 48px` -> `clamp(2rem, 4vw, 3rem)`
- `padding: 40px` -> `padding: clamp(1rem, 3vw, 2.5rem)`
- hard widths -> `max-width` + fluid width

Mobile-first approach:
1. Make layout work at ~320-390px width first
2. Add `sm/md/lg` adjustments
3. Validate at tablet and desktop


## 11. Validate states and interactions

From Figma, check:
- Hover styles
- Focus states
- Disabled states
- Active/current nav states

Add keyboard-visible focus styles (`:focus-visible`) for accessibility.

## 12. Sanity-check against design

Comparison workflow:
1. Open Figma frame and app side-by-side
2. Compare by priority:
   - layout structure
   - typography hierarchy
   - color contrast/visual weight
   - spacing rhythm
3. Fix biggest mismatches first (not tiny pixel differences)


## 13. Common mistakes to avoid

- Pasting full Figma CSS into `globals.css`
- Keeping all absolute coordinates from Figma export
- Hardcoding hex values in multiple files
- Ignoring font loading
- Styling before JSX structure is clean
- Over-optimizing for one desktop width


## 14. Practical workflow for each new screen

Use this exact sequence every time:

1. Export/inspect Figma styles for the target screen.
2. Extract tokens and add missing ones to `src/app/globals.css`.
3. Add or update Tailwind mappings in `tailwind.config.ts`.
4. Build semantic JSX layout in the page/component.
5. Add scoped styles in module SCSS.
6. Replace hardcoded values with tokens.
7. Add responsive behavior (`clamp`, breakpoints, fluid widths).
8. Add states (hover/focus/disabled).
9. Compare with Figma and adjust.
10. Keep only necessary styles; remove leftovers.

## 15. Quick template you can reuse

When starting a new component from Figma:

```tsx
import styles from './ExampleCard.module.scss'

export function ExampleCard() {
  return (
    <section className={`${styles.card} max-w-5xl mx-auto`}>
      <h2 className={styles.title}>Title</h2>
      <p className={styles.body}>Body text...</p>
    </section>
  )
}
```

```scss
.card {
  border-radius: var(--radius-lg);
  background: var(--color-bg);
  color: var(--color-text);
  padding: clamp(1rem, 2vw, 1.75rem);
}

.title {
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  line-height: 1.2;
}

.body {
  margin-top: 0.75rem;
  line-height: 1.6;
}
```

## 16. If a Figma block still will not match

Debug in this order:
1. Font loaded? Correct weights?
2. Is line-height/letter-spacing copied correctly?
3. Is a parent container constraining width?
4. Are absolute children needing a relative parent?
5. Is Tailwind class overriding module CSS (or vice versa)?
6. Is the browser zoom different from design review?
