"use client";

import React, { useState } from "react";
import { ProductItem, ProductVariantItem } from "@/lib/types";
import { useCart } from "@/lib/cart/CartContext";
import { ShoppingBag, Check, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export function ProductDetailView({ product }: { product: ProductItem }) {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariantItem | null>(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const currentPriceCents = selectedVariant
    ? selectedVariant.priceCents
    : product.priceCents;
  const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
  const currentSku = selectedVariant ? selectedVariant.sku : product.sku;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      slug: product.slug,
      title: product.title,
      sku: currentSku,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      priceCents: currentPriceCents,
      currency: product.currency,
      quantity,
      format: product.format,
      imageUrl: product.images[0]?.url || "/images/prod-mug.svg",
      availableStock: currentStock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Product Gallery */}
      <div className="lg:col-span-6 space-y-4">
        <div className="w-full aspect-[4/3] rounded-md border border-[var(--color-border)] bg-[#070709] p-6 flex items-center justify-center overflow-hidden shadow-2xl relative">
          <img
            src={product.images[activeImageIndex]?.url || product.images[0]?.url || "/images/prod-mug.svg"}
            alt={product.images[activeImageIndex]?.altText || product.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-[#070709]/80 border border-[#29292d] text-[10px] font-mono-archive text-[#ece7d5]">
            {currentSku}
          </div>
        </div>

        {/* Thumbnail row if multiple images */}
        {product.images.length > 1 && (
          <div className="flex gap-3">
            {product.images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`w-20 aspect-square rounded border p-1 bg-[#111114] overflow-hidden transition-all ${
                  activeImageIndex === idx
                    ? "border-[#ece7d5]"
                    : "border-[var(--color-border)] opacity-60 hover:opacity-100"
                }`}
              >
                <img src={img.url} alt={img.altText} className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Column: Narrative, Variants, Quantity & Add to Cart */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <div className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase tracking-wider mb-1.5">
            {product.category.name} // {product.format} EDITION
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
            {product.title}
          </h1>
          {product.subtitle && (
            <p className="font-serif italic text-sm text-[var(--color-text-dim)] mt-1">
              {product.subtitle}
            </p>
          )}
        </div>

        {/* Price & Stock Display */}
        <div className="flex items-baseline gap-4 pt-1">
          <span className="text-3xl font-bold font-mono-archive text-[#ece7d5]">
            ${(currentPriceCents / 100).toFixed(2)} USD
          </span>
          <span
            className={`text-xs font-mono-archive px-2.5 py-0.5 rounded ${
              currentStock > 0
                ? "bg-emerald-950/60 text-emerald-400 border border-emerald-900/50"
                : "bg-red-950/60 text-red-400 border border-red-900/50"
            }`}
          >
            {currentStock > 0 ? `In Stock (${currentStock} units)` : "Sold Out"}
          </span>
        </div>

        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
          {product.description}
        </p>

        {/* Variant Selector */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono-archive uppercase text-[var(--color-text-dim)]">
              Select Archival Variant:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {product.variants.map((v) => {
                const isSelected = selectedVariant?.id === v.id;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setSelectedVariant(v);
                      setQuantity(1);
                    }}
                    className={`p-3 rounded-sm border text-left text-xs font-mono-archive transition-all ${
                      isSelected
                        ? "border-[#ece7d5] bg-[#1a1c22] text-[#ece7d5]"
                        : "border-[var(--color-border)] bg-[#111114] text-[var(--color-text-muted)] hover:border-[#44444a]"
                    }`}
                  >
                    <div className="font-medium text-sm">{v.name}</div>
                    <div className="text-[11px] text-[var(--color-text-dim)] mt-1">
                      ${(v.priceCents / 100).toFixed(2)} USD • Stock: {v.stock}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity and Add to Cart Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center border border-[var(--color-border)] rounded-sm bg-[#111114] h-12">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="px-3.5 h-full text-[var(--color-text-muted)] hover:text-white disabled:opacity-30"
            >
              -
            </button>
            <span className="w-10 text-center font-mono-archive text-sm font-semibold">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
              disabled={quantity >= currentStock}
              className="px-3.5 h-full text-[var(--color-text-muted)] hover:text-white disabled:opacity-30"
            >
              +
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={currentStock <= 0}
            className={`flex-1 h-12 px-6 rounded-sm text-sm font-mono-archive font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
              added
                ? "bg-emerald-600 text-white"
                : currentStock > 0
                ? "bg-[#ece7d5] text-[#070709] hover:bg-white"
                : "bg-[#29292d] text-[#737176] cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Archive Bag</span>
              </>
            ) : currentStock > 0 ? (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </>
            ) : (
              <span>Out of Stock</span>
            )}
          </button>
        </div>

        {/* Shipping & Archival Care Notes */}
        <div className="pt-6 border-t border-[#1c1c20] space-y-3 text-xs font-mono-archive text-[var(--color-text-dim)]">
          <div className="flex items-center gap-2.5">
            <Truck className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Dispatched in reinforced cardboard mailers from studio headquarters.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>Authentic Frogman Films seal on every physical packaging unit.</span>
          </div>
          <div className="flex items-center gap-2.5">
            <RotateCcw className="w-4 h-4 text-[var(--color-text-muted)]" />
            <span>30-day archival condition return guarantee.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
