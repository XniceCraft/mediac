# Frontend Guidelines

## A. HTML

- Minimize DOM depth and complexity
- Minimize unnecessary classes and aria
- No custom attributes without asked, e.g. id's, data-*
- Use `html` skills for code generation

## B. TypeScript & React

- No `any`; use `unknown` + narrowing
- Type-only imports: `import type { X }`
- Never write once used variable
- Use `typescript-advanced-types` skills for code generation
- Function declarations (not arrow functions)
- Named exports `{}` except page components (default export).
- **Never** write components props type into separate type (interface/type) unless it's reused
- Use `vercel-composition-patterns`, `vercel-react-best-practices` skills for code generation

## C. Tailwind CSS

- No `tailwind.config.ts`
- Tokens go in `@theme {}` inside `src/globals.css`
- Never hardcode hex/px; always reference tokens (`bg-brand`, `rounded-card`)
- Dynamic values only → inline style.
- Use `tailwind-design-system` and `tailwind-4-docs` skills for code generation

> [!WARN] Always: `import { cn } from '@/lib/utils'` for class merging.

## D. Shadcn UI

- Install via `pnpm dlx shadcn@latest add <component>`.
- Treat as owned code; edit directly.
- Check `components/ui/` before building custom primitives.
- Keep CSS vars in the same `@theme`/`:root` block.
- Use `shadcn` skills for code generation

## E. SSR

- Guard all browser APIs: `typeof window !== 'undefined'`

## F. Pages and Local Components

- Local components: `src/{route}/_components/{name}.tsx`.
- Group by subfolder if more than one domain.

## G. Zod Validation

- Always `import { z } from 'zod/mini'`.
- See `frontend/zod.md`

## J. Form

- `react-hook-form` + `zodResolver`.
- See `frontend/form.md`
