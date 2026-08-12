import { createZipBlob } from "@/lib/services/zip";

export type InputFormat = "JPG" | "PNG" | "WEBP" | "AVIF" | "JXL" | "HEIC";
export type OutputFormat = "JPG" | "PNG" | "WEBP" | "PDF";
export type QualityPreset = "low" | "medium" | "high" | "lossless";

export interface ConversionOptions {
  outputFormat: OutputFormat;
  qualityPreset: QualityPreset;
  onProgress?: (progress: number) => void;
}

export interface ConversionResult {
  blob: Blob;
  fileName: string;
  isZip?: boolean;
}

const QUALITY_VALUES: Record<QualityPreset, number> = {
  low: 60,
  medium: 80,
  high: 90,
  lossless: 100,
};

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

async function decodeToImageData(file: File, inputFormat: InputFormat): Promise<ImageData> {
  const arrayBuffer = await file.arrayBuffer();

  if (inputFormat === "HEIC") {
    const { heicTo } = await import("heic-to");
    const pngBlob = await heicTo({ blob: file, type: "image/png" });
    return blobToImageData(pngBlob as Blob);
  }

  if (inputFormat === "AVIF") {
    const { decode } = await import("@jsquash/avif");
    return (await decode(arrayBuffer)) as ImageData;
  }

  if (inputFormat === "JXL") {
    const { decode } = await import("@jsquash/jxl");
    return (await decode(arrayBuffer)) as ImageData;
  }

  if (inputFormat === "JPG") {
    const { decode } = await import("@jsquash/jpeg");
    return (await decode(arrayBuffer)) as ImageData;
  }

  if (inputFormat === "PNG") {
    const { decode } = await import("@jsquash/png");
    return (await decode(arrayBuffer)) as ImageData;
  }

  const { decode } = await import("@jsquash/webp");
  return (await decode(arrayBuffer)) as ImageData;
}

async function blobToImageData(blob: Blob): Promise<ImageData> {
  const url = URL.createObjectURL(blob);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("Could not initialize 2D rendering context"));
        return;
      }
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      resolve(ctx.getImageData(0, 0, canvas.width, canvas.height) as ImageData);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to decode image"));
    };
    img.src = url;
  });
}

async function encodeToBlob(
  imageData: ImageData,
  format: OutputFormat,
  quality: number
): Promise<Blob> {
  if (format === "PDF") {
    const [{ PDFDocument }, { encode }] = await Promise.all([
      import("pdf-lib"),
      import("@jsquash/png"),
    ]);
    const pngBytes = await encode(imageData);
    const pdf = await PDFDocument.create();
    const img = await pdf.embedPng(pngBytes);
    const page = pdf.addPage([img.width, img.height]);
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
    const pdfBytes = await pdf.save();
    const buf = new ArrayBuffer(pdfBytes.length);
    new Uint8Array(buf).set(pdfBytes);
    return new Blob([buf], { type: "application/pdf" });
  }

  if (format === "JPG") {
    const { encode } = await import("@jsquash/jpeg");
    const jpgBytes = await encode(imageData, { quality });
    return new Blob([jpgBytes], { type: "image/jpeg" });
  }

  if (format === "PNG") {
    const { encode } = await import("@jsquash/png");
    const pngBytes = await encode(imageData);
    return new Blob([pngBytes], { type: "image/png" });
  }

  const { encode } = await import("@jsquash/webp");
  const webpBytes = await encode(imageData, { quality });
  return new Blob([webpBytes], { type: "image/webp" });
}

export async function convertFile(
  file: File,
  inputFormat: InputFormat,
  options: ConversionOptions
): Promise<ConversionResult> {
  const { outputFormat, qualityPreset, onProgress } = options;
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const quality = QUALITY_VALUES[qualityPreset] ?? 80;

  if (onProgress) onProgress(20);

  const imageData = await decodeToImageData(file, inputFormat);
  if (onProgress) onProgress(60);

  const blob = await encodeToBlob(imageData, outputFormat, quality);
  if (onProgress) onProgress(100);

  const ext = outputFormat === "JPG" ? "jpg" : outputFormat.toLowerCase();
  const fileName = `${baseName}_converted.${ext}`;

  return { blob, fileName };
}

export async function convertFilesToZip(
  items: Array<{
    file: File;
    inputFormat: InputFormat;
    convertedBlob: Blob;
    convertedFileName: string;
  }>
): Promise<Blob> {
  const zipFiles = items.map((item) => ({
    name: item.convertedFileName,
    blob: item.convertedBlob,
  }));
  return createZipBlob(zipFiles);
}
