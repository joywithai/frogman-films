import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingBag } from "lucide-react";

export const metadata = {
  title: "Checkout Cancelled — Frogman Films",
};

export default function CheckoutCancelPage() {
  return (
    <div className="w-full max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 mx-auto flex items-center justify-center">
        <XCircle className="w-8 h-8" />
      </div>

      <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
        TRANSACTION ABORTED
      </div>

      <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
        Checkout was not completed.
      </h1>

      <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
        Your bag contents remain safely preserved. No charges were made. You may
        resume checkout whenever you are ready.
      </p>

      <div className="pt-4 flex justify-center gap-4">
        <Link
          href="/cart"
          className="px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive uppercase font-semibold hover:bg-white transition-colors"
        >
          Review Bag & Retry
        </Link>
        <Link
          href="/shop"
          className="px-5 py-2.5 rounded-sm border border-[var(--color-border)] text-xs font-mono-archive uppercase font-medium hover:bg-[#14151a] transition-colors"
        >
          Return to Shop
        </Link>
      </div>
    </div>
  );
}
