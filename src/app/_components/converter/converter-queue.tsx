"use client";

import { useEffect, useRef } from "react";
import {
  ArrowsClockwiseIcon,
  DownloadSimpleIcon,
  TrashIcon,
  CheckCircleIcon,
  ArchiveIcon,
} from "@phosphor-icons/react/ssr";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useConverterContext } from "./converter-context";
import { cn } from "@/lib/utils";

import type { FileItem } from "@/types/converter";

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
  const { removeFile, convert, download } = useConverterContext();

  return (
    <div className="border-border bg-background flex flex-col gap-2.5 rounded-lg border p-4 transition-all">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <PreviewImage file={item.file} className="size-9 shrink-0 rounded-md object-contain" />

          <div className="min-w-0 space-y-0.5">
            <p className="text-foreground truncate text-sm font-semibold">{item.name}</p>
            <p className="text-muted-foreground flex flex-wrap items-center gap-2 text-xs">
              {item.sizeFormatted}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {item.status === "completed" && (
            <Badge className="gap-1">
              <CheckCircleIcon className="size-3.5" />
              Ready
            </Badge>
          )}
          {item.status === "converting" && (
            <Badge className="gap-1">
              <ArrowsClockwiseIcon className="size-3.5 animate-spin" />
              {item.progress}%
            </Badge>
          )}
          {item.status === "ready" && (
            <Badge variant="outline" className="text-muted-foreground">
              Queued
            </Badge>
          )}

          {item.status === "completed" ? (
            <Button variant="default" size="xs" onClick={() => download(item)} className="gap-1">
              <DownloadSimpleIcon className="size-3.5" />
              Download
            </Button>
          ) : item.status === "ready" ? (
            <Button variant="secondary" size="xs" onClick={() => convert(item.id)}>
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
    </div>
  );
}

export function ConverterQueue() {
  const { files, globalConvert, clearFiles, bulkConvert, bulkDownload } = useConverterContext();

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
              onClick={bulkDownload}
              className="text-accent border-primary/30 hover:bg-primary/10 gap-1.5 text-xs"
            >
              <ArchiveIcon className="size-4" />
              Download All as ZIP
            </Button>
          )}

          {files.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFiles}
              className="text-muted-foreground hover:text-destructive text-xs"
            >
              Clear
            </Button>
          )}

          <Button
            variant="default"
            size="sm"
            disabled={readyCount === 0 || globalConvert}
            onClick={bulkConvert}
            className="flex items-center gap-1.5"
          >
            <ArrowsClockwiseIcon className={cn("size-4", globalConvert && "animate-spin")} />
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
