"use client";

import { useCallback, useRef, useState } from "react";
import { UploadSimpleIcon, FolderOpenIcon } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { useConverterContext } from "./converter-context";
import { inputImageSchema } from "@/lib/validations/image";
import { cn } from "@/lib/utils";

export function ConverterDropzone() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const { addFiles } = useConverterContext();

  const handleDragOver = useCallback(function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
      if (!e.target.files || e.target.files.length === 0) return;

      try {
        const files = inputImageSchema.parse(Array.from(e.target.files));
        e.target.value = "";
        addFiles(files);
      } catch (err) {
        console.log(err);
      }
    },
    [addFiles]
  );

  const handleDrop = useCallback(
    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
      e.preventDefault();
      setIsDragOver(false);
      if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) return;

      try {
        const files = inputImageSchema.parse(Array.from(e.dataTransfer.files));
        addFiles(files);
      } catch {}
    },
    [addFiles]
  );

  return (
    <div>
      <input
        id="file-upload-input"
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        className="hidden"
        accept=".jpg,.jpeg,.png,.webp,.avif,.jxl,.heic,.heif"
        aria-label="Upload media files for conversion"
      />

      <div
        role="region"
        aria-label="File dropzone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "group border-border bg-card relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center shadow-sm transition-all duration-200 md:p-10",
          isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "hover:bg-muted/40"
        )}
      >
        <div className="bg-primary/10 text-primary mb-3 flex size-12 items-center justify-center rounded-full transition-transform group-hover:scale-105">
          <UploadSimpleIcon className="size-6" />
        </div>
        <h3 className="text-foreground mb-3 text-base font-semibold">
          Drop your images here or click to upload
        </h3>
        <p className="text-muted-foreground mb-6 max-w-sm text-xs">
          Accepted: <strong className="text-foreground">JPG, PNG, WebP, AVIF, JXL, HEIC</strong>.
        </p>
        <Button variant="default" size="sm" className="bg-primary cursor-pointer gap-1.5">
          <FolderOpenIcon className="size-4" />
          Select Images
        </Button>
      </div>
    </div>
  );
}
