"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import { processCheckout } from "@/server/actions/checkout";
import { paymentAdapter } from "@/lib/payments/adapter";
import {
  ShieldAlert,
  Lock,
  ArrowRight,
  Truck,
  CreditCard,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function CheckoutPage() {
  const { cart, subtotalCents, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "Julian Morrow",
    guestEmail: "collector@reedbed.org",
    addressLine1: "42 Willow Creek Lane",
    city: "Cambridge",
    postalCode: "02138",
    country: "United States",
  });

  const taxCents = Math.round(subtotalCents * 0.08);
  const shippingCents = subtotalCents === 0 ? 0 : subtotalCents > 6000 ? 0 : 500;
  const totalCents = subtotalCents + taxCents + shippingCents;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await processCheckout({
        ...formData,
        cartItems: cart,
      });

      if (result.success && result.checkoutUrl) {
        // Clear local cart upon verified checkout initiation
        clearCart();
        router.push(result.checkoutUrl);
      } else {
        setError(result.error || "Unable to proceed with checkout.");
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Folio Checkout Masthead */}
      <div className="border-b border-[var(--color-border)] pb-6 space-y-2">
        <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          COMMERCE DISPATCH // STEP 02
        </span>
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
          Archival Checkout & Dispatch
        </h1>
      </div>

      {/* Explicit Sandbox Test Mode Banner (SPEC MANDATE) */}
      <div className="p-4 rounded-md border border-amber-500/30 bg-amber-500/10 text-xs font-mono-archive text-amber-200/90 flex items-start gap-3">
        <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block text-amber-300">
            PAYMENT SYSTEM STATUS: SANDBOX TEST MODE ACTIVE
          </span>
          No real financial charges will occur. In compliance with the Frogman Films
          specification, live provider keys (Stripe / SSLCOMMERZ / bKash) are securely
          managed server-side and simulated in test mode.
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-md border border-red-500/30 bg-red-500/10 text-xs font-mono-archive text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Shipping & Customer Details */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span>1. Customer & Postal Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono-archive">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[var(--color-text-dim)]">Full Recipient Name</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[var(--color-text-dim)]">Dispatch Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.guestEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, guestEmail: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[var(--color-text-dim)]">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.addressLine1}
                  onChange={(e) =>
                    setFormData({ ...formData, addressLine1: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[var(--color-text-dim)]">City / Township</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[var(--color-text-dim)]">Postal Code</label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[var(--color-text-dim)]">Country</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[var(--color-text-muted)]" />
              <span>2. Payment Provider Selection</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded border border-[#ece7d5] bg-[#1a1c22] text-xs font-mono-archive cursor-pointer">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentProvider"
                    defaultChecked
                    className="accent-[#ece7d5]"
                  />
                  <div>
                    <span className="text-[#ece7d5] font-semibold block">
                      ARCHIVE TEST SANDBOX (SIMULATED SECURE PAYMENT)
                    </span>
                    <span className="text-[var(--color-text-dim)] text-[11px]">
                      Demonstrates server-side verification, order snapshotting & digital entitlement grants.
                    </span>
                  </div>
                </div>
                <Lock className="w-4 h-4 text-emerald-400" />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded border border-[#29292d] bg-[#0c0c0f] text-xs font-mono-archive opacity-60">
                <div className="flex items-center gap-3">
                  <input type="radio" name="paymentProvider" disabled />
                  <div>
                    <span className="text-[var(--color-text-muted)] block">
                      STRIPE (CREDIT / DEBIT / APPLE PAY)
                    </span>
                    <span className="text-[var(--color-text-dim)] text-[11px]">
                      Live keys unconfigured in current environment.
                    </span>
                  </div>
                </div>
              </label>

              <label className="flex items-center justify-between p-3.5 rounded border border-[#29292d] bg-[#0c0c0f] text-xs font-mono-archive opacity-60">
                <div className="flex items-center gap-3">
                  <input type="radio" name="paymentProvider" disabled />
                  <div>
                    <span className="text-[var(--color-text-muted)] block">
                      BANGLADESH REGIONAL (SSLCOMMERZ / BKASH)
                    </span>
                    <span className="text-[var(--color-text-dim)] text-[11px]">
                      Merchant credentials unconfigured in current environment.
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Snapshot & Completion */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20]">
              Dispatch Summary ({cart.length} items)
            </h3>

            <div className="divide-y divide-[#1c1c20] max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={`${item.productId}-${item.variantId || ""}`}
                  className="py-3 flex justify-between items-center text-xs font-mono-archive"
                >
                  <div>
                    <div className="text-[var(--color-text)] font-medium">
                      {item.title}
                    </div>
                    <div className="text-[var(--color-text-dim)] text-[10px]">
                      Qty: {item.quantity} × ${(item.priceCents / 100).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-[#ece7d5] font-semibold">
                    ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs font-mono-archive pt-3 border-t border-[#1c1c20]">
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Subtotal</span>
                <span>${(subtotalCents / 100).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Postal Tax</span>
                <span>${(taxCents / 100).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Archival Packaging & Shipping</span>
                <span>
                  {shippingCents === 0
                    ? "FREE"
                    : `$${(shippingCents / 100).toFixed(2)} USD`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#1c1c20] flex justify-between text-base font-semibold text-[#ece7d5]">
                <span>Total Due</span>
                <span>${(totalCents / 100).toFixed(2)} USD</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full py-3.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Stock & Initializing...</span>
                </>
              ) : (
                <>
                  <span>Complete Verified Order</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-[11px] font-mono-archive text-[var(--color-text-dim)] text-center">
              Server-side order snapshot • Idempotent transaction
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
