"use client";

import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import { converterSchema, type ConverterSchema } from "@/lib/validations/converter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConverterContext } from "./converter-context";

import type { OutputFormat } from "@/types/converter";

const OUTPUT_FORMAT_OPTIONS: Array<{ value: OutputFormat; label: string }> = [
  { value: "JPG", label: "JPG" },
  { value: "PNG", label: "PNG" },
  { value: "WEBP", label: "WebP" },
  { value: "PDF", label: "PDF" },
];

export function ConverterOptions() {
  const { setOptions } = useConverterContext();

  const { control, subscribe } = useForm<ConverterSchema>({
    resolver: zodResolver(converterSchema),
    defaultValues: {
      outputFormat: "JPG",
      qualityPreset: "medium",
      resize: { enabled: false, width: 1920, height: 0, fitMethod: "contain" },
    },
  });

  useEffect(() => {
    const callback = subscribe({
      formState: {
        values: true,
      },
      callback: ({ values }) => {
        setOptions(values as ConverterSchema);
      },
    });

    return () => callback();
  }, [subscribe, setOptions]);

  return (
    <Card className="border-border shadow-md">
      <CardContent className="space-y-3">
        <Controller
          name="outputFormat"
          control={control}
          render={({ field: outputField, fieldState: outputFieldState }) => (
            <>
              <Field data-invalid={outputFieldState.invalid}>
                <div>
                  <FieldLabel
                    htmlFor="output-select"
                    className="text-foreground text-sm font-semibold"
                  >
                    Output
                  </FieldLabel>
                  <FieldDescription className="text-muted-foreground text-xs">
                    Applies to every file in the queue.
                  </FieldDescription>
                </div>
                <Select
                  id="output-select"
                  value={outputField.value}
                  onValueChange={outputField.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {OUTPUT_FORMAT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Controller
                name="qualityPreset"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div>
                      <FieldLabel
                        htmlFor="quality-select"
                        className="text-foreground text-sm font-semibold"
                      >
                        Quality
                      </FieldLabel>
                      <FieldDescription className="text-muted-foreground text-xs">
                        Applies to JPG and WebP outputs
                      </FieldDescription>
                    </div>
                    <Select
                      id="quality-select"
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={outputField.value !== "JPG" && outputField.value !== "WEBP"}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select quality preset">
                          {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (60%)</SelectItem>
                        <SelectItem value="medium">Medium (80%)</SelectItem>
                        <SelectItem value="high">High (90%)</SelectItem>
                        <SelectItem value="lossless">Lossless (100%)</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </>
          )}
        />

        <div className="space-y-3">
          <Controller
            name="resize.enabled"
            control={control}
            render={({ field: resizeField, fieldState: resizeFieldState }) => (
              <>
                <Field orientation="horizontal" data-invalid={resizeFieldState.invalid}>
                  <FieldLabel htmlFor="resize" className="text-foreground text-sm font-semibold">
                    Resize
                  </FieldLabel>
                  <Switch
                    id="resize"
                    name={resizeField.name}
                    checked={resizeField.value}
                    onCheckedChange={resizeField.onChange}
                    aria-invalid={resizeFieldState.invalid}
                  />
                </Field>
                <Controller
                  name="resize.fitMethod"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor="fit-method-select"
                        className="text-foreground text-xs font-semibold"
                      >
                        Fit Method
                      </FieldLabel>
                      <Select
                        id="fit-method-select"
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={!resizeField.value}
                      >
                        <SelectTrigger className="w-full" aria-invalid={fieldState.invalid}>
                          <SelectValue placeholder="Select fit method">
                            {field.value.charAt(0).toUpperCase() + field.value.slice(1)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stretch">Stretch</SelectItem>
                          <SelectItem value="contain">Contain</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  )}
                />

                <div className="grid grid-cols-2 gap-2">
                  <Controller
                    name="resize.width"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="gap-1.5">
                        <FieldLabel htmlFor="resize-width" className="text-xs">
                          Width
                        </FieldLabel>
                        <Input
                          id="resize-width"
                          type="number"
                          step={1}
                          min={1}
                          placeholder="Width"
                          required={resizeField.value}
                          disabled={!resizeField.value}
                          {...field}
                        />
                      </Field>
                    )}
                  />
                  <Controller
                    name="resize.height"
                    control={control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid} className="gap-1.5">
                        <FieldLabel htmlFor="resize-height" className="text-xs">
                          Height
                        </FieldLabel>
                        <Input
                          id="resize-height"
                          type="number"
                          step={1}
                          min={1}
                          placeholder="Height"
                          disabled={!resizeField.value}
                          {...field}
                        />
                      </Field>
                    )}
                  />
                </div>
                <FieldDescription className="text-muted-foreground text-xs">
                  Set height to 0 to keep original aspect ratio
                </FieldDescription>
              </>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
