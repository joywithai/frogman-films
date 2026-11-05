import { Mail, MapPin, Send, Compass } from "lucide-react";

export const metadata = {
  title: "Dispatch & Inquiries — Frogman Films",
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="border-b border-[var(--color-border)] pb-8 space-y-3">
        <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          COMMUNICATIONS // REEDBED POSTAL STATION
        </span>
        <h1 className="font-display text-4xl sm:text-5xl text-[var(--color-text)]">
          Studio Dispatch & Inquiries
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-xl leading-relaxed">
          For archival inquiries, theatrical screening prints, folio stockist requests,
          or quiet correspondence with the Frogman Films studio.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-7 p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4">
          <h3 className="font-mono-archive text-xs uppercase tracking-wider text-[var(--color-text)] pb-3 border-b border-[#1c1c20]">
            Send Postal Message
          </h3>

          <form className="space-y-4 text-xs font-mono-archive">
            <div className="space-y-1.5">
              <label className="text-[var(--color-text-dim)]">Your Name</label>
              <input
                type="text"
                required
                placeholder="Correspondent Name"
                className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[var(--color-text-dim)]">Return Email</label>
              <input
                type="email"
                required
                placeholder="patron@reedbed.org"
                className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[var(--color-text-dim)]">Message or Archival Inquiry</label>
              <textarea
                rows={5}
                required
                placeholder="Concerning folio printings, screening reels, or studio correspondence..."
                className="w-full px-3 py-2 bg-[#070709] border border-[#29292d] text-[var(--color-text)] rounded-sm focus:outline-none focus:border-[#ece7d5]"
              />
            </div>

            <button
              type="button"
              className="w-full py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] font-medium text-xs font-mono-archive uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Transmit Dispatch</span>
            </button>
          </form>
        </div>

        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#0c0c0f] space-y-4 text-xs font-mono-archive text-[var(--color-text-dim)]">
            <div className="space-y-1">
              <span className="text-[var(--color-text)] font-semibold block flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span>Studio Headquarters</span>
              </span>
              <p>Frogman Films Studio</p>
              <p>Reedbed Archive Facility // Cabin N° 4</p>
              <p>The Marshlands & Waterways</p>
            </div>

            <div className="pt-3 border-t border-[#1c1c20] space-y-1">
              <span className="text-[var(--color-text)] font-semibold block flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Electronic Mail</span>
              </span>
              <p>archivist@frogmanfilms.com</p>
              <p>press@frogmanfilms.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
