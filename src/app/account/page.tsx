import Link from "next/link";
import { initialOrders } from "@/lib/data/mock-db";
import { User, Package, Download, Shield, Clock, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Account & Archive Vault — Frogman Films",
};

export default function AccountPage() {
  const orders = initialOrders;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 space-y-2">
        <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          USER PROFILE // ARCHIVE ACCESS
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
          Collector Account
        </h1>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage your registered postal dispatches, historical order snapshots, and
          protected digital folio downloads.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4">
            <div className="w-16 h-16 rounded-full border border-[#29292d] bg-[#070709] flex items-center justify-center font-display text-xl text-[#ece7d5]">
              JM
            </div>
            <div>
              <h2 className="font-display text-xl text-[var(--color-text)]">
                Julian Morrow
              </h2>
              <div className="text-xs font-mono-archive text-[var(--color-text-dim)]">
                collector@reedbed.org
              </div>
            </div>

            <div className="pt-3 border-t border-[#1c1c20] space-y-2 text-xs font-mono-archive">
              <div className="flex justify-between text-[var(--color-text-dim)]">
                <span>MEMBERSHIP TIER</span>
                <span className="text-[#ece7d5]">ARCHIVE PATRON</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-dim)]">
                <span>ENROLLED DATE</span>
                <span>OCT 2026</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-md border border-[#1c1c20] bg-[#0c0c0f] space-y-3">
            <h4 className="text-xs font-mono-archive uppercase text-[var(--color-text-dim)]">
              Quick Shortcuts
            </h4>
            <div className="space-y-2 text-xs font-mono-archive">
              <Link
                href="/account/orders"
                className="flex items-center justify-between p-2 rounded hover:bg-[#14151a] text-[var(--color-text)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-emerald-400" />
                  <span>Order Ledger</span>
                </div>
                <span>→</span>
              </Link>
              <Link
                href="/account/downloads"
                className="flex items-center justify-between p-2 rounded hover:bg-[#14151a] text-[var(--color-text)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Digital Vault</span>
                </div>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#1c1c20]">
              <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)]">
                Recent Orders Ledger
              </h3>
              <Link
                href="/account/orders"
                className="text-xs font-mono-archive text-[var(--color-text-dim)] hover:text-[#ece7d5]"
              >
                View Full History ({orders.length}) →
              </Link>
            </div>

            <div className="space-y-4">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-4 rounded border border-[#1c1c20] bg-[#0c0c0f] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-archive">
                    <span className="font-bold text-[#ece7d5]">{ord.orderNumber}</span>
                    <span className="text-[var(--color-text-dim)]">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        ord.status === "PAID"
                          ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                          : "bg-blue-950/60 text-blue-400 border border-blue-900/50"
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    {ord.items.map((i, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-[var(--color-text-muted)]"
                      >
                        <span>
                          {i.title} {i.variantName ? `(${i.variantName})` : ""} × {i.quantity}
                        </span>
                        <span>${(i.totalPriceCents / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#1c1c20] flex justify-between items-center text-xs font-mono-archive">
                    <span className="text-[var(--color-text-dim)]">
                      Total: ${(ord.totalCents / 100).toFixed(2)} USD
                    </span>
                    <Link
                      href={`/checkout/success?order=${ord.orderNumber}`}
                      className="text-amber-300 hover:underline flex items-center gap-1"
                    >
                      <span>Archival Receipt</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
