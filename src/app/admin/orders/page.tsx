import { initialOrders } from "@/lib/data/mock-db";
import Link from "next/link";
import { Package, Truck, CheckCircle2, ExternalLink } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = initialOrders;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex justify-between items-center">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            FULFILMENT & DISPATCH LEDGER
          </span>
          <h1 className="font-display text-2xl text-[var(--color-text)] mt-0.5">
            Customer Orders & Shipments
          </h1>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((ord) => (
          <div
            key={ord.id}
            className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-[#1c1c20]">
              <div className="flex items-center gap-3">
                <span className="font-mono-archive text-base font-bold text-[#ece7d5]">
                  {ord.orderNumber}
                </span>
                <span className="text-xs text-[var(--color-text-dim)] font-mono-archive">
                  • {ord.guestEmail}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded text-xs font-mono-archive ${
                    ord.status === "PAID"
                      ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                      : "bg-blue-950/60 text-blue-400 border border-blue-900/50"
                  }`}
                >
                  {ord.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono-archive">
              <div className="space-y-1">
                <span className="text-[var(--color-text-dim)] block">ITEMS SNAPSHOT:</span>
                {ord.items.map((it, idx) => (
                  <div key={idx} className="text-[var(--color-text)]">
                    • {it.title} ({it.sku}) × {it.quantity} — ${(it.totalPriceCents / 100).toFixed(2)}
                  </div>
                ))}
              </div>

              {ord.shippingAddress && (
                <div className="space-y-1 text-[var(--color-text-dim)]">
                  <span className="block text-[var(--color-text)]">SHIPPING DESTINATION:</span>
                  <div>{ord.shippingAddress.fullName}</div>
                  <div>{ord.shippingAddress.addressLine1}</div>
                  <div>
                    {ord.shippingAddress.city}, {ord.shippingAddress.postalCode},{" "}
                    {ord.shippingAddress.country}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#1c1c20] flex justify-between items-center text-xs font-mono-archive">
              <span className="text-[var(--color-text-dim)]">
                TOTAL: ${(ord.totalCents / 100).toFixed(2)} USD
              </span>
              <button
                type="button"
                className="px-3 py-1.5 rounded-sm bg-[#1a1c22] border border-[#29292d] hover:border-[#ece7d5] text-[#ece7d5] transition-colors"
              >
                Update Fulfilment State
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
