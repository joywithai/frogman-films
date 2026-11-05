import Link from "next/link";
import Image from "next/image";
import { FrogmanBedroomHero } from "@/components/hero/frogman-bedroom/FrogmanBedroomHero";
import { getFilms } from "@/server/queries/films";
import { getBooks } from "@/server/queries/books";
import { getProducts } from "@/server/queries/products";
import {
  Film,
  BookOpen,
  ArrowRight,
  Play,
  Sparkles,
  Layers,
  Archive,
  Info,
} from "lucide-react";

export default async function HomePage() {
  const films = await getFilms();
  const books = await getBooks();
  const products = await getProducts();

  const featuredFilm = films.find((f) => f.isFeatured) || films[0];
  const featuredBook = books.find((b) => b.isFeatured) || books[0];
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);

  return (
    <div className="flex flex-col w-full">
      {/* 1. SIGNATURE HERO: FROGMAN'S BEDROOM */}
      <FrogmanBedroomHero />

      {/* 2. FEATURED FILM RELEASE BANNER */}
      {featuredFilm && (
        <section
          aria-label="Featured Film Release"
          className="border-b border-[var(--color-border)] py-16 bg-[#0c0c0f]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-6 border-b border-[#1c1c20] mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
                  CHAPTER I // FEATURED FILM RELEASE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              </div>
              <Link
                href="/films"
                className="text-xs font-mono-archive text-[var(--color-text-muted)] hover:text-[#ece7d5] flex items-center gap-1 transition-colors"
              >
                <span>COMPLETE FILM ARCHIVE ({films.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <Link
                  href={`/films/${featuredFilm.slug}`}
                  className="group block relative aspect-[4/3] sm:aspect-[16/9] rounded-md border border-[var(--color-border)] overflow-hidden bg-[#070709]"
                >
                  <img
                    src={featuredFilm.posterUrl}
                    alt={featuredFilm.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-[#ece7d5] text-[#070709] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 font-mono-archive text-xs px-2.5 py-1 bg-[#070709]/80 border border-[#29292d] text-[#ece7d5] backdrop-blur-sm">
                    {featuredFilm.archiveId} // {featuredFilm.runtimeMins} MINS // {featuredFilm.aspectRatio}
                  </div>
                </Link>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="text-xs font-mono-archive text-amber-300/80 uppercase">
                  LATEST ARCHIVAL SHORT • {featuredFilm.releaseYear}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
                  {featuredFilm.title}
                </h2>
                <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">
                  {featuredFilm.synopsis}
                </p>

                <div className="pt-2 flex flex-wrap gap-2">
                  {featuredFilm.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 text-xs font-mono-archive rounded-sm bg-[#14151a] text-[var(--color-text-dim)] border border-[#24252a]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href={`/films/${featuredFilm.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] font-medium text-sm hover:bg-white transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Archive Reel</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. FEATURED STORYBOOK FOLIO */}
      {featuredBook && (
        <section
          aria-label="Featured Storybook Folio"
          className="border-b border-[var(--color-border)] py-16 bg-[var(--color-bg)]"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between pb-6 border-b border-[#1c1c20] mb-8">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
                  CHAPTER II // PRINTED FOLIO EDITIONS
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              </div>
              <Link
                href="/stories"
                className="text-xs font-mono-archive text-[var(--color-text-muted)] hover:text-[#ece7d5] flex items-center gap-1 transition-colors"
              >
                <span>ALL STORYBOOKS ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4 order-2 lg:order-1">
                <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
                  {featuredBook.folioId} • {featuredBook.dimensions}
                </div>
                <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
                  {featuredBook.title}
                </h2>
                <div className="text-sm font-serif italic text-[var(--color-text-dim)]">
                  {featuredBook.subtitle}
                </div>
                <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed">
                  {featuredBook.synopsis}
                </p>

                <div className="flex items-center gap-4 text-sm font-mono-archive pt-2">
                  <span className="text-[#ece7d5] text-lg font-semibold">
                    ${(featuredBook.priceCents / 100).toFixed(2)} USD
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#14151a] text-emerald-400 border border-[#24252a]">
                    In Stock ({featuredBook.stock} copies)
                  </span>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <Link
                    href={`/stories/${featuredBook.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] font-medium text-sm hover:bg-white transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Inspect Folio Spreads</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
                <Link
                  href={`/stories/${featuredBook.slug}`}
                  className="group relative max-w-sm rounded-md border border-[var(--color-border)] bg-[#111114] p-3 shadow-2xl transition-transform hover:-translate-y-1"
                >
                  <img
                    src={featuredBook.coverUrl}
                    alt={featuredBook.title}
                    className="w-full h-auto rounded-sm shadow-inner"
                  />
                  <div className="mt-3 flex justify-between text-[11px] font-mono-archive text-[var(--color-text-dim)]">
                    <span>CASEBOUND ARCHIVE</span>
                    <span>{featuredBook.pageCount} PAGES</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED FROGMAN MERCHANDISE & STICKERS */}
      <section
        aria-label="Studio Merchandise and Archival Ephemera"
        className="border-b border-[var(--color-border)] py-16 bg-[#0c0c0f]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-6 border-b border-[#1c1c20] mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
                CHAPTER III // CANONICAL ARTWORK & OBJECTS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80" />
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono-archive text-[var(--color-text-muted)] hover:text-[#ece7d5] flex items-center gap-1 transition-colors"
            >
              <span>BROWSE SHOP ({products.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/shop/${prod.slug}`}
                className="group flex flex-col rounded-md border border-[var(--color-border)] bg-[#111114] overflow-hidden hover:border-[#44444a] transition-all"
              >
                <div className="aspect-[4/3] bg-[#070709] border-b border-[var(--color-border)] overflow-hidden relative">
                  <img
                    src={prod.images[0]?.url || "/images/prod-mug.svg"}
                    alt={prod.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#070709]/80 border border-[#29292d] text-[10px] font-mono-archive text-[#ece7d5]">
                    {prod.sku}
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="text-[11px] font-mono-archive text-[var(--color-text-dim)] uppercase">
                      {prod.category.name}
                    </div>
                    <h3 className="font-display text-lg text-[var(--color-text)] group-hover:text-[#ece7d5] transition-colors mt-0.5">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] line-clamp-2 mt-1">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1c1c20] flex items-center justify-between text-xs font-mono-archive">
                    <span className="text-[#ece7d5] font-semibold text-sm">
                      ${(prod.priceCents / 100).toFixed(2)} USD
                    </span>
                    <span className="text-[var(--color-text-dim)] group-hover:text-[#ece7d5] flex items-center gap-1">
                      <span>View Object</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ABOUT THE STUDIO & CHARACTER LORE */}
      <section
        aria-label="About Frogman Films Studio"
        className="py-16 bg-[var(--color-bg)]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#111114] border border-[#29292d] text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            <Archive className="w-3.5 h-3.5" />
            <span>ESTABLISHED MMXIV // REEDBED ARCHIVE</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)] max-w-2xl mx-auto">
            A quiet antidote to the noise of the modern world.
          </h2>

          <p className="text-[var(--color-text-muted)] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans">
            Frogman Films was founded on a simple premise: that stories about
            tea, rain, woodstoves, and contemplation deserve the same
            meticulous cinematic care as epic spectacles. We work with
            orthographic character models, vintage paper grain, and restrained
            temperaments.
          </p>

          <div className="pt-4 flex justify-center items-center gap-4">
            <Link
              href="/about"
              className="px-5 py-2.5 rounded-sm border border-[var(--color-border)] text-xs font-mono-archive uppercase tracking-wider text-[var(--color-text)] hover:bg-[#14151a] transition-colors"
            >
              Read Full Studio Lore →
            </Link>
            <Link
              href="/films"
              className="px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive uppercase tracking-wider font-semibold hover:bg-white transition-colors"
            >
              Browse Film Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
