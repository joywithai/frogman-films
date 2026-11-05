import Link from "next/link";
import { getProducts } from "@/server/queries/products";
import { ShoppingBag, Search, Tag, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Shop & Archive Editions — Frogman Films",
  description:
    "Official Frogman stickers, orthographic turnaround prints, stoneware mugs, and archival digital editions.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { category, q } = await searchParams;
  const products = await getProducts({ categorySlug: category, search: q });

  const categories = [
    { slug: "", label: "ALL OBJECTS" },
    { slug: "stickers", label: "STICKERS & EPHEMERA" },
    { slug: "prints", label: "FINE ART PRINTS" },
    { slug: "storybooks", label: "STORYBOOKS" },
    { slug: "merchandise", label: "CERAMICS & OBJECTS" },
    { slug: "digital-products", label: "DIGITAL ARCHIVE" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header Strip */}
      <div className="border-b border-[var(--color-border)] pb-8 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          <span>CATALOGUE DIVISION // SECTION 03</span>
          <span>•</span>
          <span>CANONICAL ARTIFACTS</span>
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          The Studio Shop
        </h1>
        <p className="text-[var(--color-text-muted)] text-base max-w-2xl">
          Archival merchandise reproducing the authentic character models and
          expressions of Frogman. Screen-printed matte stickers, cotton rag
          turnaround prints, stoneware ceramics, and digital master files.
        </p>
      </div>

      {/* Category Pills & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 border-b border-[#1c1c20]">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const active = (category || "") === c.slug;
            return (
              <Link
                key={c.slug}
                href={c.slug ? `/shop?category=${c.slug}` : "/shop"}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono-archive transition-colors ${
                  active
                    ? "bg-[#ece7d5] text-[#070709] font-semibold"
                    : "bg-[#14151a] text-[var(--color-text-muted)] hover:text-[#ece7d5] border border-[#24252a]"
                }`}
              >
                {c.label}
              </Link>
            );
          })}
        </div>

        <form method="GET" action="/shop" className="relative w-full sm:w-64">
          <input
            type="text"
            name="q"
            defaultValue={q || ""}
            placeholder="Search artifacts..."
            className="w-full px-3 py-1.5 pl-8 bg-[#111114] border border-[#29292d] text-xs text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
          />
          <Search className="w-3.5 h-3.5 text-[var(--color-text-dim)] absolute left-2.5 top-2.5" />
        </form>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((prod) => (
          <article
            key={prod.id}
            className="group flex flex-col rounded-md border border-[var(--color-border)] bg-[#111114] overflow-hidden hover:border-[#44444a] transition-all"
          >
            <Link
              href={`/shop/${prod.slug}`}
              className="aspect-[4/3] bg-[#070709] border-b border-[var(--color-border)] overflow-hidden relative block"
            >
              <img
                src={prod.images[0]?.url || "/images/prod-mug.svg"}
                alt={prod.title}
                className="w-full h-full object-contain p-4 group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 px-2 py-0.5 rounded-sm bg-[#070709]/80 border border-[#29292d] text-[10px] font-mono-archive text-[#ece7d5]">
                {prod.sku}
              </div>
            </Link>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)] uppercase">
                  {prod.category.name} // {prod.format}
                </div>

                <h2 className="font-display text-xl text-[var(--color-text)] group-hover:text-[#ece7d5] transition-colors mt-1">
                  <Link href={`/shop/${prod.slug}`}>{prod.title}</Link>
                </h2>

                {prod.subtitle && (
                  <p className="font-serif italic text-xs text-[var(--color-text-dim)] mt-0.5">
                    {prod.subtitle}
                  </p>
                )}

                <p className="text-xs text-[var(--color-text-muted)] mt-2 line-clamp-2">
                  {prod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#1c1c20] flex items-center justify-between">
                <div>
                  <span className="text-base font-semibold font-mono-archive text-[#ece7d5]">
                    ${(prod.priceCents / 100).toFixed(2)} USD
                  </span>
                  <div className="text-[10px] font-mono-archive text-emerald-400">
                    {prod.stock > 0 ? `Stock: ${prod.stock}` : "Sold out"}
                  </div>
                </div>

                <Link
                  href={`/shop/${prod.slug}`}
                  className="px-3.5 py-1.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-medium hover:bg-white transition-colors"
                >
                  Select & Add
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
