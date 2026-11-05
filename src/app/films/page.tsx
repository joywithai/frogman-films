import Link from "next/link";
import { getFilms } from "@/server/queries/films";
import { Film, Play, Search, Clock, Calendar, Tag } from "lucide-react";

export const metadata = {
  title: "Film Archive — Frogman Films",
  description: "Browse the complete 2D animated film catalogue of Frogman Films.",
};

export default async function FilmsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tag?: string }>;
}) {
  const { q, tag } = await searchParams;
  const films = await getFilms({ search: q, tag });

  // Gather unique tags
  const allFilms = await getFilms();
  const allTags = Array.from(new Set(allFilms.flatMap((f) => f.tags)));

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Strip */}
      <div className="border-b border-[var(--color-border)] pb-8 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          <span>CATALOGUE DIVISION // SECTION 01</span>
          <span>•</span>
          <span>{films.length} WORKS CATALOGUED</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          Film Archive
        </h1>
        <p className="text-[var(--color-text-muted)] text-base max-w-2xl">
          Complete orthographic records of hand-drawn short films, ambient
          vignettes, and acoustic soundscape reels produced by Frogman Films.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-6 border-b border-[#1c1c20]">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/films"
            className={`px-3 py-1.5 rounded-sm text-xs font-mono-archive transition-colors ${
              !tag
                ? "bg-[#ece7d5] text-[#070709] font-semibold"
                : "bg-[#14151a] text-[var(--color-text-muted)] hover:text-[#ece7d5] border border-[#24252a]"
            }`}
          >
            ALL TAGS
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/films?tag=${encodeURIComponent(t)}`}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono-archive transition-colors ${
                tag === t
                  ? "bg-[#ece7d5] text-[#070709] font-semibold"
                  : "bg-[#14151a] text-[var(--color-text-muted)] hover:text-[#ece7d5] border border-[#24252a]"
              }`}
            >
              {t.toUpperCase()}
            </Link>
          ))}
        </div>

        <form method="GET" action="/films" className="relative w-full sm:w-64">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search films..."
            className="w-full px-3 py-1.5 pl-8 bg-[#111114] border border-[#29292d] text-xs text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
          />
          <Search className="w-3.5 h-3.5 text-[var(--color-text-dim)] absolute left-2.5 top-2.5" />
        </form>
      </div>

      {/* Empty State */}
      {films.length === 0 ? (
        <div className="py-20 text-center space-y-4 rounded-md border border-[var(--color-border)] bg-[#0c0c0f]">
          <div className="w-12 h-12 rounded-full border border-[#29292d] bg-[#111114] mx-auto flex items-center justify-center text-[var(--color-text-dim)]">
            <Film className="w-5 h-5" />
          </div>
          <h3 className="font-display text-xl text-[var(--color-text)]">
            No archive records found
          </h3>
          <p className="text-xs text-[var(--color-text-dim)] max-w-sm mx-auto">
            No film entries match your search query. Try clearing filters or searching for terms like "Pond", "Clock", or "Rain".
          </p>
          <Link
            href="/films"
            className="inline-block px-4 py-2 bg-[#ece7d5] text-[#070709] text-xs font-mono-archive uppercase font-semibold rounded-sm"
          >
            Clear Filter
          </Link>
        </div>
      ) : (
        /* Films Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {films.map((film) => (
            <article
              key={film.id}
              className="group flex flex-col rounded-md border border-[var(--color-border)] bg-[#111114] overflow-hidden hover:border-[#44444a] transition-all"
            >
              <Link
                href={`/films/${film.slug}`}
                className="relative aspect-[16/9] bg-[#070709] overflow-hidden block"
              >
                <img
                  src={film.posterUrl}
                  alt={film.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#ece7d5] text-[#070709] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#070709]/80 border border-[#29292d] text-[10px] font-mono-archive text-[#ece7d5] backdrop-blur-sm">
                  {film.archiveId}
                </div>
              </Link>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono-archive text-[var(--color-text-dim)] mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {film.releaseYear}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {film.runtimeMins} MINS
                    </span>
                    <span>•</span>
                    <span>RATIO: {film.aspectRatio}</span>
                  </div>

                  <h2 className="font-display text-2xl text-[var(--color-text)] group-hover:text-[#ece7d5] transition-colors">
                    <Link href={`/films/${film.slug}`}>{film.title}</Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] line-clamp-3 mt-2 leading-relaxed">
                    {film.synopsis}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1c1c20] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {film.tags.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] font-mono-archive rounded-sm bg-[#18191f] text-[var(--color-text-dim)] border border-[#24252a]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/films/${film.slug}`}
                    className="text-xs font-mono-archive text-[var(--color-text)] hover:text-[#ece7d5] font-semibold flex items-center gap-1"
                  >
                    <span>View Dossier</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
