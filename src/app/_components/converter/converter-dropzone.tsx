"use client";

import { UploadSimpleIcon, FolderOpenIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { useConverterContext } from "./converter-context";

export function ConverterDropzone() {
  const {
    isDragOver,
    fileInputRef,
    handleFileSelect,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  } = useConverterContext();

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp,.avif,.jxl,.heic,.heif"
      />

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group border-border bg-card relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center shadow-sm transition-all duration-200 md:p-10 ${
          isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "hover:bg-muted/40"
        }`}
      >
        <div className="bg-primary/10 text-primary mb-3 flex size-12 items-center justify-center rounded-full transition-transform group-hover:scale-105">
          <UploadSimpleIcon className="size-6" />
        </div>
        <h3 className="text-foreground mb-1 text-base font-semibold">
          Drop your images here or click to upload
        </h3>
        <p className="text-muted-foreground mb-4 max-w-sm text-xs">
          Accepted: <strong className="text-foreground">JPG, PNG, WebP, AVIF, JXL, HEIC</strong>.
          Max 20MB per file, up to 20 files per batch.
        </p>
        <Button variant="default" size="sm" className="cursor-pointer gap-1.5">
          <FolderOpenIcon className="size-4" />
          Select Images
        </Button>
      </div>
    </div>
  );
}
