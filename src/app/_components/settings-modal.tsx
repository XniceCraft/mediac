"use client";

import { useState } from "react";
import { FadersHorizontalIcon, FadersIcon } from "@phosphor-icons/react/ssr";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useConverterContext } from "./converter/converter-context";

export function SettingsModal() {
  const [open, setOpen] = useState(false);
  const { qualityPreset, handleQualityChange } = useConverterContext();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary gap-1 text-xs"
          >
            <FadersHorizontalIcon className="size-4" />
            Preset
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="text-primary flex items-center gap-2">
            <FadersIcon className="text-accent size-5" />
            <DialogTitle>Advanced Preset Settings</DialogTitle>
          </div>
          <DialogDescription>
            Fine-tune image compression quality for JPG and WebP output.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-foreground flex items-center justify-between text-xs font-semibold">
              Quality Preset
              <span className="text-muted-foreground text-[11px] font-normal">
                Applies to JPG & WebP
              </span>
            </label>
            <Select value={qualityPreset} onValueChange={handleQualityChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Quality (60%)</SelectItem>
                <SelectItem value="medium">Medium Quality (80%)</SelectItem>
                <SelectItem value="high">High Quality (90%)</SelectItem>
                <SelectItem value="lossless">Lossless Quality (100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="default" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
