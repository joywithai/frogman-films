import Link from "next/link";
import {
  ShieldAlert,
  Film,
  BookOpen,
  ShoppingBag,
  Package,
  Users,
  Image as ImageIcon,
  Settings,
  ArrowLeft,
} from "lucide-react";

export const metadata = {
  title: "Archivist Administration — Frogman Films",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminNav = [
    { href: "/admin", label: "Dashboard", icon: ShieldAlert },
    { href: "/admin/films", label: "Films Archive", icon: Film },
    { href: "/admin/books", label: "Storybook Folios", icon: BookOpen },
    { href: "/admin/products", label: "Shop Artifacts", icon: ShoppingBag },
    { href: "/admin/orders", label: "Order Fulfilment", icon: Package },
    { href: "/admin/media", label: "Media Assets", icon: ImageIcon },
    { href: "/admin/settings", label: "Studio Config", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#070709] border-t border-[var(--color-border)]">
      {/* Admin Top Notification Strip */}
      <div className="bg-amber-950/40 border-b border-amber-900/40 px-6 py-2 flex items-center justify-between text-xs font-mono-archive text-amber-200">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
          <span>FROGMAN FILMS // ARCHIVIST MASTER CONSOLE (RESTRICTED ROLE)</span>
        </div>
        <Link
          href="/"
          className="hover:underline flex items-center gap-1 text-[var(--color-text-dim)] hover:text-amber-200"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Exit to Public Studio</span>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-2">
            <div className="p-3 bg-[#111114] border border-[var(--color-border)] rounded-md space-y-1">
              {adminNav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-mono-archive text-[var(--color-text-muted)] hover:text-[#ece7d5] hover:bg-[#19191e] rounded transition-colors"
                  >
                    <Icon className="w-4 h-4 text-[var(--color-text-dim)]" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 rounded-md border border-[#1c1c20] bg-[#0c0c0f] text-[11px] font-mono-archive text-[var(--color-text-dim)] space-y-1">
              <div>ACTIVE ROLE: ARCHIVIST_ADMIN</div>
              <div>SESSION: ENCRYPTED // STRICT</div>
              <div>ENV: VERIFIED PRODUCTION-MINDED</div>
            </div>
          </aside>

          {/* Admin Main Body */}
          <section className="lg:col-span-9">{children}</section>
        </div>
      </div>
    </div>
  );
}
