import Link from "next/link";
import { getFilms } from "@/server/queries/films";
import { getBooks } from "@/server/queries/books";
import { getProducts } from "@/server/queries/products";
import { initialOrders } from "@/lib/data/mock-db";
import {
  Film,
  BookOpen,
  ShoppingBag,
  Package,
  TrendingUp,
  ShieldCheck,
  Plus,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const films = await getFilms();
  const books = await getBooks();
  const products = await getProducts();
  const orders = initialOrders;

  const totalRevenueCents = orders.reduce((sum, o) => sum + o.totalCents, 0);

  const metrics = [
    {
      label: "CATALOGUED FILMS",
      value: films.length,
      detail: "1 Featured on Masthead",
      icon: Film,
      href: "/admin/films",
    },
    {
      label: "STORYBOOK FOLIOS",
      value: books.length,
      detail: "3 Hand-Tipped Spreads",
      icon: BookOpen,
      href: "/admin/books",
    },
    {
      label: "SHOP ARTIFACTS",
      value: products.length,
      detail: "12-Emotions Vinyl Active",
      icon: ShoppingBag,
      href: "/admin/products",
    },
    {
      label: "REGISTERED DISPATCHES",
      value: orders.length,
      detail: `$${(totalRevenueCents / 100).toFixed(2)} USD Gross`,
      icon: Package,
      href: "/admin/orders",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            STUDIO ADMINISTRATION
          </span>
          <h1 className="font-display text-2xl sm:text-3xl text-[var(--color-text)] mt-0.5">
            Archivist Command Center
          </h1>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">
            Server-side authorization enforced on all catalog records, orders, and private assets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/films"
            className="px-3.5 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold flex items-center gap-1.5 hover:bg-white transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Archival Entry</span>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              key={m.label}
              href={m.href}
              className="p-5 rounded-md border border-[var(--color-border)] bg-[#111114] hover:border-[#44444a] transition-all block group"
            >
              <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)]">
                <span>{m.label}</span>
                <Icon className="w-4 h-4 group-hover:text-[#ece7d5] transition-colors" />
              </div>
              <div className="text-3xl font-bold font-mono-archive text-[#ece7d5] mt-2">
                {m.value}
              </div>
              <div className="text-[11px] font-mono-archive text-[var(--color-text-dim)] mt-1">
                {m.detail}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Table */}
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4">
        <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20]">
          Latest Customer Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono-archive">
            <thead>
              <tr className="border-b border-[#1c1c20] text-[var(--color-text-dim)]">
                <th className="py-2.5">ORDER REF</th>
                <th className="py-2.5">CUSTOMER EMAIL</th>
                <th className="py-2.5">TOTAL</th>
                <th className="py-2.5">STATUS</th>
                <th className="py-2.5">DATE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c1c20]">
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-[#14151a]">
                  <td className="py-3 font-semibold text-[#ece7d5]">{o.orderNumber}</td>
                  <td className="py-3 text-[var(--color-text-muted)]">{o.guestEmail}</td>
                  <td className="py-3 text-[#ece7d5]">
                    ${(o.totalCents / 100).toFixed(2)} USD
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px]">
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-[var(--color-text-dim)]">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
