# MediaC — v1 Product Spec

**App type:** Public web app  
**Stack:** Next.js + React + React Hook Form + shadcn/ui + Zod

---

## Conversion Matrix

| Input                           | Output              |
| ------------------------------- | ------------------- |
| JPG, PNG, WebP, Avif, JXL, HEIC | JPG, PNG, WebP, PDF |

---

## User Flow

1. Select **output format**
2. Upload files — non-matching files are **rejected**
3. Set quality preset
4. Convert → download

---

## File Limits (Soft Limit, warn if exceeds)

- Max **20MB per file**
- Max **20 files per batch**

---

## Output & Download

- Individual download per file
- "Download All as ZIP" for batch
- PDF → Image: all pages → separate images → zipped

---

## Quality Presets

- Low (60%) / Medium (80%) / High (90%) / Lossless
- Applies to JPG and WebP output only

---

## Technical Notes

- Fully **client-side** — no backend
- HEIC decoding via **lazy-loaded WASM** module
- PDF rendering via **pdf-lib**

---

## v2 Backlog

- PDF compression
- "Any image" wildcard input mode
