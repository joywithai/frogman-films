"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "loading" | "success" | "unconfigured"
  >("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setNewsletterStatus("loading");
    // Spec rule: "Newsletter only if genuinely connected to an email provider."
    // Check if email provider is configured in environment
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.configured) {
        setNewsletterStatus("success");
      } else {
        setNewsletterStatus("unconfigured");
      }
    } catch {
      setNewsletterStatus("unconfigured");
    }
  };

  return (
    <footer className="border-t border-[var(--color-border)] bg-[#070709] text-[var(--color-text-muted)] text-sm">
      {/* Upper Colophon & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Studio Colophon Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full border border-[#29292d] bg-[#111114] flex items-center justify-center font-display text-xs font-semibold text-[#ece7d5]">
                FF
              </div>
              <span className="font-display text-lg tracking-wider font-semibold text-[var(--color-text)]">
                FROGMAN FILMS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--color-text-dim)] leading-relaxed max-w-sm">
              An independent studio dedicated to character-led animation,
              archival storytelling, and fine storybook publishing. Base
              background `#070709`. Hand-drawn with care.
            </p>
            <div className="text-[11px] font-mono-archive text-[var(--color-text-dim)]">
              COLOPHON // EDITED & PRODUCED UNDER FOLIO N° 00-26
            </div>
          </div>

          {/* Archive Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono-archive text-xs uppercase text-[var(--color-text)] tracking-wider">
              Archive
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/films" className="hover:text-[var(--color-text)] transition-colors">
                  Film Releases
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[var(--color-text)] transition-colors">
                  Storybook Folios
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[var(--color-text)] transition-colors">
                  Merchandise & Prints
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[var(--color-text)] transition-colors">
                  Studio Lore
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies & Assistance */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-mono-archive text-xs uppercase text-[var(--color-text)] tracking-wider">
              Assistance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/contact" className="hover:text-[var(--color-text)] transition-colors">
                  Dispatch & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/account/orders" className="hover:text-[var(--color-text)] transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <span className="text-[var(--color-text-dim)]">Shipping & Returns</span>
              </li>
              <li>
                <span className="text-[var(--color-text-dim)]">Privacy Policy</span>
              </li>
            </ul>
          </div>

          {/* Archival Dispatch (Newsletter with strict real provider check) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono-archive text-xs uppercase text-[var(--color-text)] tracking-wider">
              Studio Dispatch
            </h4>
            <p className="text-xs text-[var(--color-text-dim)] leading-relaxed">
              Periodic postal-style notifications regarding new films and folio
              printings.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="archivist@pond.org"
                  className="w-full px-3 py-2 bg-[#111114] border border-[#29292d] text-xs text-[var(--color-text)] rounded-l-sm focus:outline-none focus:border-[#ece7d5]"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-3.5 bg-[#ece7d5] text-[#070709] rounded-r-sm hover:bg-white transition-colors flex items-center justify-center"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {newsletterStatus === "unconfigured" && (
                <div className="flex items-start gap-1.5 text-[11px] text-amber-300/80 font-mono-archive">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>
                    Email provider unconfigured. Real dispatch keys (Resend/SendGrid) required.
                  </span>
                </div>
              )}

              {newsletterStatus === "success" && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono-archive">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Registered for studio announcements.</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Lower Folio Copyright Line */}
        <div className="mt-12 pt-8 border-t border-[#1c1c20] flex flex-wrap justify-between items-center gap-4 text-xs font-mono-archive text-[var(--color-text-dim)]">
          <div>
            © {new Date().getFullYear()} FROGMAN FILMS. ALL RIGHTS RESERVED. CHARACTER: FROGMAN.
          </div>
          <div>
            ARCHIVE STANDARD: POSTGRESQL + PRISMA // TAILWIND // NEXT.JS APP ROUTER
          </div>
        </div>
      </div>
    </footer>
  );
}
