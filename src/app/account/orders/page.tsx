import Link from "next/link";
import { initialOrders } from "@/lib/data/mock-db";
import { ArrowLeft, Package, ExternalLink, Calendar, MapPin } from "lucide-react";

export const metadata = {
  title: "Order History — Frogman Films",
};

export default function AccountOrdersPage() {
  const orders = initialOrders;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] pb-4 border-b border-[#1c1c20]">
        <Link
          href="/account"
          className="hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ACCOUNT OVERVIEW</span>
        </Link>
        <span>TOTAL ORDERS: {orders.length}</span>
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
          Historical Orders Ledger
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          All order items, pricing snapshots, and dispatch records are preserved permanently.
        </p>
      </div>

      <div className="space-y-6">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#1c1c20]">
              <div className="space-y-1">
                <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
                  ORDER REFERENCE
                </div>
                <div className="font-mono-archive text-lg font-bold text-[#ece7d5]">
                  {ord.orderNumber}
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono-archive">
                <span className="flex items-center gap-1.5 text-[var(--color-text-dim)]">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(ord.createdAt).toLocaleDateString()}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded text-xs ${
                    ord.status === "PAID"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                      : "bg-blue-950/60 text-blue-400 border border-blue-900/50"
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            </div>

            {/* Line items snapshot */}
            <div className="divide-y divide-[#1c1c20]">
              {ord.items.map((item, idx) => (
                <div
                  key={idx}
                  className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-archive"
                >
                  <div>
                    <span className="text-[var(--color-text)] font-medium">
                      {item.title}
                    </span>
                    {item.variantName && (
                      <span className="text-[var(--color-text-dim)] ml-2">
                        [{item.variantName}]
                      </span>
                    )}
                    <div className="text-[10px] text-[var(--color-text-dim)]">
                      SKU: {item.sku} // FORMAT: {item.format}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[var(--color-text-muted)] mr-4">
                      Qty: {item.quantity} × ${(item.unitPriceCents / 100).toFixed(2)}
                    </span>
                    <span className="font-semibold text-[#ece7d5]">
                      ${(item.totalPriceCents / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Address and Financial Totals */}
            <div className="pt-4 border-t border-[#1c1c20] grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono-archive">
              {ord.shippingAddress && (
                <div className="space-y-1 text-[var(--color-text-dim)]">
                  <span className="font-semibold text-[var(--color-text)] block flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Postal Delivery Address:</span>
                  </span>
                  <div>{ord.shippingAddress.fullName}</div>
                  <div>{ord.shippingAddress.addressLine1}</div>
                  <div>
                    {ord.shippingAddress.city}, {ord.shippingAddress.postalCode}
                  </div>
                  <div>{ord.shippingAddress.country}</div>
                </div>
              )}

              <div className="space-y-1.5 text-right md:justify-self-end">
                <div className="flex justify-between md:justify-end gap-6 text-[var(--color-text-dim)]">
                  <span>Subtotal:</span>
                  <span>${(ord.subtotalCents / 100).toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between md:justify-end gap-6 text-[var(--color-text-dim)]">
                  <span>Postal Tax:</span>
                  <span>${(ord.taxCents / 100).toFixed(2)} USD</span>
                </div>
                <div className="flex justify-between md:justify-end gap-6 text-[var(--color-text-dim)]">
                  <span>Shipping:</span>
                  <span>${(ord.shippingCents / 100).toFixed(2)} USD</span>
                </div>
                <div className="pt-2 border-t border-[#1c1c20] flex justify-between md:justify-end gap-6 text-sm font-bold text-[#ece7d5]">
                  <span>Total Paid:</span>
                  <span>${(ord.totalCents / 100).toFixed(2)} USD</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
