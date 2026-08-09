# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** MediaC
**Generated:** 2026-08-09 17:53:20
**Category:** File Converter Utility
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 3/10 (Subtle) | Density 5/10 (Standard)
**Theme:** Light only (no dark mode)

---

## Global Rules

### Color Palette

| Role        | Hex       | CSS Variable          |
| ----------- | --------- | --------------------- |
| Primary     | `#1E3A5F` | `--color-primary`     |
| On Primary  | `#FFFFFF` | `--color-on-primary`  |
| Secondary   | `#2563EB` | `--color-secondary`   |
| Accent/CTA  | `#059669` | `--color-accent`      |
| Background  | `#F8FAFC` | `--color-background`  |
| Foreground  | `#0F172A` | `--color-foreground`  |
| Muted       | `#F1F3F5` | `--color-muted`       |
| Border      | `#E4E7EB` | `--color-border`      |
| Destructive | `#DC2626` | `--color-destructive` |
| Ring        | `#1E3A5F` | `--color-ring`        |

**Color Notes:** Navy professional + paid green

### Typography

- **Font:** Plus Jakarta Sans (single family, weight variations for hierarchy)
- **Mood:** warm geometric, professional, friendly, clean, utility
- **Google Fonts:** [Plus Jakarta Sans](https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap)

**CSS Import:**

```css
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap");
```

**Scale:**

- Display: 700 weight, -0.5 tracking
- Heading: 600 weight
- Body: 400/500 weight, 16px base, line-height 1.5
- Labels/Captions: 500 weight, uppercase optional

### Spacing Variables

_Density: 5/10 — Standard_

| Token         | Value             | Usage                     |
| ------------- | ----------------- | ------------------------- |
| `--space-xs`  | `4px` / `0.25rem` | Tight gaps                |
| `--space-sm`  | `8px` / `0.5rem`  | Icon gaps, inline spacing |
| `--space-md`  | `16px` / `1rem`   | Standard padding          |
| `--space-lg`  | `24px` / `1.5rem` | Section padding           |
| `--space-xl`  | `32px` / `2rem`   | Large gaps                |
| `--space-2xl` | `48px` / `3rem`   | Section margins           |
| `--space-3xl` | `64px` / `4rem`   | Hero padding              |

### Shadow Depths

| Level         | Value                          | Usage                       |
| ------------- | ------------------------------ | --------------------------- |
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)`   | Subtle lift                 |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)`    | Cards, buttons              |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)`  | Modals, dropdowns           |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #059669;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1e3a5f;
  border: 2px solid #1e3a5f;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1e3a5f;
  outline: none;
  box-shadow: 0 0 0 3px #1e3a5f20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Flat Minimalism

**Keywords:** flat, clean, functional, no-decoration, grid layout, high contrast, utility-first

**Best For:** Converter tools, utility apps, developer tools, productivity

**Key Effects:** No shadows on surfaces, clear border-based hierarchy, functional color only

### Icons

**Icon Set:** Phosphor Icons (outline weight, tree-shaken imports)

- Package: `@phosphor-icons/react`
- Weight: Regular (default) for UI, Bold for emphasis
- Size: 20px inline, 24px standalone, 32px hero

### Layout Pattern

**Desktop (≥768px):** Two-column split

- Left column: Input/output format selectors, quality preset
- Right column: File upload zone (dashed border) + file list + results

**Mobile (<768px):** Stack vertically

- Config on top, upload zone below

### Upload Zone

- Dashed 2px border, rounded 8px
- Centered upload icon + "Drag files or click to browse" text
- Subtle bg tint on hover/dragover (muted color)

### Border Radius

| Element | Radius |
| ------- | ------ |
| Cards   | 8px    |
| Buttons | 6px    |
| Inputs  | 6px    |
| Modals  | 12px   |

---

## Motion

**Level:** Subtle micro-interactions only (no GSAP, no scroll animations, no entrance stagger)

| Interaction        | Duration       | Property                       |
| ------------------ | -------------- | ------------------------------ |
| Button hover/press | 150-200ms      | opacity, background-color      |
| Focus ring appear  | 150ms          | box-shadow                     |
| Progress bar fill  | CSS transition | width                          |
| Dragover highlight | 150ms          | background-color, border-color |

- ✅ All transitions via CSS `transition` property
- ✅ Respect `prefers-reduced-motion: reduce`
- ❌ No translateY hover effects
- ❌ No page transitions
- ❌ No entrance/exit animations

---

## Anti-Patterns (Do NOT Use)

- ❌ Excessive decoration
- ❌ Complex shadows
- ❌ 3D effects

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from Phosphor Icons (outline weight)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
