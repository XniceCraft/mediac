"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { useConverterContext } from "./converter-context";
import type { InputFormat, OutputFormat } from "@/lib/services";

const INPUT_FORMAT_OPTIONS: Array<{
  value: InputFormat;
  label: string;
  desc: string;
  category: "image" | "document";
}> = [
  { value: "JPG", label: "JPG / JPEG", desc: "Digital Photo Image", category: "image" },
  { value: "PNG", label: "PNG", desc: "Portable Network Graphics", category: "image" },
  { value: "WEBP", label: "WebP", desc: "Modern Web Image", category: "image" },
  { value: "SVG", label: "SVG", desc: "Scalable Vector Graphics", category: "image" },
  { value: "GIF", label: "GIF", desc: "Animated / Static GIF", category: "image" },
  { value: "HEIC", label: "HEIC", desc: "High Efficiency Image Container", category: "image" },
  { value: "PDF", label: "PDF", desc: "Portable Document Format", category: "document" },
];

const IMAGE_OUTPUT_OPTIONS: Array<{ value: OutputFormat; label: string }> = [
  { value: "JPG", label: "JPG — JPEG Image" },
  { value: "PNG", label: "PNG — Lossless Image" },
  { value: "WEBP", label: "WebP — Next-Gen Web Image" },
  { value: "PDF", label: "PDF — Document Format" },
];

const PDF_OUTPUT_OPTIONS: Array<{ value: OutputFormat; label: string }> = [
  { value: "JPG", label: "JPG — JPEG Image Pages" },
  { value: "PNG", label: "PNG — Lossless Image Pages" },
  { value: "WEBP", label: "WebP — Next-Gen Image Pages" },
];

export function ConverterOptions({ children }: { children?: React.ReactNode }) {
  const {
    inputFormat,
    outputFormat,
    qualityPreset,
    files,
    handleInputFormatChange,
    handleOutputFormatChange,
    handleQualityChange,
  } = useConverterContext();

  const validOutputOptions = inputFormat === "PDF" ? PDF_OUTPUT_OPTIONS : IMAGE_OUTPUT_OPTIONS;
  const isQualityActive = outputFormat === "JPG" || outputFormat === "WEBP";

  return (
    <Card className="border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-base font-semibold">
            1. Input & Output Setup
          </CardTitle>
          {children}
        </div>
        <CardDescription>Configure input format and target output extension.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Step 1: Input Format Selection */}
        <div className="space-y-1.5">
          <label className="text-foreground flex items-center justify-between text-xs font-semibold">
            Step 1: Select Input Format
            <Badge variant="outline" className="text-[10px]">
              Specific
            </Badge>
          </label>
          <Select value={inputFormat} onValueChange={handleInputFormatChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select single input format" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Image Formats</SelectLabel>
                {INPUT_FORMAT_OPTIONS.filter((o) => o.category === "image").map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label} — {opt.desc}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Document Formats</SelectLabel>
                {INPUT_FORMAT_OPTIONS.filter((o) => o.category === "document").map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label} — {opt.desc}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Step 2: Output Format Selection */}
        <div className="space-y-1.5">
          <label className="text-foreground flex items-center justify-between text-xs font-semibold">
            Step 2: Target Output Format
            <span className="text-muted-foreground text-[10px] font-normal">Matrix Filtered</span>
          </label>
          <Select value={outputFormat} onValueChange={handleOutputFormatChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              {validOutputOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Step 4: Quality Preset */}
        <div className="space-y-1.5">
          <label className="text-foreground flex items-center justify-between text-xs font-semibold">
            Step 4: Quality Preset
            {!isQualityActive && (
              <span className="text-muted-foreground text-[10px] font-normal">
                N/A for {outputFormat}
              </span>
            )}
          </label>
          <Select
            value={qualityPreset}
            onValueChange={handleQualityChange}
            disabled={!isQualityActive}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select quality preset" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low (60% Compression)</SelectItem>
              <SelectItem value="medium">Medium (80% Optimal)</SelectItem>
              <SelectItem value="high">High (90% Quality)</SelectItem>
              <SelectItem value="lossless">Lossless (100%)</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-muted-foreground text-[11px]">
            {isQualityActive
              ? "Applies to JPG and WebP outputs."
              : "Quality presets only apply when converting to JPG or WebP."}
          </p>
        </div>

        <div className="border-border text-muted-foreground flex items-center justify-between border-t pt-3 text-xs">
          <span>
            Batch Queue:{" "}
            <strong className="text-foreground font-semibold">{files.length} / 20</strong>
          </span>
          <Badge variant="success" className="text-[11px]">
            Max 20MB / file
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
