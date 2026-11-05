// Secure Storage & Digital Entitlements Adapter for Frogman Films
// Spec: "Keep digital book files private. Grant protected download links only after verified purchase."

import crypto from "crypto";

export interface EntitlementTokenPayload {
  orderId: string;
  productId?: string;
  fileKey: string;
  expiresAt: number;
}

export class StorageAdapter {
  private secretKey: string;

  constructor() {
    this.secretKey =
      process.env.AUTH_SECRET || "frogman-archive-secure-key-default-dev";
  }

  /**
   * Generates a tamper-proof time-limited signed URL for private files
   */
  generateSignedDownloadUrl(fileKey: string, orderId: string, expiresInSec = 3600): string {
    const expiresAt = Math.floor(Date.now() / 1000) + expiresInSec;
    const payload = `${orderId}:${fileKey}:${expiresAt}`;
    const signature = crypto
      .createHmac("sha256", this.secretKey)
      .update(payload)
      .digest("hex");

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
    return `${siteUrl}/api/downloads?order=${orderId}&key=${encodeURIComponent(
      fileKey
    )}&expires=${expiresAt}&sig=${signature}`;
  }

  /**
   * Verifies the authenticity and expiration of a digital download request
   */
  verifyDownloadSignature(
    orderId: string,
    fileKey: string,
    expiresAt: number,
    signature: string
  ): boolean {
    const now = Math.floor(Date.now() / 1000);
    if (now > expiresAt) {
      return false; // Expired
    }

    const payload = `${orderId}:${fileKey}:${expiresAt}`;
    const expectedSig = crypto
      .createHmac("sha256", this.secretKey)
      .update(payload)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedSig, "hex")
    );
  }
}

export const storageAdapter = new StorageAdapter();
