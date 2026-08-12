"use client";

import { createContext, use, useState, useRef } from "react";
import { convertFile, createZipBlob, detectInputFormat } from "@/lib/services";

import type { InputFormat, OutputFormat, QualityPreset } from "@/lib/services";

export interface FileItem {
  id: string;
  file: File;
  name: string;
  sizeFormatted: string;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  status: "ready" | "converting" | "completed" | "rejected";
  progress: number;
  errorMessage?: string;
  convertedBlob?: Blob;
  convertedFileName?: string;
}

interface ConverterContextValue {
  outputFormat: OutputFormat;
  qualityPreset: QualityPreset;
  files: FileItem[];
  isDragOver: boolean;
  isConvertingAll: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  setOutputFormat: (format: OutputFormat) => void;
  setQualityPreset: (preset: QualityPreset) => void;
  handleOutputFormatChange: (val: string | null) => void;
  handleQualityChange: (val: string | null) => void;
  validateAndAddFiles: (incomingFiles: FileList | File[]) => void;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  removeFile: (id: string) => void;
  clearQueue: () => void;
  convertSingleFile: (id: string) => Promise<void>;
  convertAllFiles: () => Promise<void>;
  downloadSingleFile: (item: FileItem) => void;
  downloadAllAsZip: () => Promise<void>;
}

const ConverterContext = createContext<ConverterContextValue | null>(null);

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ConverterProvider({ children }: { children: React.ReactNode }) {
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [qualityPreset, setQualityPreset] = useState<QualityPreset>("medium");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isConvertingAll, setIsConvertingAll] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleOutputFormatChange(val: string | null) {
    if (!val) return;
    setOutputFormat(val as OutputFormat);
  }

  function handleQualityChange(val: string | null) {
    if (!val) return;
    setQualityPreset(val as QualityPreset);
  }

  function validateAndAddFiles(incomingFiles: FileList | File[]) {
    const fileArray = Array.from(incomingFiles);
    const newItems: FileItem[] = [];

    for (const file of fileArray) {
      const detectedFormat = detectInputFormat(file);

      let status: "ready" | "rejected" = "ready";
      let errorMessage: string | undefined = undefined;

      if (!detectedFormat) {
        status = "rejected";
        errorMessage = `Unsupported format. Accepted: JPG, PNG, WebP, AVIF, JXL, HEIC`;
      }

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        sizeFormatted: formatSize(file.size),
        inputFormat: detectedFormat ?? "JPG",
        outputFormat,
        status,
        progress: 0,
        errorMessage,
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
      e.target.value = "";
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  }

  function removeFile(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  function clearQueue() {
    setFiles([]);
  }

  async function convertSingleFile(id: string) {
    const item = files.find((f) => f.id === id);
    if (!item || item.status === "rejected" || item.status === "converting") return;

    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "converting", progress: 10 } : f))
    );

    try {
      const result = await convertFile(item.file, item.inputFormat, {
        outputFormat: item.outputFormat,
        qualityPreset,
        onProgress: (p) => {
          setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, progress: p } : f)));
        },
      });

      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: "completed",
                progress: 100,
                convertedBlob: result.blob,
                convertedFileName: result.fileName,
              }
            : f
        )
      );
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Conversion failed";
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id
            ? {
                ...f,
                status: "rejected",
                progress: 0,
                errorMessage: errorMsg,
              }
            : f
        )
      );
    }
  }

  async function convertAllFiles() {
    const readyItems = files.filter((f) => f.status === "ready");
    if (readyItems.length === 0) return;

    setIsConvertingAll(true);
    for (const item of readyItems) {
      await convertSingleFile(item.id);
    }
    setIsConvertingAll(false);
  }

  function downloadSingleFile(item: FileItem) {
    if (!item.convertedBlob || !item.convertedFileName) return;
    const url = URL.createObjectURL(item.convertedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.convertedFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function downloadAllAsZip() {
    const completedItems = files.filter((f) => f.status === "completed" && f.convertedBlob);
    if (completedItems.length === 0) return;

    const zipFiles = completedItems.map((item) => ({
      name: item.convertedFileName || `converted_${item.name}`,
      blob: item.convertedBlob as Blob,
    }));

    const zipBlob = await createZipBlob(zipFiles);
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mediac_converted_batch.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const value: ConverterContextValue = {
    outputFormat,
    qualityPreset,
    files,
    isDragOver,
    isConvertingAll,
    fileInputRef,
    setOutputFormat,
    setQualityPreset,
    handleOutputFormatChange,
    handleQualityChange,
    validateAndAddFiles,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeFile,
    clearQueue,
    convertSingleFile,
    convertAllFiles,
    downloadSingleFile,
    downloadAllAsZip,
  };

  return <ConverterContext value={value}>{children}</ConverterContext>;
}

export function useConverterContext() {
  const context = use(ConverterContext);
  if (!context) {
    throw new Error("useConverterContext must be used within a <ConverterProvider>");
  }
  return context;
}
