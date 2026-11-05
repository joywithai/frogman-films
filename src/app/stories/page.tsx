import Link from "next/link";
import { getBooks } from "@/server/queries/books";
import { BookOpen, Search, Layers, ShieldCheck, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Storybook Folios — Frogman Films",
  description: "Archival clothbound storybooks, prints, and illustrated folios by Frogman Films.",
};

export default async function StoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const books = await getBooks({ search: q });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Strip */}
      <div className="border-b border-[var(--color-border)] pb-8 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          <span>CATALOGUE DIVISION // SECTION 02</span>
          <span>•</span>
          <span>FOLIO PRINTINGS & DIGITAL MASTERS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          Storybook Folios
        </h1>
        <p className="text-[var(--color-text-muted)] text-base max-w-2xl">
          Printed on archival heavy stock with clothbound case bindings, hand-tipped
          colour plates, and quiet narrative pacing. Each volume is numbered under the
          studio folio standard.
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-[#1c1c20]">
        <div className="text-xs font-mono-archive text-[var(--color-text-dim)]">
          SHOWING {books.length} VOLUMES
        </div>

        <form method="GET" action="/stories" className="relative w-full sm:w-64">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search folios..."
            className="w-full px-3 py-1.5 pl-8 bg-[#111114] border border-[#29292d] text-xs text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
          />
          <Search className="w-3.5 h-3.5 text-[var(--color-text-dim)] absolute left-2.5 top-2.5" />
        </form>
      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {books.map((book) => (
          <article
            key={book.id}
            className="group flex flex-col rounded-md border border-[var(--color-border)] bg-[#111114] overflow-hidden hover:border-[#44444a] transition-all"
          >
            <Link
              href={`/stories/${book.slug}`}
              className="p-6 bg-[#0c0c0f] border-b border-[var(--color-border)] flex justify-center items-center group-hover:bg-[#121317] transition-colors"
            >
              <div className="w-48 aspect-[3/4] relative rounded shadow-xl overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-300">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] mb-1.5">
                  <span>{book.folioId}</span>
                  <span>{book.pageCount} PAGES</span>
                </div>

                <h2 className="font-display text-2xl text-[var(--color-text)] group-hover:text-[#ece7d5] transition-colors">
                  <Link href={`/stories/${book.slug}`}>{book.title}</Link>
                </h2>

                {book.subtitle && (
                  <p className="font-serif italic text-xs text-[var(--color-text-dim)] mt-0.5">
                    {book.subtitle}
                  </p>
                )}

                <p className="text-xs text-[var(--color-text-muted)] mt-3 line-clamp-3 leading-relaxed">
                  {book.synopsis}
                </p>
              </div>

              <div className="pt-4 border-t border-[#1c1c20] flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold font-mono-archive text-[#ece7d5]">
                    ${(book.priceCents / 100).toFixed(2)} USD
                  </span>
                  <div className="text-[10px] font-mono-archive text-emerald-400">
                    {book.stock > 0 ? `Stock: ${book.stock}` : "Sold Out"}
                  </div>
                </div>

                <Link
                  href={`/stories/${book.slug}`}
                  className="px-3 py-1.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-medium hover:bg-white transition-colors"
                >
                  Examine Folio
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
