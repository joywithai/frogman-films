"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/CartContext";
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft, ShieldCheck } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotalCents, clearCart } =
    useCart();

  const taxCents = Math.round(subtotalCents * 0.08); // 8% estimated tax
  const shippingCents = subtotalCents === 0 ? 0 : subtotalCents > 6000 ? 0 : 500;
  const totalCents = subtotalCents + taxCents + shippingCents;

  if (cart.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full border border-[#29292d] bg-[#111114] mx-auto flex items-center justify-center text-[var(--color-text-dim)]">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
          Your Archive Bag is Empty
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-md mx-auto leading-relaxed">
          You haven&apos;t added any storybooks, fine art prints, or sticker sheets
          yet. Explore our catalogue to discover character editions.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link
            href="/shop"
            className="px-6 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive uppercase font-medium hover:bg-white transition-colors"
          >
            Browse Studio Shop
          </Link>
          <Link
            href="/stories"
            className="px-6 py-2.5 rounded-sm border border-[var(--color-border)] text-xs font-mono-archive uppercase font-medium hover:bg-[#14151a] transition-colors"
          >
            Explore Folios
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="border-b border-[var(--color-border)] pb-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            COMMERCE DISPATCH // ARCHIVE BAG
          </span>
          <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)] mt-1">
            Order Review
          </h1>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-mono-archive text-[var(--color-text-dim)] hover:text-red-400 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Line Items */}
        <div className="lg:col-span-8 space-y-4">
          <div className="divide-y divide-[#1c1c20] border border-[var(--color-border)] rounded-md bg-[#111114]">
            {cart.map((item) => (
              <div
                key={`${item.productId}-${item.variantId || ""}`}
                className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded bg-[#070709] border border-[#29292d] p-2 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                      {item.sku} // {item.format}
                    </div>
                    <h3 className="font-display text-lg text-[var(--color-text)]">
                      {item.title}
                    </h3>
                    {item.variantName && (
                      <div className="text-xs text-[var(--color-text-dim)] font-mono-archive">
                        Variant: {item.variantName}
                      </div>
                    )}
                    <div className="text-xs font-mono-archive text-[#ece7d5] mt-1 font-semibold">
                      ${(item.priceCents / 100).toFixed(2)} USD each
                    </div>
                  </div>
                </div>

                {/* Quantity & Removal Controls */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6">
                  <div className="flex items-center border border-[var(--color-border)] rounded bg-[#070709] h-9">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity - 1,
                          item.variantId
                        )
                      }
                      className="px-2.5 h-full text-[var(--color-text-muted)] hover:text-white"
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-xs font-mono-archive font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(
                          item.productId,
                          item.quantity + 1,
                          item.variantId
                        )
                      }
                      disabled={item.quantity >= item.availableStock}
                      className="px-2.5 h-full text-[var(--color-text-muted)] hover:text-white disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-mono-archive text-sm font-semibold text-[#ece7d5]">
                    ${((item.priceCents * item.quantity) / 100).toFixed(2)}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeFromCart(item.productId, item.variantId)}
                    aria-label={`Remove ${item.title}`}
                    className="text-[var(--color-text-dim)] hover:text-red-400 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link
              href="/shop"
              className="text-xs font-mono-archive text-[var(--color-text-dim)] hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>CONTINUE EXPLORING ARCHIVES</span>
            </Link>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
            <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20]">
              Dispatch Summary
            </h3>

            <div className="space-y-3 text-xs font-mono-archive">
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Subtotal</span>
                <span>${(subtotalCents / 100).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Estimated Postal Tax</span>
                <span>${(taxCents / 100).toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between text-[var(--color-text-muted)]">
                <span>Archival Shipping</span>
                <span>
                  {shippingCents === 0
                    ? "FREE (Over $60)"
                    : `$${(shippingCents / 100).toFixed(2)} USD`}
                </span>
              </div>
              <div className="pt-3 border-t border-[#1c1c20] flex justify-between text-sm font-semibold text-[#ece7d5]">
                <span>Total Due</span>
                <span>${(totalCents / 100).toFixed(2)} USD</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full py-3 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors shadow-md"
            >
              <span>Proceed to Dispatch Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-[11px] font-mono-archive text-[var(--color-text-dim)] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Server-side stock and price revalidation guaranteed.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
