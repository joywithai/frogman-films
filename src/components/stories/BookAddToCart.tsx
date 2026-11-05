"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/cart/CartContext";
import { BookItem } from "@/lib/types";
import { ShoppingBag, Check } from "lucide-react";

export function BookAddToCart({ book }: { book: BookItem }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      productId: book.id,
      slug: book.slug,
      title: book.title,
      sku: book.folioId,
      priceCents: book.priceCents,
      currency: book.currency,
      quantity: 1,
      format: book.format,
      imageUrl: book.coverUrl,
      availableStock: book.stock,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={book.stock <= 0}
      className={`w-full py-3 px-6 rounded-sm text-sm font-mono-archive font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
        added
          ? "bg-emerald-600 text-white"
          : book.stock > 0
          ? "bg-[#ece7d5] text-[#070709] hover:bg-white"
          : "bg-[#29292d] text-[#737176] cursor-not-allowed"
      }`}
    >
      {added ? (
        <>
          <Check className="w-4 h-4" />
          <span>Folio Added to Bag</span>
        </>
      ) : book.stock > 0 ? (
        <>
          <ShoppingBag className="w-4 h-4" />
          <span>Add Folio Edition to Bag</span>
        </>
      ) : (
        <span>Archive Printing Exhausted</span>
      )}
    </button>
  );
}
