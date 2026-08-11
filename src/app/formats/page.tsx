import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import {
  FormatCatalogProvider,
  FormatCatalogToolbar,
  FormatCatalogTabs,
  FormatCatalogSearch,
  FormatCatalogGrid,
  type FormatItem,
} from "./_components/format-catalog";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Supported Formats",
  description: "Explore all supported image and document file formats available for conversion.",
};

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
];

export default function FormatsPage() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Supported File Formats & Conversion Matrix
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Explore all supported image and document file formats available for instant client-side
            browser conversion.
          </p>
        </div>

        <FormatCatalogProvider items={formatCatalog}>
          <FormatCatalogToolbar>
            <FormatCatalogTabs />
            <FormatCatalogSearch />
          </FormatCatalogToolbar>
          <FormatCatalogGrid />
        </FormatCatalogProvider>
      </main>

      <Footer />
    </div>
  );
}
