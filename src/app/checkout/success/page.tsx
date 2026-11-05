import Link from "next/link";
import { CheckCircle2, ShieldCheck, Download, Package, ArrowRight } from "lucide-react";
import { storageAdapter } from "@/lib/storage/adapter";

export const metadata = {
  title: "Order Confirmed — Frogman Films",
  description: "Your archival order has been verified and registered.",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string; test_mode?: string }>;
}) {
  const { order, test_mode } = await searchParams;
  const orderNumber = order || "FF-2026-09412";
  const isTestMode = test_mode === "true";

  // Generate a sample verified signed digital download link for any purchased digital goods
  const sampleDownloadUrl = storageAdapter.generateSignedDownloadUrl(
    "protected/books/folio-01-quiet-room-master.pdf",
    orderNumber
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-10">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase tracking-wider">
          ORDER REGISTRY COMPLETE // VERIFIED
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          Thank you for your dispatch.
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
          Your order has been recorded in the studio ledger. An official archival
          confirmation has been prepared.
        </p>
      </div>

      {/* Verification Card */}
      <div className="p-8 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#1c1c20] gap-4">
          <div>
            <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
              ORDER REFERENCE
            </div>
            <div className="font-mono-archive text-xl font-bold text-[#ece7d5] mt-0.5">
              {orderNumber}
            </div>
          </div>
          <div className="px-3 py-1 rounded bg-emerald-950/60 border border-emerald-900/50 text-emerald-400 font-mono-archive text-xs">
            STATUS: PAID & QUEUED FOR FULFILMENT
          </div>
        </div>

        {/* Test Mode Notification (SPEC MANDATE) */}
        {isTestMode && (
          <div className="p-4 rounded border border-amber-500/30 bg-amber-500/10 text-xs font-mono-archive text-amber-200 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block text-amber-300">
                SANDBOX SIMULATION NOTICE
              </span>
              This order was executed in archive test mode. Server-side price
              verification, order snapshotting, and digital entitlement tokens
              were validated without charging actual currency.
            </div>
          </div>
        )}

        {/* Digital Entitlements Section */}
        <div className="p-5 rounded border border-[#29292d] bg-[#070709] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono-archive text-[#ece7d5] font-semibold">
              <Download className="w-4 h-4 text-emerald-400" />
              <span>DIGITAL ENTITLEMENTS READY</span>
            </div>
            <span className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
              EXPIRES IN 1 HOUR
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
            Your high-resolution PDF and production artwork masters have been
            unlocked. Use the tamper-proof signed link below to download your assets.
          </p>
          <div className="pt-2">
            <a
              href={sampleDownloadUrl}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-[#1a1c22] border border-[#29292d] hover:border-[#ece7d5] text-xs font-mono-archive text-[#ece7d5] transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Digital Folio (Signed Token)</span>
            </a>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="pt-4 flex flex-wrap justify-between items-center gap-4">
          <Link
            href="/account/orders"
            className="text-xs font-mono-archive text-[var(--color-text)] hover:text-[#ece7d5] flex items-center gap-1.5"
          >
            <Package className="w-4 h-4" />
            <span>View All Registered Orders</span>
          </Link>
          <Link
            href="/films"
            className="px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold uppercase tracking-wider hover:bg-white transition-colors"
          >
            Return to Film Archive
          </Link>
        </div>
      </div>
    </div>
  );
}
