"use client";

import { useState } from "react";
import { FadersHorizontalIcon, FadersIcon, GearIcon } from "@phosphor-icons/react/ssr";
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

export function SettingsModal() {
  const [open, setOpen] = useState(false);

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
            Fine-tune image compression quality presets and document rasterization scale.
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
            <Select defaultValue="medium">
              <SelectTrigger>
                <SelectValue placeholder="Select quality preset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Quality (60% Compression)</SelectItem>
                <SelectItem value="medium">Medium Quality (80% Optimal)</SelectItem>
                <SelectItem value="high">High Quality (90% Crisp)</SelectItem>
                <SelectItem value="lossless">Lossless Quality (100%)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <label className="text-foreground flex items-center justify-between text-xs font-semibold">
              PDF Render Scale / DPI
              <span className="text-muted-foreground text-[11px] font-normal">
                PDF to Image Raster
              </span>
            </label>
            <Select defaultValue="1.5">
              <SelectTrigger>
                <SelectValue placeholder="Select DPI scale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1.0">Standard 1.0x (150 DPI)</SelectItem>
                <SelectItem value="1.5">Balanced 1.5x (225 DPI)</SelectItem>
                <SelectItem value="2.0">Ultra High 2.0x (300 DPI)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant="default" onClick={() => setOpen(false)}>
            Save Preferences
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
