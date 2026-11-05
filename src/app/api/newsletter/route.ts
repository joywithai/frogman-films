import { NextResponse } from "next/server";
import { emailAdapter } from "@/lib/email/adapter";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const isConfigured = emailAdapter.isEmailServiceConfigured();

    if (!isConfigured) {
      return NextResponse.json({
        configured: false,
        message:
          "Email provider not configured in environment. In accordance with Frogman Films specifications, newsletter subscriptions are disabled until real provider credentials (EMAIL_API_KEY) are active.",
      });
    }

    // When configured, send confirmation or register in database/provider
    await emailAdapter.sendEmail({
      to: email,
      subject: "Welcome to Frogman Films Dispatch",
      html: "<p>Thank you for subscribing to the studio dispatch.</p>",
    });

    return NextResponse.json({
      configured: true,
      message: "Subscribed successfully.",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
