import { notFound } from "next/navigation";
import Link from "next/link";
import { getBookBySlug, getBooks } from "@/server/queries/books";
import { BookAddToCart } from "@/components/stories/BookAddToCart";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Folio Not Found — Frogman Films" };

  return {
    title: `${book.title} — Frogman Films Folio Archive`,
    description: book.synopsis,
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const allBooks = await getBooks();
  const relatedBooks = allBooks.filter((b) => b.slug !== book.slug);

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] pb-4 border-b border-[#1c1c20]">
        <Link
          href="/stories"
          className="hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO STORY ARCHIVE</span>
        </Link>
        <span>FOLIO REGISTRY: {book.folioId}</span>
      </div>

      {/* Main Showcase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Book Cover Display */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-md p-8 rounded-md border border-[var(--color-border)] bg-[#111114] shadow-2xl flex flex-col items-center">
            <div className="w-64 aspect-[3/4] relative rounded overflow-hidden shadow-2xl">
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-6 w-full pt-4 border-t border-[#1c1c20] flex justify-between text-xs font-mono-archive text-[var(--color-text-dim)]">
              <span>FORMAT: {book.format}</span>
              <span>PAGES: {book.pageCount}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative, Details & Commerce */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase tracking-widest mb-1.5">
              STUDIO STORYBOOK // {book.folioId}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
              {book.title}
            </h1>
            {book.subtitle && (
              <p className="font-serif italic text-base text-[var(--color-text-dim)] mt-1">
                {book.subtitle}
              </p>
            )}
          </div>

          <div className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed space-y-4">
            <p>{book.synopsis}</p>
          </div>

          {/* Pricing & Stock Card */}
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#0c0c0f] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold font-mono-archive text-[#ece7d5]">
                  ${(book.priceCents / 100).toFixed(2)} USD
                </span>
                <div className="text-xs font-mono-archive text-emerald-400 mt-0.5">
                  Archival Stock: {book.stock} copies ready for postal dispatch
                </div>
              </div>
              <div className="text-right text-xs font-mono-archive text-[var(--color-text-dim)]">
                <div>WORLDWIDE DISPATCH</div>
                <div>SECURE CART</div>
              </div>
            </div>

            <BookAddToCart book={book} />
          </div>

          {/* Archival Specification Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs font-mono-archive pt-2">
            <div className="p-3 rounded border border-[#1c1c20] bg-[#111114]">
              <span className="text-[var(--color-text-dim)] block">DIMENSIONS</span>
              <span className="text-[var(--color-text)] font-medium">
                {book.dimensions || "Standard Casebound Linen"}
              </span>
            </div>
            <div className="p-3 rounded border border-[#1c1c20] bg-[#111114]">
              <span className="text-[var(--color-text-dim)] block">CREATOR & STUDIO</span>
              <span className="text-[var(--color-text)] font-medium">
                {book.creator}
              </span>
            </div>
          </div>

          {/* Protected Digital Access Notice (SPEC MANDATE) */}
          <div className="p-4 rounded border border-blue-900/40 bg-blue-950/20 text-xs font-mono-archive text-blue-200/90 flex items-start gap-3">
            <Lock className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
            <div>
              <span className="font-semibold block text-blue-300">
                PROTECTED DIGITAL ARCHIVE ACCESS
              </span>
              Digital editions and production masters are protected. Time-limited signed
              download links are generated automatically and granted in your account
              immediately after verified purchase.
            </div>
          </div>
        </div>
      </div>

      {/* Approved Sample Spreads Gallery */}
      {book.samplePages && book.samplePages.length > 0 && (
        <section className="pt-12 border-t border-[var(--color-border)] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
              Approved Sample Spreads // Archive Preview
            </h3>
            <span className="text-xs font-mono-archive text-[var(--color-text-dim)]">
              {book.samplePages.length} PLATES AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {book.samplePages.map((page) => (
              <div
                key={page.pageNumber}
                className="rounded-md border border-[var(--color-border)] bg-[#111114] overflow-hidden"
              >
                <div className="aspect-[4/3] bg-[#070709] p-2">
                  <img
                    src={page.imageUrl}
                    alt={page.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                    PAGE {page.pageNumber}
                  </div>
                  <h4 className="font-display text-sm text-[var(--color-text)]">
                    {page.title}
                  </h4>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {page.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
