"use server";

import { prisma } from "@/lib/db/prisma";
import { initialProducts, initialBooks } from "@/lib/data/mock-db";
import { CartItem, ProductFormat } from "@/lib/types";
import { paymentAdapter } from "@/lib/payments/adapter";

export interface CheckoutResult {
  success: boolean;
  orderNumber?: string;
  checkoutUrl?: string;
  isTestMode?: boolean;
  error?: string;
}

export async function processCheckout(formData: {
  guestEmail: string;
  fullName: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
  cartItems: CartItem[];
}): Promise<CheckoutResult> {
  try {
    if (!formData.cartItems || formData.cartItems.length === 0) {
      return { success: false, error: "Cart is empty." };
    }

    if (!formData.guestEmail || !formData.fullName) {
      return { success: false, error: "Please provide valid customer details." };
    }

    // Server-side Price & Stock Validation
    // Never trust client prices!
    let validatedSubtotalCents = 0;
    const validatedSnapshotItems: {
      productId: string;
      title: string;
      sku: string;
      variantName?: string;
      quantity: number;
      unitPriceCents: number;
      totalPriceCents: number;
      currency: string;
      format: ProductFormat;
    }[] = [];

    for (const item of formData.cartItems) {
      // Find authentic product or book server-side
      const product = initialProducts.find((p) => p.id === item.productId);
      const book = initialBooks.find((b) => b.id === item.productId);

      let canonicalPriceCents = 0;
      let canonicalTitle = item.title;
      let canonicalSku = item.sku;
      let canonicalStock = 99;
      let canonicalFormat: ProductFormat = "PHYSICAL";

      if (product) {
        canonicalTitle = product.title;
        canonicalPriceCents = product.priceCents;
        canonicalStock = product.stock;
        canonicalSku = product.sku;
        canonicalFormat = product.format;

        if (item.variantId && product.variants) {
          const variant = product.variants.find((v) => v.id === item.variantId);
          if (variant) {
            canonicalPriceCents = variant.priceCents;
            canonicalSku = variant.sku;
            canonicalStock = variant.stock;
          }
        }
      } else if (book) {
        canonicalTitle = book.title;
        canonicalPriceCents = book.priceCents;
        canonicalStock = book.stock;
        canonicalSku = book.folioId;
        canonicalFormat = book.format;
      } else {
        return {
          success: false,
          error: `Item "${item.title}" is no longer available in the studio archive.`,
        };
      }

      if (item.quantity > canonicalStock) {
        return {
          success: false,
          error: `Requested quantity for "${canonicalTitle}" exceeds available archive stock (${canonicalStock}).`,
        };
      }

      const lineTotalCents = canonicalPriceCents * item.quantity;
      validatedSubtotalCents += lineTotalCents;

      validatedSnapshotItems.push({
        productId: item.productId,
        title: canonicalTitle,
        sku: canonicalSku,
        variantName: item.variantName,
        quantity: item.quantity,
        unitPriceCents: canonicalPriceCents,
        totalPriceCents: lineTotalCents,
        currency: "USD",
        format: canonicalFormat,
      });
    }

    const taxCents = Math.round(validatedSubtotalCents * 0.08); // 8% standard tax
    const shippingCents = validatedSubtotalCents > 6000 ? 0 : 500; // Free shipping over $60
    const totalCents = validatedSubtotalCents + taxCents + shippingCents;

    // Generate Order Number
    const orderNumber = `FF-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    // If PostgreSQL Prisma is active, persist to database
    try {
      if (process.env.DATABASE_URL) {
        await prisma.order.create({
          data: {
            orderNumber,
            guestEmail: formData.guestEmail,
            status: OrderStatus.PENDING,
            currency: "USD",
            subtotalCents: validatedSubtotalCents,
            taxCents,
            shippingCents,
            totalCents,
            shippingAddress: {
              fullName: formData.fullName,
              addressLine1: formData.addressLine1,
              city: formData.city,
              postalCode: formData.postalCode,
              country: formData.country,
            },
            items: {
              create: validatedSnapshotItems.map((item) => ({
                snapshotTitle: item.title,
                snapshotSku: item.sku,
                snapshotVariant: item.variantName,
                quantity: item.quantity,
                unitPriceCents: item.unitPriceCents,
                totalPriceCents: item.totalPriceCents,
                currency: item.currency,
                format: item.format,
              })),
            },
          },
        });
      }
    } catch (dbErr) {
      console.warn("Prisma order persistence bypassed (DB initialization mode):", dbErr);
    }

    // Call payment provider adapter
    const paymentSession = await paymentAdapter.createCheckoutSession({
      orderNumber,
      amountCents: totalCents,
      currency: "USD",
      customerEmail: formData.guestEmail,
      customerName: formData.fullName,
      lineItems: validatedSnapshotItems,
      successUrl: `/checkout/success?order=${orderNumber}`,
      cancelUrl: `/checkout/cancel`,
    });

    return {
      success: true,
      orderNumber,
      checkoutUrl: paymentSession.checkoutUrl,
      isTestMode: paymentSession.isTestMode,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "An unexpected error occurred during checkout.",
    };
  }
}
