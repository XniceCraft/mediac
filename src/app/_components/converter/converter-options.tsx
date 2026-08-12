"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useConverterContext } from "./converter-context";

import type { OutputFormat } from "@/lib/services";

const OUTPUT_FORMAT_OPTIONS: Array<{ value: OutputFormat; label: string }> = [
  { value: "JPG", label: "JPG — JPEG Image" },
  { value: "PNG", label: "PNG — Lossless Image" },
  { value: "WEBP", label: "WebP — Next-Gen Web Image" },
  { value: "PDF", label: "PDF — Document Format" },
];

export function ConverterOptions({ children }: { children?: React.ReactNode }) {
  const { outputFormat, qualityPreset, handleOutputFormatChange, handleQualityChange } =
    useConverterContext();

  const isQualityActive = outputFormat === "JPG" || outputFormat === "WEBP";

  return (
    <Card className="border-border shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-primary text-base font-semibold">
            Output Configuration
          </CardTitle>
          {children}
        </div>
        <CardDescription>Select your target output format and quality preset.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-foreground flex items-center justify-between text-xs font-semibold">
            Step 1: Target Output Format
          </label>
          <Select value={outputFormat} onValueChange={handleOutputFormatChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select output format" />
            </SelectTrigger>
            <SelectContent>
              {OUTPUT_FORMAT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="text-foreground flex items-center justify-between text-xs font-semibold">
            Step 2: Quality Preset
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
              <SelectValue placeholder="Select quality preset">
                {qualityPreset.charAt(0).toUpperCase() + qualityPreset.slice(1)}
              </SelectValue>
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
      </CardContent>
    </Card>
  );
}
