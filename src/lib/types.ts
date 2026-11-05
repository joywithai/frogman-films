export type Role = "USER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "PAYMENT_PENDING"
  | "PAID"
  | "FULFILLED"
  | "SHIPPED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus =
  | "INITIALIZED"
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "REFUNDED";

export type ProductFormat = "PHYSICAL" | "DIGITAL" | "HYBRID";

export interface FilmCredits {
  director: string;
  story: string;
  animation: string[];
  music: string;
  soundDesign: string;
}

export interface FilmItem {
  id: string;
  slug: string;
  archiveId: string;
  title: string;
  synopsis: string;
  director: string;
  releaseYear: number;
  runtimeMins: number;
  aspectRatio: string;
  isFeatured: boolean;
  isPublic: boolean;
  posterUrl: string;
  backdropUrl?: string;
  videoAsset?: {
    provider: string;
    playbackUrl?: string;
    durationSec?: number;
    status: string;
  };
  tags: string[];
  credits?: FilmCredits;
}

export interface BookSamplePage {
  pageNumber: number;
  title: string;
  caption: string;
  imageUrl: string;
}

export interface BookItem {
  id: string;
  slug: string;
  folioId: string;
  title: string;
  subtitle?: string;
  creator: string;
  synopsis: string;
  format: ProductFormat;
  pageCount: number;
  dimensions?: string;
  priceCents: number;
  currency: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  coverUrl: string;
  samplePages?: BookSamplePage[];
  privateFile?: string;
}

export interface ProductVariantItem {
  id: string;
  name: string;
  sku: string;
  priceCents: number;
  stock: number;
  isAvailable: boolean;
}

export interface ProductItem {
  id: string;
  slug: string;
  sku: string;
  title: string;
  subtitle?: string;
  description: string;
  priceCents: number;
  currency: string;
  stock: number;
  isAvailable: boolean;
  isFeatured: boolean;
  format: ProductFormat;
  category: {
    id: string;
    slug: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
    altText: string;
  }[];
  variants?: ProductVariantItem[];
}

export interface CartItem {
  productId: string;
  slug: string;
  title: string;
  sku: string;
  variantId?: string;
  variantName?: string;
  priceCents: number;
  currency: string;
  quantity: number;
  format: ProductFormat;
  imageUrl: string;
  availableStock: number;
}

export interface OrderSnapshotItem {
  productId: string;
  title: string;
  sku: string;
  variantName?: string;
  quantity: number;
  unitPriceCents: number;
  totalPriceCents: number;
  currency: string;
  format: ProductFormat;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  userId?: string;
  guestEmail?: string;
  status: OrderStatus;
  currency: string;
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  items: OrderSnapshotItem[];
  shippingAddress?: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}
