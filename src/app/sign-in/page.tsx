import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Sign In — Frogman Films",
};

export default function SignInPage() {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-20 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full border border-[#29292d] bg-[#111114] mx-auto flex items-center justify-center font-display text-base font-semibold text-[#ece7d5]">
          FF
        </div>
        <h1 className="font-display text-3xl text-[var(--color-text)]">
          Archivist & Patron Sign In
        </h1>
        <p className="text-xs text-[var(--color-text-dim)] font-mono-archive">
          ACCESS REGISTERED ORDERS AND DIGITAL ENTITLEMENTS
        </p>
      </div>

      <div className="p-8 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
        <form className="space-y-4 text-xs font-mono-archive">
          <div className="space-y-1.5">
            <label className="text-[var(--color-text-dim)]">Email Address</label>
            <input
              type="email"
              required
              defaultValue="collector@reedbed.org"
              className="w-full px-3 py-2.5 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[var(--color-text-dim)]">Password</label>
              <a href="#" className="text-[10px] text-amber-300 hover:underline">
                Reset Key?
              </a>
            </div>
            <input
              type="password"
              required
              defaultValue="sample-secure-password"
              className="w-full px-3 py-2.5 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
            />
          </div>

          <Link
            href="/account"
            className="w-full py-3 rounded-sm bg-[#ece7d5] text-[#070709] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <span>Enter Studio Vault</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="pt-4 border-t border-[#1c1c20] text-center text-xs font-mono-archive text-[var(--color-text-dim)]">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-amber-300 hover:underline">
            Register as Patron
          </Link>
        </div>
      </div>
    </div>
  );
}
