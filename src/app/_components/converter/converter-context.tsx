"use client";

import { createContext, use, useCallback, useMemo, useRef, useState } from "react";
import { createZipBlob } from "@/lib/services/zip";
import { convertFile } from "@/lib/services/converter";
import { detectInputFormat } from "@/lib/services/format";
import { formatBytes } from "@/lib/utils/number";
import type { ConverterSchema } from "@/lib/validations/converter";

import type { FileItem } from "@/types/converter";

const DEFAULT_OPTIONS: ConverterSchema = {
  outputFormat: "JPG",
  qualityPreset: "medium",
  resize: { enabled: false, width: 1920, height: 0, fitMethod: "contain" },
};

interface ConverterContextValue {
  files: FileItem[];
  globalConvert: boolean;
  setOptions: (options: ConverterSchema) => void;
  addFiles: (files: File[]) => void;
  removeFile: (id: string) => void;
  clearFiles: () => void;
  convert: (id: string) => void;
  bulkConvert: () => void;
  download: (item: FileItem) => void;
  bulkDownload: () => void;
}

const ConverterContext = createContext<ConverterContextValue | null>(null);

export function ConverterProvider({ children }: { children: React.ReactNode }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [globalConvert, setGlobalConvert] = useState<boolean>(false);
  const optionsRef = useRef<ConverterSchema>(DEFAULT_OPTIONS);
  const setOptions = useCallback((o: ConverterSchema) => {
    optionsRef.current = o;
  }, []);

  const addFiles = useCallback((files: File[]) => {
    const newItems: FileItem[] = [];

    for (const file of files) {
      const detectedFormat = detectInputFormat(file);

      if (!detectedFormat) {
        throw new Error(`Unsupported format. Accepted: JPG, PNG, WebP, AVIF, JXL, HEIC`);
      }

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        format: detectedFormat,
        sizeFormatted: formatBytes(file.size),
        status: "ready",
        progress: 0,
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }, []);

  const clearFiles = useCallback(() => setFiles([]), []);

  const convert = useCallback(
    async function convert(id: string) {
      const item = files.find((f) => f.id === id);
      if (!item || item.status === "converting") return;

      setFiles((prev) =>
        prev.map((file) =>
          file.id === id ? { ...file, status: "converting", progress: 10 } : file
        )
      );

      try {
        const result = await convertFile(item.file, item.format, {
          outputFormat: optionsRef.current.outputFormat,
          qualityPreset: optionsRef.current.qualityPreset,
          resizeOption: optionsRef.current.resize,
          onProgress: (progress) => {
            setFiles((prev) => prev.map((file) => (file.id === id ? { ...file, progress } : file)));
          },
        });

        setFiles((prev) =>
          prev.map((file) =>
            file.id === id
              ? {
                  ...file,
                  status: "completed",
                  progress: 100,
                  converted: { blob: result.blob, name: result.fileName },
                }
              : file
          )
        );
      } catch {}
    },
    [files]
  );

  const bulkConvert = useCallback(
    async function bulkConvert() {
      const readyItems = files.filter((file) => file.status === "ready");
      if (readyItems.length === 0) return;

      for (const item of readyItems) {
        await convert(item.id);
      }
    },
    [files, convert]
  );

  const download = useCallback(function download(item: FileItem) {
    if (!item.converted) return;

    const url = URL.createObjectURL(item.converted.blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = item.converted.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  }, []);

  const bulkDownload = useCallback(
    async function bulkDownload() {
      const completedItems = files.filter((file) => file.status === "completed" && file.converted);
      if (completedItems.length === 0) return;

      setGlobalConvert(true);
      const zipFiles = completedItems.map((item) => ({
        name: item.converted!.name || `converted_${item.name}`,
        blob: item.converted!.blob as Blob,
      }));

      const zipBlob = await createZipBlob(zipFiles);
      setGlobalConvert(false);
      const url = URL.createObjectURL(zipBlob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `mediac_converted_batch.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    },
    [files]
  );

  const value = useMemo(
    () => ({
      files,
      globalConvert,
      setOptions,
      addFiles,
      removeFile,
      clearFiles,
      convert,
      bulkConvert,
      download,
      bulkDownload,
    }),
    [
      addFiles,
      removeFile,
      clearFiles,
      files,
      globalConvert,
      setOptions,
      convert,
      bulkConvert,
      download,
      bulkDownload,
    ]
  );

  return <ConverterContext value={value}>{children}</ConverterContext>;
}

export function useConverterContext() {
  const context = use(ConverterContext);
  if (!context) throw new Error("useConverterContext must be used in ConverterProvider");

  return context;
}
