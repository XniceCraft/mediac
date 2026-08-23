import { z } from "zod/mini";

export const converterSchema = z.object({
  outputFormat: z.enum(["JPG", "PNG", "WEBP", "PDF"]),
  qualityPreset: z.enum(["low", "medium", "high", "lossless"]),
  resize: z.object({
    enabled: z.boolean(),
    width: z.number().check(z.gte(1)),
    height: z.number().check(z.gte(0)), // 0 = Keep aspect ratio
    fitMethod: z.enum(["stretch", "contain"]),
  }),
});

export type ConverterSchema = z.infer<typeof converterSchema>;
