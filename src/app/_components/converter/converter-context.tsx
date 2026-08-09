"use client";

import { createContext, use, useState, useRef } from "react";
import type { ReactNode, ChangeEvent, DragEvent } from "react";
import { convertFile, createZipBlob } from "@/lib/services";
import type { InputFormat, OutputFormat, QualityPreset } from "@/lib/services";

const MAX_FILE_SIZE_BYTES = 20 * 1024 * 1024;
const MAX_BATCH_FILE_COUNT = 20;

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
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  qualityPreset: QualityPreset;
  files: FileItem[];
  isDragOver: boolean;
  isConvertingAll: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  setInputFormat: (format: InputFormat) => void;
  setOutputFormat: (format: OutputFormat) => void;
  setQualityPreset: (preset: QualityPreset) => void;
  handleInputFormatChange: (val: string | null) => void;
  handleOutputFormatChange: (val: string | null) => void;
  handleQualityChange: (val: string | null) => void;
  validateAndAddFiles: (incomingFiles: FileList | File[]) => void;
  handleFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
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

export function ConverterProvider({ children }: { children: ReactNode }) {
  const [inputFormat, setInputFormat] = useState<InputFormat>("PNG");
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("JPG");
  const [qualityPreset, setQualityPreset] = useState<QualityPreset>("medium");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [isConvertingAll, setIsConvertingAll] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleInputFormatChange(val: string | null) {
    if (!val) return;
    const newInput = val as InputFormat;
    setInputFormat(newInput);

    if (newInput === "PDF") {
      if ((outputFormat as string) === "PDF") {
        setOutputFormat("JPG");
      }
    } else {
      if ((outputFormat as string) === (newInput as string)) {
        setOutputFormat("JPG");
      }
    }
  }

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
    const validCountInBatch = files.filter((f) => f.status !== "rejected").length;
    let addedValidCount = 0;

    for (const file of fileArray) {
      const ext = file.name.split(".").pop()?.toUpperCase() || "";
      const isFormatMatch =
        ext === inputFormat ||
        (inputFormat === "JPG" && ext === "JPEG") ||
        (inputFormat === "HEIC" && (ext === "HEIF" || ext === "HEIC"));

      let status: "ready" | "rejected" = "ready";
      let errorMessage: string | undefined = undefined;

      if (!isFormatMatch) {
        status = "rejected";
        errorMessage = `Non-matching input format: expected .${inputFormat.toLowerCase()}`;
      } else if (file.size > MAX_FILE_SIZE_BYTES) {
        status = "rejected";
        errorMessage = "File size exceeds 20MB limit";
      } else if (validCountInBatch + addedValidCount >= MAX_BATCH_FILE_COUNT) {
        status = "rejected";
        errorMessage = `Max 20 files per batch limit reached`;
      } else {
        addedValidCount++;
      }

      newItems.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        file,
        name: file.name,
        sizeFormatted: formatSize(file.size),
        inputFormat,
        outputFormat,
        status,
        progress: 0,
        errorMessage,
      });
    }

    setFiles((prev) => [...prev, ...newItems]);
  }

  function handleFileSelect(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
      e.target.value = "";
    }
  }

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
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
      const result = await convertFile(item.file, {
        inputFormat: item.inputFormat,
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
    inputFormat,
    outputFormat,
    qualityPreset,
    files,
    isDragOver,
    isConvertingAll,
    fileInputRef,
    setInputFormat,
    setOutputFormat,
    setQualityPreset,
    handleInputFormatChange,
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
