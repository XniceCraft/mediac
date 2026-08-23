import { z } from "zod/mini";

export const inputImageSchema = z.array(
  z
    .file()
    .check(
      z.mime(["image/jpeg", "image/png", "image/webp", "image/avif", "image/jxl", "image/heif"])
    )
);
