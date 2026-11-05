import { prisma } from "@/lib/db/prisma";
import { initialFilms } from "@/lib/data/mock-db";
import { FilmItem } from "@/lib/types";

export async function getFilms(filters?: {
  search?: string;
  tag?: string;
}): Promise<FilmItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbFilms = await prisma.film.findMany({
        where: {
          isPublic: true,
          ...(filters?.search
            ? {
                OR: [
                  { title: { contains: filters.search, mode: "insensitive" } },
                  { synopsis: { contains: filters.search, mode: "insensitive" } },
                ],
              }
            : {}),
          ...(filters?.tag ? { tags: { has: filters.tag } } : {}),
        },
        include: {
          videoAsset: true,
        },
        orderBy: { releaseYear: "desc" },
      });

      if (dbFilms && dbFilms.length > 0) {
        return dbFilms.map((f) => ({
          id: f.id,
          slug: f.slug,
          archiveId: f.archiveId,
          title: f.title,
          synopsis: f.synopsis,
          director: f.director,
          releaseYear: f.releaseYear,
          runtimeMins: f.runtimeMins,
          aspectRatio: f.aspectRatio,
          isFeatured: f.isFeatured,
          isPublic: f.isPublic,
          posterUrl: f.posterUrl,
          backdropUrl: f.backdropUrl ?? undefined,
          tags: f.tags,
          credits: f.credits as any,
          videoAsset: f.videoAsset
            ? {
                provider: f.videoAsset.provider,
                playbackUrl: f.videoAsset.playbackUrl ?? undefined,
                durationSec: f.videoAsset.durationSec ?? undefined,
                status: f.videoAsset.status,
              }
            : undefined,
        }));
      }
    }
  } catch (error) {
    // Graceful fallback to approved initial archive if DB is initializing
    console.warn("Prisma query fallback to initial films repository");
  }

  // Fallback to static archive data
  let films = [...initialFilms];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    films = films.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.synopsis.toLowerCase().includes(q) ||
        f.archiveId.toLowerCase().includes(q)
    );
  }
  if (filters?.tag) {
    films = films.filter((f) => f.tags.includes(filters.tag!));
  }
  return films;
}

export async function getFilmBySlug(slug: string): Promise<FilmItem | null> {
  try {
    if (process.env.DATABASE_URL) {
      const f = await prisma.film.findUnique({
        where: { slug },
        include: { videoAsset: true },
      });
      if (f) {
        return {
          id: f.id,
          slug: f.slug,
          archiveId: f.archiveId,
          title: f.title,
          synopsis: f.synopsis,
          director: f.director,
          releaseYear: f.releaseYear,
          runtimeMins: f.runtimeMins,
          aspectRatio: f.aspectRatio,
          isFeatured: f.isFeatured,
          isPublic: f.isPublic,
          posterUrl: f.posterUrl,
          backdropUrl: f.backdropUrl ?? undefined,
          tags: f.tags,
          credits: f.credits as any,
          videoAsset: f.videoAsset
            ? {
                provider: f.videoAsset.provider,
                playbackUrl: f.videoAsset.playbackUrl ?? undefined,
                durationSec: f.videoAsset.durationSec ?? undefined,
                status: f.videoAsset.status,
              }
            : undefined,
        };
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback for getFilmBySlug");
  }

  return initialFilms.find((f) => f.slug === slug) ?? null;
}
