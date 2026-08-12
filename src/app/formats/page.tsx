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
  title: "Supported Formats & Conversion Matrix",
  description:
    "Explore all supported image and document file formats available for instant client-side browser conversion including JPG, PNG, WebP, AVIF, JXL, HEIC, and PDF.",
  keywords: [
    "supported formats",
    "conversion matrix",
    "HEIC to JPG",
    "AVIF to PNG",
    "WebP converter",
    "JXL to WebP",
    "image file formats",
  ],
  alternates: {
    canonical: "/formats",
  },
  openGraph: {
    title: "Supported File Formats",
    description:
      "Explore all supported image and document file formats available for instant client-side browser conversion.",
    url: "https://mediac.xnicecraft.my.id/formats",
    siteName: "MediaC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supported File Formats",
    description:
      "Explore all supported image and document file formats available for instant client-side browser conversion.",
  },
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
    ext: "AVIF",
    name: "AV1 Image File Format",
    category: "image",
    description: "Next-gen format offering superior compression, transparency, and HDR.",
    targets: ["JPG", "PNG", "WEBP", "PDF"],
  },
  {
    ext: "JXL",
    name: "JXL Image Format",
    category: "image",
    description: "Superior compression, transparency, and HDR support.",
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
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-16 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <section aria-labelledby="formats-catalog-heading" className="space-y-10">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <h1
              id="formats-catalog-heading"
              className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Supported File Formats & Conversion Matrix
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Explore all supported image and document file formats available for instant
              client-side browser conversion.
            </p>
          </div>

          <FormatCatalogProvider items={formatCatalog}>
            <FormatCatalogToolbar>
              <FormatCatalogTabs />
              <FormatCatalogSearch />
            </FormatCatalogToolbar>
            <FormatCatalogGrid />
          </FormatCatalogProvider>
        </section>

        <section
          aria-labelledby="format-guide-heading"
          className="border-border space-y-6 border-t pt-12"
        >
          <div className="space-y-2 text-center">
            <h2
              id="format-guide-heading"
              className="text-foreground text-2xl font-bold tracking-tight"
            >
              Understanding Image Format Compatibility
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm">
              Choosing the right file format helps optimize storage, loading speeds, and visual
              quality.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article className="bg-card border-border space-y-3 rounded-xl border p-6 shadow-sm">
              <h3 className="text-foreground text-base font-semibold">
                WebP & AVIF — Modern Web Formats
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                WebP and AVIF provide unmatched compression efficiency, significantly shrinking
                image file sizes while keeping visual quality high. Ideal for websites and web
                applications.
              </p>
            </article>

            <article className="bg-card border-border space-y-3 rounded-xl border p-6 shadow-sm">
              <h3 className="text-foreground text-base font-semibold">
                HEIC & JXL — Mobile & Next-Gen Photos
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                HEIC is widely used by iOS devices to save high-quality photos in smaller files.
                Convert HEIC to JPG or WebP instantly to ensure universal browser and device
                compatibility.
              </p>
            </article>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
