"use client";

import { createContext, use, useMemo, useState } from "react";
import { ImageIcon, MagnifyingGlassIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr";
import { Card, CardHeader, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export interface FormatItem {
  ext: string;
  name: string;
  category: "image" | "document";
  description: string;
  targets: string[];
}

interface FormatCatalogContextValue {
  items: FormatItem[];
  filteredItems: FormatItem[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FormatCatalogContext = createContext<FormatCatalogContextValue | null>(null);

function useFormatCatalog() {
  const context = use(FormatCatalogContext);
  if (!context) {
    throw new Error("FormatCatalog compound components must be rendered within FormatCatalog");
  }
  return context;
}

export function FormatCatalogProvider({
  items,
  children,
}: {
  items: FormatItem[];
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesSearch =
        item.ext.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  return (
    <FormatCatalogContext
      value={{
        items,
        filteredItems,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
      }}
    >
      <div className="space-y-6">{children}</div>
    </FormatCatalogContext>
  );
}

export function FormatCatalogToolbar({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card border-border flex flex-col items-center justify-between gap-4 rounded-lg border p-4 shadow-sm sm:flex-row">
      {children}
    </div>
  );
}

export function FormatCatalogTabs() {
  const { items, selectedCategory, setSelectedCategory } = useFormatCatalog();

  return (
    <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
      <TabsList aria-label="Filter formats by category">
        <TabsTrigger value="all" className="text-xs">
          All ({items.length})
        </TabsTrigger>
        <TabsTrigger value="image" className="text-xs">
          <ImageIcon className="mr-1 size-3.5" /> Image Formats
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export function FormatCatalogSearch() {
  const { searchQuery, setSearchQuery } = useFormatCatalog();

  return (
    <div className="relative w-full sm:w-72">
      <MagnifyingGlassIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
      <input
        id="format-search-input"
        type="text"
        placeholder="Search format (e.g. HEIC, PDF)..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        aria-label="Search supported file formats"
        className="bg-background border-border focus:ring-ring w-full rounded-md border py-2 pr-4 pl-9 text-sm transition-colors focus:ring-2 focus:outline-none"
      />
    </div>
  );
}

export function FormatCatalogCard({ format }: { format: FormatItem }) {
  return (
    <Card className="border-border shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="text-foreground text-base font-bold">{format.ext}</h3>
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
                <ArrowRightIcon /> {target}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function FormatCatalogGrid({ children }: { children?: React.ReactNode }) {
  const { filteredItems } = useFormatCatalog();

  if (filteredItems.length === 0) {
    return (
      <div className="bg-card border-border space-y-2 rounded-lg border py-12 text-center">
        <p className="text-foreground text-sm font-semibold">No format matches your query.</p>
        <p className="text-muted-foreground text-xs">
          Try searching for a supported format like PNG, JPG, WebP, SVG, GIF, HEIC, or PDF.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children ??
        filteredItems.map((format) => <FormatCatalogCard key={format.ext} format={format} />)}
    </div>
  );
}
