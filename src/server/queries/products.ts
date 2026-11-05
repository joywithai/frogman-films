import { prisma } from "@/lib/db/prisma";
import { initialProducts } from "@/lib/data/mock-db";
import { ProductItem, ProductFormat } from "@/lib/types";

export async function getProducts(filters?: {
  categorySlug?: string;
  format?: ProductFormat;
  search?: string;
}): Promise<ProductItem[]> {
  try {
    if (process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        where: {
          isAvailable: true,
          ...(filters?.categorySlug
            ? { category: { slug: filters.categorySlug } }
            : {}),
          ...(filters?.format ? { format: filters.format } : {}),
          ...(filters?.search
            ? {
                OR: [
                  { title: { contains: filters.search, mode: "insensitive" } },
                  { description: { contains: filters.search, mode: "insensitive" } },
                  { sku: { contains: filters.search, mode: "insensitive" } },
                ],
              }
            : {}),
        },
        include: {
          category: true,
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
        },
        orderBy: { createdAt: "desc" },
      });

      if (dbProducts && dbProducts.length > 0) {
        return dbProducts.map((p) => ({
          id: p.id,
          slug: p.slug,
          sku: p.sku,
          title: p.title,
          subtitle: p.subtitle ?? undefined,
          description: p.description,
          priceCents: p.priceCents,
          currency: p.currency,
          stock: p.stock,
          isAvailable: p.isAvailable,
          isFeatured: p.isFeatured,
          format: p.format as ProductFormat,
          category: {
            id: p.category.id,
            slug: p.category.slug,
            name: p.category.name,
          },
          images: p.images.map((img) => ({
            id: img.id,
            url: img.url,
            altText: img.altText,
          })),
          variants: p.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            priceCents: v.priceCents,
            stock: v.stock,
            isAvailable: v.isAvailable,
          })),
        }));
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback for getProducts");
  }

  let products = [...initialProducts];
  if (filters?.categorySlug) {
    products = products.filter((p) => p.category.slug === filters.categorySlug);
  }
  if (filters?.format) {
    products = products.filter((p) => p.format === filters.format);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }
  return products;
}

export async function getProductBySlug(slug: string): Promise<ProductItem | null> {
  try {
    if (process.env.DATABASE_URL) {
      const p = await prisma.product.findUnique({
        where: { slug },
        include: {
          category: true,
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
        },
      });

      if (p) {
        return {
          id: p.id,
          slug: p.slug,
          sku: p.sku,
          title: p.title,
          subtitle: p.subtitle ?? undefined,
          description: p.description,
          priceCents: p.priceCents,
          currency: p.currency,
          stock: p.stock,
          isAvailable: p.isAvailable,
          isFeatured: p.isFeatured,
          format: p.format as ProductFormat,
          category: {
            id: p.category.id,
            slug: p.category.slug,
            name: p.category.name,
          },
          images: p.images.map((img) => ({
            id: img.id,
            url: img.url,
            altText: img.altText,
          })),
          variants: p.variants.map((v) => ({
            id: v.id,
            name: v.name,
            sku: v.sku,
            priceCents: v.priceCents,
            stock: v.stock,
            isAvailable: v.isAvailable,
          })),
        };
      }
    }
  } catch (error) {
    console.warn("Prisma query fallback for getProductBySlug");
  }

  return initialProducts.find((p) => p.slug === slug) ?? null;
}
