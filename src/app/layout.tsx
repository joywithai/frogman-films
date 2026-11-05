import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Frogman Films — Character Universe & Story Archive",
  description:
    "An independent cinematic universe and storybook studio. Vintage book and 2D film archive aesthetic featuring Frogman.",
  keywords: [
    "Frogman Films",
    "Frogman",
    "2D Animation",
    "Storybooks",
    "Archival Prints",
    "Character Studio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#070709] text-[#efeee9] film-grain">
        <CartProvider>
          {/* Masthead reads usePathname(), so it streams in behind a
              height-matched placeholder instead of blocking the prerender. */}
          <Suspense fallback={<div className="h-[105px] border-b border-[var(--color-border)] bg-[#070709]" aria-hidden />}>
            <Masthead />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
