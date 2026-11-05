import { NextResponse } from "next/server";
import { storageAdapter } from "@/lib/storage/adapter";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order");
    const key = searchParams.get("key");
    const expires = searchParams.get("expires");
    const sig = searchParams.get("sig");

    if (!orderId || !key || !expires || !sig) {
      return NextResponse.json(
        { error: "Invalid digital entitlement request parameters" },
        { status: 400 }
      );
    }

    const expiresAt = parseInt(expires, 10);
    const isValid = storageAdapter.verifyDownloadSignature(
      orderId,
      key,
      expiresAt,
      sig
    );

    if (!isValid) {
      return NextResponse.json(
        {
          error:
            "Protected digital download token is invalid or has expired. Please refresh your entitlement in your account dashboard.",
        },
        { status: 403 }
      );
    }

    // In production with S3 / Cloudflare R2:
    // Stream protected file binary or return temporary presigned S3 redirect.
    // For local archive demonstration, return a verified mock file stream header:
    const mockPdfBuffer = Buffer.from(
      `%PDF-1.4\n% Frogman Films Protected Digital Edition\n% Order: ${orderId}\n% File: ${key}\n%%EOF`
    );

    return new Response(mockPdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="frogman-digital-folio-${orderId}.pdf"`,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
