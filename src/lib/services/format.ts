import { InputFormat } from "@/types/converter";

export function detectInputFormat(file: File): InputFormat | null {
  const ext = file.name.split(".").pop()?.toUpperCase() ?? "";
  if (ext === "JPG" || ext === "JPEG") return "JPG";
  if (ext === "PNG") return "PNG";
  if (ext === "WEBP") return "WEBP";
  if (ext === "AVIF") return "AVIF";
  if (ext === "JXL") return "JXL";
  if (ext === "HEIC" || ext === "HEIF") return "HEIC";
  return null;
}
