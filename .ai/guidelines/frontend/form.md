# Forms

- [ALWAYS!] Use Shadcn Components
- Docs: <https://ui.shadcn.com/docs/forms/react-hook-form>

```tsx
// inertia/pages/auth/sign-up.tsx
import { useCallback, useId } from "react";
import { Link, useRouter } from "@adonisjs/inertia/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type SignUpSchema, signUpSchema } from "@/lib/validators/user";

export default function SignUpPage() {
  const formId = useId();
  const router = useRouter();
  const { control, handleSubmit, setError, formState } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    (data: SignUpSchema) => {
      router.visit(
        { route: "auth.signup.store" },
        {
          method: "post",
          data,
          preserveState: true,
          onError: (errors) => {
            Object.entries(errors).forEach(([field, message]) => {
              setError(field as keyof SignUpSchema, { message });
            });
          },
        }
      );
    },
    [router, setError]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Controller
        control={control}
        name="name"
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${formId}-${field.name}`}>Name</FieldLabel>
            <Input
              {...field}
              id={`${formId}-${field.name}`}
              aria-invalid={fieldState.invalid}
              type="text"
              placeholder="Enter your name"
              required
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <LoadingButton type="submit" className="w-full" loading={formState.isSubmitting}>
        Sign up
      </LoadingButton>
    </form>
  );
}
```
