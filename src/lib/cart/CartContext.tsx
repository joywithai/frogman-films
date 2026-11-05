"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem } from "@/lib/types";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotalCents: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("frogman_cart");
      if (stored) {
        setCart(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Unable to read stored cart:", e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("frogman_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Unable to save cart:", e);
    }
  }, [cart, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === newItem.productId &&
          item.variantId === newItem.variantId
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        const nextQty = Math.min(
          existing.quantity + newItem.quantity,
          newItem.availableStock || 99
        );
        updated[existingIndex] = { ...existing, quantity: nextQty };
        return updated;
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId)
      )
    );
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    variantId?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, quantity: Math.min(quantity, item.availableStock) };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalCents = cart.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotalCents,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
