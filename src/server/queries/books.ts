import { prisma } from "@/lib/db/prisma";
import { initialBooks } from "@/lib/data/mock-db";
import { BookItem, ProductFormat } from "@/lib/types";

export async function getBooks(filters?: {
  search?: string;
  format?: ProductFormat;
}): Promise<BookItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbBooks = await prisma.book.findMany({
        where: {
          isAvailable: true,
          ...(filters?.search
            ? {
                OR: [
                  { title: { contains: filters.search, mode: "insensitive" } },
                  { synopsis: { contains: filters.search, mode: "insensitive" } },
                  { folioId: { contains: filters.search, mode: "insensitive" } },
                ],
              }
            : {}),
          ...(filters?.format ? { format: filters.format } : {}),
        },
        orderBy: { folioId: "asc" },
      });

      if (dbBooks && dbBooks.length > 0) {
        return dbBooks.map((b) => ({
          id: b.id,
          slug: b.slug,
          folioId: b.folioId,
          title: b.title,
          subtitle: b.subtitle ?? undefined,
          creator: b.creator,
          synopsis: b.synopsis,
          format: b.format as ProductFormat,
          pageCount: b.pageCount,
          dimensions: b.dimensions ?? undefined,
          priceCents: b.priceCents,
          currency: b.currency,
          stock: b.stock,
          isAvailable: b.isAvailable,
          isFeatured: b.isFeatured,
          coverUrl: b.coverUrl,
          samplePages: (b.samplePages as any) ?? undefined,
          privateFile: b.privateFile ?? undefined,
        }));
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback for getBooks");
  }

  let books = [...initialBooks];
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    books = books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.synopsis.toLowerCase().includes(q) ||
        b.folioId.toLowerCase().includes(q)
    );
  }
  if (filters?.format) {
    books = books.filter((b) => b.format === filters.format);
  }
  return books;
}

export async function getBookBySlug(slug: string): Promise<BookItem | null> {
  try {
    if (process.env.DATABASE_URL) {
      const b = await prisma.book.findUnique({
        where: { slug },
      });
      if (b) {
        return {
          id: b.id,
          slug: b.slug,
          folioId: b.folioId,
          title: b.title,
          subtitle: b.subtitle ?? undefined,
          creator: b.creator,
          synopsis: b.synopsis,
          format: b.format as ProductFormat,
          pageCount: b.pageCount,
          dimensions: b.dimensions ?? undefined,
          priceCents: b.priceCents,
          currency: b.currency,
          stock: b.stock,
          isAvailable: b.isAvailable,
          isFeatured: b.isFeatured,
          coverUrl: b.coverUrl,
          samplePages: (b.samplePages as any) ?? undefined,
          privateFile: b.privateFile ?? undefined,
        };
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback for getBookBySlug");
  }

  return initialBooks.find((b) => b.slug === slug) ?? null;
}
