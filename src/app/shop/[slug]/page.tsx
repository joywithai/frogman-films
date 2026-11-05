import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductBySlug } from "@/server/queries/products";
import { ProductDetailView } from "@/components/shop/ProductDetailView";
import { ArrowLeft } from "lucide-react";

// Reads URL data (params/searchParams); opt out of blocking prerender.
export const instant = false;


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Artifact Not Found — Frogman Films" };

  return {
    title: `${product.title} — Frogman Films Shop`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] pb-4 border-b border-[#1c1c20]">
        <Link
          href="/shop"
          className="hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO SHOP</span>
        </Link>
        <span>ARTIFACT SKU: {product.sku}</span>
      </div>

      <ProductDetailView product={product} />
    </article>
  );
}
