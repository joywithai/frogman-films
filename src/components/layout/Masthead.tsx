"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/CartContext";
import {
  Film,
  BookOpen,
  ShoppingBag,
  Info,
  Search,
  User,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";

export function Masthead() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const navLinks = [
    { href: "/films", label: "Films", icon: Film },
    { href: "/stories", label: "Stories", icon: BookOpen },
    { href: "/shop", label: "Shop", icon: ShoppingBag },
    { href: "/about", label: "About", icon: Info },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-md border-b border-[var(--color-border)]">
      {/* Top Folio Archival Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 text-[11px] font-mono-archive text-[var(--color-text-dim)] border-b border-[#1c1c20]">
        <div className="flex items-center gap-4">
          <span>ARCHIVE REGISTRY: FF-2026</span>
          <span>•</span>
          <span>2D ANIMATION & PRINTED WORKS</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
          >
            <ShieldAlert className="w-3 h-3 text-amber-400" />
            <span>ARCHIVIST CONSOLE</span>
          </Link>
          <span>•</span>
          <span>CURRENCY: USD</span>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Insignia */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3 group focus:outline-none focus:ring-1 focus:ring-[#ece7d5] shrink-0"
        >
          <div className="w-8 h-8 rounded-full border border-[var(--color-border)] bg-[#111114] flex items-center justify-center font-display text-sm font-semibold text-[#ece7d5] group-hover:border-[#ece7d5] transition-colors">
            FF
          </div>
          <div className="flex flex-col">
            <span className="font-display text-sm sm:text-lg tracking-wider font-semibold text-[var(--color-text)] whitespace-nowrap">
              FROGMAN FILMS
            </span>
            <span className="hidden sm:block text-[9px] font-mono-archive tracking-widest text-[var(--color-text-dim)] uppercase -mt-0.5">
              Studio &amp; Catalogue
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-sm transition-colors ${
                  active
                    ? "text-[#ece7d5] bg-[#14151a] border border-[#29292d]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[#0c0c0f]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Icons: Search, Cart, Account */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/search"
            aria-label="Search archive"
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-sm hover:bg-[#14151a] transition-colors"
          >
            <Search className="w-4 h-4" />
          </Link>

          <Link
            href="/account"
            aria-label="User Account and Orders"
            className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-sm hover:bg-[#14151a] transition-colors"
          >
            <User className="w-4 h-4" />
          </Link>

          <Link
            href="/cart"
            aria-label={`Shopping Cart with ${totalItems} items`}
            className="relative p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-sm hover:bg-[#14151a] transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#ece7d5] text-[#070709] rounded-full text-[10px] font-mono-archive font-bold flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] rounded-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[#0c0c0f] px-6 py-4 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium ${
                  active
                    ? "bg-[#14151a] text-[#ece7d5] border border-[#29292d]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
          <div className="pt-3 border-t border-[#1c1c20] flex justify-between items-center text-xs font-mono-archive text-[var(--color-text-dim)]">
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-amber-400 hover:underline"
            >
              Archivist Admin Console →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
