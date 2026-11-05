import { notFound } from "next/navigation";
import Link from "next/link";
import { getFilmBySlug, getFilms } from "@/server/queries/films";
import { getVideoPlaybackInfo } from "@/lib/video/adapter";
import {

  Calendar,
  Clock,
  Share2,
  Film,
  ArrowLeft,
  AlertTriangle,
  Play,
  CheckCircle,
} from "lucide-react";

// Reads URL data (params/searchParams); opt out of blocking prerender.
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);
  if (!film) return { title: "Film Not Found — Frogman Films" };

  return {
    title: `${film.title} (${film.releaseYear}) — Frogman Films`,
    description: film.synopsis,
  };
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = await getFilmBySlug(slug);
  if (!film) notFound();

  const allFilms = await getFilms();
  const relatedFilms = allFilms.filter((f) => f.slug !== film.slug).slice(0, 2);

  // Consult Video Provider Adapter
  const playbackInfo = getVideoPlaybackInfo({
    provider: film.videoAsset?.provider,
    playbackUrl: film.videoAsset?.playbackUrl,
    title: film.title,
    posterUrl: film.posterUrl,
  });

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] pb-4 border-b border-[#1c1c20]">
        <Link
          href="/films"
          className="hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ARCHIVE</span>
        </Link>
        <span>DOSSIER: {film.archiveId}</span>
      </div>

      {/* Main Video Player / Archival Screening Container */}
      <div className="w-full rounded-md border border-[var(--color-border)] bg-[#070709] overflow-hidden shadow-2xl">
        <div className="relative aspect-[16/9] w-full bg-[#050507] flex items-center justify-center">
          {playbackInfo.isConfigured && playbackInfo.playbackUrl ? (
            /* Live configured player */
            <video
              controls
              poster={film.posterUrl}
              className="w-full h-full object-contain"
            >
              <source src={playbackInfo.playbackUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            /* Pristine "Provider Not Configured" State (SPEC MANDATE) */
            <div className="p-8 max-w-lg text-center space-y-4">
              <div className="w-14 h-14 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl text-[var(--color-text)]">
                  Video Provider Not Configured
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed font-mono-archive">
                  In accordance with studio integrity standards, playback is not faked.
                  To stream master reel &ldquo;{film.title}&rdquo;, configure MUX_TOKEN or
                  CLOUDFLARE_STREAM_TOKEN in the environment.
                </p>
              </div>
              <div className="pt-2 text-[11px] font-mono-archive text-[var(--color-text-dim)]">
                ASSET STATUS: UNCONFIGURED // ARCHIVE ID: {film.archiveId}
              </div>
            </div>
          )}
        </div>

        {/* Player Metabar */}
        <div className="px-6 py-3 bg-[#0c0c0f] border-t border-[var(--color-border)] flex flex-wrap items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] gap-4">
          <div className="flex items-center gap-4">
            <span>MASTER REEL: 4:3 ANAMORPHIC</span>
            <span>•</span>
            <span>AUDIO: 24-BIT 48KHZ STEREO</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-[var(--color-text-muted)]">STUDIO VAULT VERIFIED</span>
          </div>
        </div>
      </div>

      {/* Film Information & Credits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Synopsis & Story Lore */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="text-xs font-mono-archive text-amber-300/80 uppercase mb-2">
              RELEASE RECORD • {film.releaseYear}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
              {film.title}
            </h1>
          </div>

          <div className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed space-y-4">
            <p>{film.synopsis}</p>
          </div>

          {/* Tags */}
          <div className="pt-4 flex flex-wrap gap-2">
            {film.tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-xs font-mono-archive rounded-sm bg-[#14151a] text-[var(--color-text)] border border-[#29292d]"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Credits & Archival Metadata */}
        <div className="lg:col-span-4 space-y-6 rounded-md border border-[var(--color-border)] bg-[#111114] p-6">
          <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20]">
            Archival Production Credits
          </h3>

          <dl className="space-y-4 text-xs">
            <div>
              <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                Director
              </dt>
              <dd className="font-display text-sm text-[var(--color-text)] mt-0.5">
                {film.credits?.director || film.director}
              </dd>
            </div>

            <div>
              <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                Story & Script
              </dt>
              <dd className="font-display text-sm text-[var(--color-text)] mt-0.5">
                {film.credits?.story || "The Archive Collective"}
              </dd>
            </div>

            {film.credits?.animation && (
              <div>
                <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                  Animation Rig & Keys
                </dt>
                <dd className="text-[var(--color-text-muted)] mt-0.5">
                  {film.credits.animation.join(", ")}
                </dd>
              </div>
            )}

            <div>
              <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                Musical Composition
              </dt>
              <dd className="text-[var(--color-text-muted)] mt-0.5">
                {film.credits?.music || "Studio Acoustic Chamber"}
              </dd>
            </div>

            <div>
              <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                Sound Design
              </dt>
              <dd className="text-[var(--color-text-muted)] mt-0.5">
                {film.credits?.soundDesign || "Reedbed Acoustics Lab"}
              </dd>
            </div>

            <div>
              <dt className="font-mono-archive text-[var(--color-text-dim)] uppercase">
                Runtime & Ratio
              </dt>
              <dd className="text-[var(--color-text-muted)] mt-0.5">
                {film.runtimeMins} minutes // {film.aspectRatio}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Related Archive Releases */}
      {relatedFilms.length > 0 && (
        <div className="pt-12 border-t border-[var(--color-border)] space-y-6">
          <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text-dim)]">
            Related Vault Entries
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedFilms.map((rf) => (
              <Link
                key={rf.id}
                href={`/films/${rf.slug}`}
                className="flex items-center gap-4 p-4 rounded-md border border-[var(--color-border)] bg-[#111114] hover:border-[#44444a] transition-all group"
              >
                <div className="w-24 aspect-[4/3] rounded overflow-hidden bg-[#070709] flex-shrink-0">
                  <img
                    src={rf.posterUrl}
                    alt={rf.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)] uppercase">
                    {rf.archiveId} // {rf.releaseYear}
                  </div>
                  <h4 className="font-display text-lg text-[var(--color-text)] group-hover:text-[#ece7d5] transition-colors">
                    {rf.title}
                  </h4>
                  <div className="text-xs text-[var(--color-text-dim)] mt-0.5">
                    {rf.runtimeMins} mins • {rf.director}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
