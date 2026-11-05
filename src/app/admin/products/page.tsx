import { getProducts } from "@/server/queries/products";
import Link from "next/link";
import { ShoppingBag, Plus, Eye, Layers } from "lucide-react";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex justify-between items-center">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            STUDIO INVENTORY
          </span>
          <h1 className="font-display text-2xl text-[var(--color-text)] mt-0.5">
            Manage Shop Artifacts & Merchandise
          </h1>
        </div>
        <button
          type="button"
          className="px-3.5 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold flex items-center gap-1.5 hover:bg-white"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Artifact</span>
        </button>
      </div>

      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] overflow-x-auto">
        <table className="w-full text-left text-xs font-mono-archive">
          <thead>
            <tr className="border-b border-[#1c1c20] text-[var(--color-text-dim)]">
              <th className="py-2.5">SKU</th>
              <th className="py-2.5">TITLE</th>
              <th className="py-2.5">CATEGORY</th>
              <th className="py-2.5">PRICE</th>
              <th className="py-2.5">STOCK</th>
              <th className="py-2.5">VARIANTS</th>
              <th className="py-2.5 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1c1c20]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#14151a]">
                <td className="py-3 font-semibold text-[#ece7d5]">{p.sku}</td>
                <td className="py-3 text-[var(--color-text)]">{p.title}</td>
                <td className="py-3 text-[var(--color-text-dim)]">{p.category.name}</td>
                <td className="py-3 text-[#ece7d5]">${(p.priceCents / 100).toFixed(2)}</td>
                <td className="py-3 text-emerald-400">{p.stock} units</td>
                <td className="py-3 text-[var(--color-text-dim)]">
                  {p.variants?.length ? `${p.variants.length} options` : "Standard"}
                </td>
                <td className="py-3 text-right">
                  <Link
                    href={`/shop/${p.slug}`}
                    className="text-[var(--color-text-dim)] hover:text-[#ece7d5] inline-flex items-center gap-1"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
