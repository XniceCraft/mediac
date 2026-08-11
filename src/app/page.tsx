import { SparkleIcon } from "@phosphor-icons/react/ssr";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Converter } from "./_components/converter";
import { SettingsModal } from "./_components/settings-modal";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-10 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-3 text-center">
          <div className="bg-accent/10 border-accent/20 text-accent inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
            <SparkleIcon className="size-3.5" />
            100% In-Browser & Client-Side Media Converter
          </div>
          <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Convert Images & Documents Instantly
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Easily convert JPG, PNG, WebP, SVG, GIF, HEIC, and PDF files directly in your browser
            with full privacy and zero server uploads.
          </p>
        </div>

        <Converter.Root>
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
            <div className="space-y-6 md:col-span-5 lg:col-span-4">
              <Converter.Options>
                <SettingsModal />
              </Converter.Options>
            </div>

            <div className="space-y-6 md:col-span-7 lg:col-span-8">
              <Converter.Dropzone />
              <Converter.Queue />
            </div>
          </div>
        </Converter.Root>
      </main>

      <Footer />
    </>
  );
}
