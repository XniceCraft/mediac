import { SparkleIcon, ShieldCheckIcon, LightningIcon, FilesIcon } from "@phosphor-icons/react/ssr";
import { Navbar } from "@/components/navbar/navbar";
import { Footer } from "@/components/footer/footer";
import { Converter } from "./_components/converter";

const faqItems = [
  {
    question: "How does in-browser file conversion work?",
    answer:
      "MediaC processes your files using modern libraries directly inside your web browser. Your files are never uploaded to external servers.",
  },
  {
    question: "Are my media files uploaded to any server?",
    answer:
      "No. All image and document conversions happen 100% locally in your browser session. Your data stays entirely on your device for absolute privacy.",
  },
  {
    question: "What file formats can I convert?",
    answer:
      "MediaC supports JPG, PNG, WebP, AVIF, JXL, and HEIC input images, with output conversion support for JPG, PNG, WebP, and PDF.",
  },
  {
    question: "Is MediaC free to use?",
    answer:
      "Yes, MediaC is completely free with no registration, no subscription, and no hidden file size limits.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map((item) => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 space-y-16 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <section aria-labelledby="converter-heading" className="space-y-10">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <div className="bg-accent/10 border-accent/20 text-accent inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
              <SparkleIcon className="size-3.5" />
              100% In-Browser & Client-Side Media Converter
            </div>
            <h1
              id="converter-heading"
              className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Convert Images & Documents Instantly
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Easily convert JPG, PNG, WebP, HEIC, AVIF, and JXL files directly in your browser with
              full privacy and zero server uploads.
            </p>
          </div>

          <Converter.Root>
            <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-12">
              <div className="space-y-6 md:col-span-5 lg:col-span-4">
                <Converter.Options />
              </div>

              <div className="space-y-6 md:col-span-7 lg:col-span-8">
                <Converter.Dropzone />
                <Converter.Queue />
              </div>
            </div>
          </Converter.Root>
        </section>

        <section aria-labelledby="features-heading" className="border-border border-t pt-12">
          <div className="mb-8 space-y-2 text-center">
            <h2 id="features-heading" className="text-foreground text-2xl font-bold tracking-tight">
              Why Choose MediaC?
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Designed for privacy, speed, and cross-platform reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bg-card border-border space-y-3 rounded-xl border p-6 shadow-sm">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <ShieldCheckIcon className="size-5" />
              </div>
              <h3 className="text-foreground text-base font-semibold">100% Client-Side Privacy</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Files are processed exclusively inside your web browser. Zero server transfers means
                complete confidentiality for your personal documents and photos.
              </p>
            </div>

            <div className="bg-card border-border space-y-3 rounded-xl border p-6 shadow-sm">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <LightningIcon className="size-5" />
              </div>
              <h3 className="text-foreground text-base font-semibold">Instant Processing</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Skip long upload wait times. Conversion happens instantly using local browser
                hardware acceleration.
              </p>
            </div>

            <div className="bg-card border-border space-y-3 rounded-xl border p-6 shadow-sm">
              <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
                <FilesIcon className="size-5" />
              </div>
              <h3 className="text-foreground text-base font-semibold">Broad Format Support</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Convert between modern web formats like WebP and AVIF, or traditional JPG, PNG, and
                PDF documents.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="how-it-works-heading" className="border-border border-t pt-12">
          <div className="mb-8 space-y-2 text-center">
            <h2
              id="how-it-works-heading"
              className="text-foreground text-2xl font-bold tracking-tight"
            >
              How It Works
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Convert your media files in three simple steps.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <li className="bg-card border-border space-y-2 rounded-xl border p-6 shadow-sm">
              <span className="text-accent text-xs font-bold tracking-wider uppercase">Step 1</span>
              <h3 className="text-foreground text-base font-semibold">Select Output Settings</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Choose your target output format (JPG, PNG, WebP, or PDF) and adjust compression
                quality.
              </p>
            </li>

            <li className="bg-card border-border space-y-2 rounded-xl border p-6 shadow-sm">
              <span className="text-accent text-xs font-bold tracking-wider uppercase">Step 2</span>
              <h3 className="text-foreground text-base font-semibold">Upload Files</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Drag and drop your images into the dropzone or click to choose files from your
                device.
              </p>
            </li>

            <li className="bg-card border-border space-y-2 rounded-xl border p-6 shadow-sm">
              <span className="text-accent text-xs font-bold tracking-wider uppercase">Step 3</span>
              <h3 className="text-foreground text-base font-semibold">Download Converted Media</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">
                Download your converted images individually or batch save them all in seconds.
              </p>
            </li>
          </ol>
        </section>

        <section aria-labelledby="faq-heading" className="border-border border-t pt-12">
          <div className="mb-8 space-y-2 text-center">
            <h2 id="faq-heading" className="text-foreground text-2xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-sm">
              Answers to common questions about MediaC and in-browser file conversion.
            </p>
          </div>

          <div className="border-border bg-card mx-auto max-w-3xl divide-y rounded-xl border p-6 shadow-sm">
            {faqItems.map((item) => (
              <article key={item.question} className="space-y-1.5 py-4 first:pt-0 last:pb-0">
                <h3 className="text-foreground text-sm font-semibold">{item.question}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
