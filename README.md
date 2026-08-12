# MediaC

Convert images directly in your browser.

## Supported Formats

You can load six input formats and convert them into four target output options:

- **Input Formats**: JPG, PNG, WebP, AVIF, JXL, HEIC
- **Output Formats**: JPG, PNG, WebP, PDF

## Processing Architecture

- **AVIF / JPEG / JXL / PNG / WebP**: Decoded and encoded through `@jsquash` WebAssembly modules loaded dynamically on demand.
- **HEIC**: Converted to PNG canvas elements via `heic-to` before re-encoding.
- **PDF**: Generated from encoded PNG raw bytes using `pdf-lib`.

## Getting Started

### Prerequisites

You need Node.js 20 or higher installed on your system.

### Installation

You can clone the repository and install dependencies using `pnpm`:

```bash
git clone https://github.com/XniceCraft/mediac.git
cd mediac
pnpm install
```

### Local Development

You can start the local Next.js development server:

```bash
pnpm dev
```

You can open [http://localhost:3000](http://localhost:3000) in your browser to use the application.

## Available Scripts

You execute the following commands during project development and code verification:

| Command             | Description                                     |
| ------------------- | ----------------------------------------------- |
| `pnpm dev`          | Starts the Next.js 16 development server        |
| `pnpm build`        | Compiles the production bundle                  |
| `pnpm start`        | Runs the compiled production server             |
| `pnpm lint`         | Audits source files using `oxlint`              |
| `pnpm format`       | Formats code with `oxfmt`                       |
| `pnpm format:check` | Verifies code formatting without altering files |
| `pnpm typecheck`    | Validates TypeScript types using `tsgo`         |

## Tech Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS v4, Shadcn UI
- **Icons**: Phosphor Icons
- **Decoders & Encoders**: `@jsquash` (Wasm), `heic-to`, `pdf-lib`
- **Tooling**: `oxlint`, `oxfmt`, `tsgo`, `pnpm`
