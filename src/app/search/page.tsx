import Link from "next/link";
import { getFilms } from "@/server/queries/films";
import { getBooks } from "@/server/queries/books";
import { getProducts } from "@/server/queries/products";
import { Search, Film, BookOpen, ShoppingBag, ArrowRight } from "lucide-react";

// Reads URL data (params/searchParams); opt out of blocking prerender.
export const instant = false;


export const metadata = {
  title: "Search Studio Vault — Frogman Films",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q || "";

  const [films, books, products] = await Promise.all([
    getFilms({ search: query }),
    getBooks({ search: query }),
    getProducts({ search: query }),
  ]);

  const totalResults = films.length + books.length + products.length;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-[var(--color-border)] pb-8 space-y-4">
        <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          INDEX RECONNAISSANCE // UNIFIED QUERY
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          Search the Archive
        </h1>

        <form method="GET" action="/search" className="relative max-w-xl pt-2">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search films, storybooks, stickers, posters..."
            className="w-full px-4 py-3 pl-11 bg-[#111114] border border-[#29292d] text-sm text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
          />
          <Search className="w-5 h-5 text-[var(--color-text-dim)] absolute left-3.5 top-5.5" />
        </form>
      </div>

      {query && (
        <div className="text-xs font-mono-archive text-[var(--color-text-dim)]">
          FOUND {totalResults} ARCHIVE RESULTS FOR &ldquo;{query}&rdquo;
        </div>
      )}

      {/* Results Sections */}
      <div className="space-y-12">
        {/* Films matches */}
        {films.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text-dim)] flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-300" />
              <span>Film Releases ({films.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {films.map((f) => (
                <Link
                  key={f.id}
                  href={`/films/${f.slug}`}
                  className="p-4 rounded border border-[var(--color-border)] bg-[#111114] hover:border-[#44444a] transition-all flex items-center gap-4 group"
                >
                  <div className="w-20 aspect-[4/3] rounded bg-[#070709] overflow-hidden flex-shrink-0">
                    <img src={f.posterUrl} alt={f.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                      {f.archiveId} // {f.releaseYear}
                    </div>
                    <div className="font-display text-base text-[var(--color-text)] group-hover:text-[#ece7d5]">
                      {f.title}
                    </div>
                    <p className="text-xs text-[var(--color-text-dim)] line-clamp-1 mt-0.5">
                      {f.synopsis}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Storybooks matches */}
        {books.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text-dim)] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span>Storybook Folios ({books.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {books.map((b) => (
                <Link
                  key={b.id}
                  href={`/stories/${b.slug}`}
                  className="p-4 rounded border border-[var(--color-border)] bg-[#111114] hover:border-[#44444a] transition-all flex items-center gap-4 group"
                >
                  <div className="w-16 aspect-[3/4] rounded bg-[#070709] overflow-hidden flex-shrink-0">
                    <img src={b.coverUrl} alt={b.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                      {b.folioId}
                    </div>
                    <div className="font-display text-base text-[var(--color-text)] group-hover:text-[#ece7d5]">
                      {b.title}
                    </div>
                    <div className="text-xs font-mono-archive text-[#ece7d5] mt-1">
                      ${(b.priceCents / 100).toFixed(2)} USD
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Shop objects matches */}
        {products.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text-dim)] flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-sky-400" />
              <span>Shop Objects & Stickers ({products.length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/shop/${p.slug}`}
                  className="p-4 rounded border border-[var(--color-border)] bg-[#111114] hover:border-[#44444a] transition-all flex items-center gap-4 group"
                >
                  <div className="w-16 aspect-square rounded bg-[#070709] p-1 flex-shrink-0">
                    <img
                      src={p.images[0]?.url || "/images/prod-mug.svg"}
                      alt={p.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                      {p.sku}
                    </div>
                    <div className="font-display text-sm text-[var(--color-text)] group-hover:text-[#ece7d5] line-clamp-1">
                      {p.title}
                    </div>
                    <div className="text-xs font-mono-archive text-[#ece7d5] mt-1">
                      ${(p.priceCents / 100).toFixed(2)} USD
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {query && totalResults === 0 && (
          <div className="py-16 text-center space-y-3 rounded border border-[var(--color-border)] bg-[#0c0c0f]">
            <p className="text-sm font-mono-archive text-[var(--color-text-muted)]">
              No archive entries match &ldquo;{query}&rdquo;.
            </p>
            <Link
              href="/search"
              className="text-xs font-mono-archive text-amber-300 hover:underline"
            >
              Reset Search
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
