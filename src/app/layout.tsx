import type { Metadata } from "next";
import { Newsreader, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart/CartContext";
import { Masthead } from "@/components/layout/Masthead";
import { Footer } from "@/components/layout/Footer";

const serifFont = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const sansFont = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070709] text-[#efeee9] film-grain">
        <CartProvider>
          <Masthead />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
