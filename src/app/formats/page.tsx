"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ImageIcon,
  FilePdfIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  SparkleIcon,
} from "@phosphor-icons/react/ssr";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FormatItem {
  ext: string;
  name: string;
  category: "image" | "document";
  description: string;
  targets: string[];
}

const formatCatalog: FormatItem[] = [
  {
    ext: "JPG",
    name: "JPEG Image",
    category: "image",
    description: "Standard compressed image format ideal for digital photos and web graphics.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "PNG",
    name: "Portable Network Graphics",
    category: "image",
    description: "Lossless image format supporting full alpha transparency and crisp lines.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "WEBP",
    name: "WebP Next-Gen Image",
    category: "image",
    description: "Modern image format delivering superior lossless and lossy web compression.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "SVG",
    name: "Scalable Vector Graphics",
    category: "image",
    description: "XML-based vector graphic format for logos, icons, and scalable illustrations.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "GIF",
    name: "Graphics Interchange Format",
    category: "image",
    description: "Widespread image format supporting simple animations and compact graphics.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "HEIC",
    name: "High Efficiency Image Container",
    category: "image",
    description: "Modern high-efficiency photo container used on mobile devices.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "PDF",
    name: "Portable Document Format",
    category: "document",
    description: "Universal document format for publishing and multi-page document distribution.",
    targets: ["JPG", "PNG", "WEBP"],
  },
];

export default function FormatsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFormats = formatCatalog.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.ext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="bg-secondary/10 border-secondary/20 text-secondary inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
            <SparkleIcon className="size-3.5" />
            MediaC v1 Format Matrix
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Supported File Formats & Conversion Matrix
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Explore all supported image and document file formats available for instant client-side
            browser conversion.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-card border-border flex flex-col items-center justify-between gap-4 rounded-lg border p-4 shadow-sm sm:flex-row">
          <Tabs
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="all" className="text-xs">
                All (7)
              </TabsTrigger>
              <TabsTrigger value="image" className="text-xs">
                <ImageIcon className="mr-1 size-3.5" /> Image Formats
              </TabsTrigger>
              <TabsTrigger value="document" className="text-xs">
                <FilePdfIcon className="mr-1 size-3.5" /> Document Formats
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="relative w-full sm:w-72">
            <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search format (e.g. HEIC, PDF)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-background border-border focus:ring-ring w-full rounded-md border py-2 pr-4 pl-9 text-sm transition-colors focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Formats Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFormats.map((format) => (
            <Card
              key={format.ext}
              className="border-border shadow-sm transition-all hover:shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg text-sm font-bold">
                    .{format.ext.toLowerCase()}
                  </div>
                  <div>
                    <CardTitle className="text-foreground text-base font-bold">
                      {format.ext}
                    </CardTitle>
                    <p className="text-muted-foreground text-xs">{format.name}</p>
                  </div>
                </div>

                <Badge variant="outline" className="py-0.5 text-[10px] uppercase">
                  {format.category}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-xs">{format.description}</CardDescription>

                <div className="border-border space-y-2 border-t pt-3">
                  <span className="text-muted-foreground block text-[11px] font-semibold tracking-wider uppercase">
                    Convertible Matrix Targets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {format.targets.map((target) => (
                      <Badge key={target} variant="secondary" className="text-[11px]">
                        → {target}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-accent hover:text-accent w-full cursor-pointer gap-1 text-xs"
                    >
                      Convert {format.ext} files
                      <ArrowRightIcon className="size-3.5" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFormats.length === 0 && (
          <div className="bg-card border-border space-y-2 rounded-lg border py-12 text-center">
            <p className="text-foreground text-sm font-semibold">No format matches your query.</p>
            <p className="text-muted-foreground text-xs">
              Try searching for a supported format like PNG, JPG, WebP, SVG, GIF, HEIC, or PDF.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
