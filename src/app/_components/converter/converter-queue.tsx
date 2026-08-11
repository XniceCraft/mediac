"use client";

import { useEffect, useRef } from "react";
import {
  ArrowsClockwiseIcon,
  DownloadSimpleIcon,
  TrashIcon,
  CheckCircleIcon,
  WarningCircleIcon,
  ArchiveIcon,
} from "@phosphor-icons/react/ssr";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useConverterContext } from "./converter-context";
import { cn } from "@/lib/utils";

import type { FileItem } from "./converter-context";

function PreviewImage({ file, className }: { file: File; className?: string }) {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const source = URL.createObjectURL(file);
    imageRef.current.src = source;

    return () => {
      URL.revokeObjectURL(source);
    };
  }, [file]);

  return <img ref={imageRef} alt="Preview" className={className} />;
}

export function ConverterItem({ item }: { item: FileItem }) {
  const { removeFile, convertSingleFile, downloadSingleFile } = useConverterContext();

  return (
    <div
      className={`border-border bg-background flex flex-col gap-2.5 rounded-lg border p-4 transition-all ${
        item.status === "rejected" ? "border-destructive/40 bg-destructive/5" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <PreviewImage
            file={item.file}
            className={cn(
              "size-9 shrink-0 rounded-md object-contain",
              item.status === "rejected" ? "border-destructive/15" : "border-primary/10"
            )}
          />

          <div className="min-w-0 space-y-0.5">
            <p className="text-foreground truncate text-sm font-semibold">{item.name}</p>
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
              <span>{item.sizeFormatted}</span>
              <span>•</span>
              <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-bold uppercase">
                {item.inputFormat} → {item.outputFormat}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {item.status === "completed" && (
            <Badge variant="success" className="gap-1">
              <CheckCircleIcon className="size-3.5" />
              Ready
            </Badge>
          )}
          {item.status === "converting" && (
            <Badge variant="warning" className="gap-1">
              <ArrowsClockwiseIcon className="size-3.5 animate-spin" />
              {item.progress}%
            </Badge>
          )}
          {item.status === "ready" && (
            <Badge variant="outline" className="text-muted-foreground">
              Queued
            </Badge>
          )}
          {item.status === "rejected" && (
            <Badge variant="destructive" className="gap-1">
              <WarningCircleIcon className="size-3.5" />
              Rejected
            </Badge>
          )}

          {item.status === "completed" ? (
            <Button
              variant="default"
              size="xs"
              onClick={() => downloadSingleFile(item)}
              className="gap-1"
            >
              <DownloadSimpleIcon className="size-3.5" />
              Download
            </Button>
          ) : item.status === "ready" ? (
            <Button variant="secondary" size="xs" onClick={() => convertSingleFile(item.id)}>
              Convert
            </Button>
          ) : null}

          <Button
            variant="ghost"
            size="icon-xs"
            onClick={() => removeFile(item.id)}
            className="text-muted-foreground hover:text-destructive cursor-pointer"
          >
            <TrashIcon className="size-4" />
          </Button>
        </div>
      </div>

      {item.status === "converting" && <Progress value={item.progress} />}

      {item.errorMessage && (
        <div className="text-destructive flex items-center gap-1.5 text-xs font-medium">
          <WarningCircleIcon className="size-3.5 shrink-0" />
          <span>{item.errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export function ConverterQueue() {
  const { files, isConvertingAll, clearQueue, convertAllFiles, downloadAllAsZip } =
    useConverterContext();

  const readyCount = files.filter((f) => f.status === "ready").length;
  const completedCount = files.filter((f) => f.status === "completed").length;

  return (
    <Card className="border-border shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-foreground text-base font-semibold">
            Conversion Queue ({files.length})
          </CardTitle>
          <CardDescription>Review items, execute conversion, and download results.</CardDescription>
        </div>

        <div className="flex items-center gap-2">
          {completedCount > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={downloadAllAsZip}
              className="text-accent border-accent/30 hover:bg-accent/10 gap-1.5 text-xs"
            >
              <ArchiveIcon className="size-4" />
              Download All as ZIP
            </Button>
          )}

          {files.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearQueue}
              className="text-muted-foreground hover:text-destructive text-xs"
            >
              Clear
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            disabled={readyCount === 0 || isConvertingAll}
            onClick={convertAllFiles}
            className="flex items-center gap-1.5"
          >
            <ArrowsClockwiseIcon className={`size-4 ${isConvertingAll ? "animate-spin" : ""}`} />
            Convert ({readyCount})
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {files.length === 0 ? (
          <div className="text-muted-foreground py-10 text-center text-xs">
            No files in queue. Drop files above to begin.
          </div>
        ) : (
          files.map((item) => <ConverterItem key={item.id} item={item} />)
        )}
      </CardContent>
    </Card>
  );
}
