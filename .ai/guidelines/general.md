# General Guidelines

## 1. Import Aliases

> [!CRITICAL] Never use relative imports (`../../..`) when an alias exists. Always check aliases before writing an import.

**Frontend** — `@/*` → `src/*`. Use relative imports only for per-page `_components/`.

```ts
import { Button } from "@/components/button"; // shared
import { HeroSection } from "./_components/hero-section"; // local to page
```

## 2. Website Content

- Use `stop-slop-v2` skills for words generation
