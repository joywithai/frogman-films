import { PrismaClient, Role, ProductFormat } from "@prisma/client";
import { initialFilms, initialBooks, initialProducts, initialOrders } from "../src/lib/data/mock-db";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Frogman Films database...");

  // 1. Create Default Categories
  const categories = [
    { id: "cat_stickers", slug: "stickers", name: "Stickers & Ephemera", sortOrder: 1 },
    { id: "cat_prints", slug: "prints", name: "Fine Art Prints", sortOrder: 2 },
    { id: "cat_books", slug: "storybooks", name: "Storybooks", sortOrder: 3 },
    { id: "cat_merch", slug: "merchandise", name: "Merchandise & Objects", sortOrder: 4 },
    { id: "cat_digital", slug: "digital-products", name: "Digital Archive", sortOrder: 5 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // 2. Seed Films
  for (const film of initialFilms) {
    const videoAsset = film.videoAsset
      ? await prisma.videoAsset.create({
          data: {
            provider: film.videoAsset.provider,
            playbackUrl: film.videoAsset.playbackUrl,
            durationSec: film.videoAsset.durationSec,
            status: film.videoAsset.status,
          },
        })
      : null;

    await prisma.film.upsert({
      where: { slug: film.slug },
      update: {
        title: film.title,
        synopsis: film.synopsis,
        director: film.director,
        releaseYear: film.releaseYear,
        runtimeMins: film.runtimeMins,
        aspectRatio: film.aspectRatio,
        isFeatured: film.isFeatured,
        isPublic: film.isPublic,
        posterUrl: film.posterUrl,
        backdropUrl: film.backdropUrl,
        tags: film.tags,
        credits: film.credits as any,
      },
      create: {
        slug: film.slug,
        archiveId: film.archiveId,
        title: film.title,
        synopsis: film.synopsis,
        director: film.director,
        releaseYear: film.releaseYear,
        runtimeMins: film.runtimeMins,
        aspectRatio: film.aspectRatio,
        isFeatured: film.isFeatured,
        isPublic: film.isPublic,
        posterUrl: film.posterUrl,
        backdropUrl: film.backdropUrl,
        tags: film.tags,
        credits: film.credits as any,
        videoAssetId: videoAsset?.id,
      },
    });
  }

  // 3. Seed Storybooks
  for (const book of initialBooks) {
    await prisma.book.upsert({
      where: { slug: book.slug },
      update: {
        title: book.title,
        subtitle: book.subtitle,
        creator: book.creator,
        synopsis: book.synopsis,
        format: book.format as ProductFormat,
        pageCount: book.pageCount,
        dimensions: book.dimensions,
        priceCents: book.priceCents,
        currency: book.currency,
        stock: book.stock,
        isAvailable: book.isAvailable,
        isFeatured: book.isFeatured,
        coverUrl: book.coverUrl,
        samplePages: book.samplePages as any,
        privateFile: book.privateFile,
      },
      create: {
        slug: book.slug,
        folioId: book.folioId,
        title: book.title,
        subtitle: book.subtitle,
        creator: book.creator,
        synopsis: book.synopsis,
        format: book.format as ProductFormat,
        pageCount: book.pageCount,
        dimensions: book.dimensions,
        priceCents: book.priceCents,
        currency: book.currency,
        stock: book.stock,
        isAvailable: book.isAvailable,
        isFeatured: book.isFeatured,
        coverUrl: book.coverUrl,
        samplePages: book.samplePages as any,
        privateFile: book.privateFile,
      },
    });
  }

  // 4. Seed Products & Variants
  for (const prod of initialProducts) {
    const createdProduct = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        title: prod.title,
        subtitle: prod.subtitle,
        description: prod.description,
        priceCents: prod.priceCents,
        currency: prod.currency,
        stock: prod.stock,
        isAvailable: prod.isAvailable,
        isFeatured: prod.isFeatured,
        format: prod.format as ProductFormat,
        categoryId: prod.category.id,
      },
      create: {
        slug: prod.slug,
        sku: prod.sku,
        title: prod.title,
        subtitle: prod.subtitle,
        description: prod.description,
        priceCents: prod.priceCents,
        currency: prod.currency,
        stock: prod.stock,
        isAvailable: prod.isAvailable,
        isFeatured: prod.isFeatured,
        format: prod.format as ProductFormat,
        categoryId: prod.category.id,
      },
    });

    // Images
    for (const img of prod.images) {
      await prisma.productImage.create({
        data: {
          productId: createdProduct.id,
          url: img.url,
          altText: img.altText,
        },
      });
    }

    // Variants
    if (prod.variants) {
      for (const v of prod.variants) {
        await prisma.productVariant.upsert({
          where: { sku: v.sku },
          update: {
            name: v.name,
            priceCents: v.priceCents,
            stock: v.stock,
            isAvailable: v.isAvailable,
          },
          create: {
            productId: createdProduct.id,
            sku: v.sku,
            name: v.name,
            priceCents: v.priceCents,
            stock: v.stock,
            isAvailable: v.isAvailable,
          },
        });
      }
    }
  }

  // 5. Seed Admin User
  await prisma.user.upsert({
    where: { email: "archivist@frogmanfilms.com" },
    update: {},
    create: {
      email: "archivist@frogmanfilms.com",
      name: "Lead Archivist",
      role: Role.ADMIN,
      passwordHash: "demo_hash_scrypt_salt_dev_only",
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
