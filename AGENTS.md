# AGENTS.md

```bash
pnpm dev              # Dev server (ask user before running)
pnpm lint             # Oxlint
pnpm format           # Oxfmt
pnpm typecheck        # Typescript
```

> [!IMPORTANT]
> Run `pnpm lint`, `pnpm format` and `pnpm typecheck` after every implementation.

## Rules

**Do:**

- Follow YAGNI — build only what's needed right now
- Follow code conventions (see guidelines below)
- [ALWAYS!] Clasify the task and read relevant guidelines
- [NEVER!] Write comments
- Use efficient, performant, and clean code convention
- Ask if unsure

**Don't:**

- Reformat/rewrite unrelated files
- Install packages without permission
- Create other feature even it's related, it must be user asked
- Run dev server or build without being asked

## Guidelines

| Topic                                                         | File                                      |
| ------------------------------------------------------------- | ----------------------------------------- |
| Import aliases, website copy                                  | [general.md](.ai/guidelines/general.md)   |
| Frontend (HTML, React, Tailwind, Shadcn, SSR, routing, forms) | [frontend.md](.ai/guidelines/frontend.md) |

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
