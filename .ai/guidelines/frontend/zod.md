# Zod Guidelines

Always use the mini version: `import { z } from 'zod/mini'`

Files live in `inertia/lib/validators/{domain}.ts`. Export both the schema and its inferred type.

## Example

```ts
// inertia/lib/validators/user.ts
import { z } from "zod/mini";

export const signUpSchema = z
  .object({
    name: z.string().check(z.minLength(3)).check(z.maxLength(255)),
    email: z.email().check(z.maxLength(255)),
    password: z.string().check(z.minLength(8)).check(z.maxLength(32)),
    passwordConfirmation: z.string(),
  })
  .check(
    z.refine((data) => data.password === data.passwordConfirmation, {
      error: "Password and confirmation password must be same",
      path: ["passwordConfirmation"],
    })
  );

export const loginSchema = z.object({
  email: z.email().check(z.maxLength(255)),
  password: z.string().check(z.maxLength(255)),
  rememberMe: z.optional(z.boolean()),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
```

## Key Differences from Standard Zod

- Constraints are chained via `.check()` instead of direct methods: `z.string().check(z.minLength(3))`
- `z.email()` is top-level, not `z.string().email()`
- `z.optional()` wraps the type rather than chaining
- Cross-field validation: `.check(z.refine(...))` on the object
