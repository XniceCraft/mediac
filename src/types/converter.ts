interface ConvertedFile {
  blob: Blob;
  name: string;
}

export interface FileItem {
  id: string;
  file: File;
  name: string;
  sizeFormatted: string;
  format: InputFormat;
  status: "ready" | "converting" | "completed";
  progress: number;
  converted?: ConvertedFile;
}

export type InputFormat = "JPG" | "PNG" | "WEBP" | "AVIF" | "JXL" | "HEIC";
export type OutputFormat = "JPG" | "PNG" | "WEBP" | "PDF";
export type QualityPreset = "low" | "medium" | "high" | "lossless";
