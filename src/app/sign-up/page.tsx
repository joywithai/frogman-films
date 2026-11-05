import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Patron Registration — Frogman Films",
};

export default function SignUpPage() {
  return (
    <div className="w-full max-w-md mx-auto px-4 py-20 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-full border border-[#29292d] bg-[#111114] mx-auto flex items-center justify-center font-display text-base font-semibold text-[#ece7d5]">
          FF
        </div>
        <h1 className="font-display text-3xl text-[var(--color-text)]">
          Register as Patron
        </h1>
        <p className="text-xs text-[var(--color-text-dim)] font-mono-archive">
          NEW COLLECTOR VAULT ENROLLMENT
        </p>
      </div>

      <div className="p-8 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-6">
        <form className="space-y-4 text-xs font-mono-archive">
          <div className="space-y-1.5">
            <label className="text-[var(--color-text-dim)]">Full Name</label>
            <input
              type="text"
              required
              placeholder="Julian Morrow"
              className="w-full px-3 py-2.5 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-dim)]">Email Address</label>
            <input
              type="email"
              required
              placeholder="collector@reedbed.org"
              className="w-full px-3 py-2.5 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[var(--color-text-dim)]">Secret Password</label>
            <input
              type="password"
              required
              placeholder="Minimum 8 characters"
              className="w-full px-3 py-2.5 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
            />
          </div>

          <Link
            href="/account"
            className="w-full py-3 rounded-sm bg-[#ece7d5] text-[#070709] font-semibold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white transition-colors"
          >
            <span>Create Patron Record</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </form>

        <div className="pt-4 border-t border-[#1c1c20] text-center text-xs font-mono-archive text-[var(--color-text-dim)]">
          Already registered?{" "}
          <Link href="/sign-in" className="text-amber-300 hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
