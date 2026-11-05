import Link from "next/link";
import { ArrowLeft, Download, ShieldCheck, Lock, FileText } from "lucide-react";
import { storageAdapter } from "@/lib/storage/adapter";

export const metadata = {
  title: "Protected Digital Downloads — Frogman Films",
};

export default function AccountDownloadsPage() {
  const downloadableAssets = [
    {
      id: "ent_01",
      title: "Frogman in the Quiet Room — Folio N° 01 (Digital Master)",
      format: "PDF (Archival 300dpi Spreads)",
      fileSize: "48.2 MB",
      orderRef: "FF-2026-0814",
      fileKey: "protected/books/folio-01-quiet-room-master.pdf",
    },
    {
      id: "ent_02",
      title: "Frogman Production Archive & Audio Stems",
      format: "ZIP (Vector SVGs + 24-bit WAV)",
      fileSize: "182.4 MB",
      orderRef: "FF-2026-0814",
      fileKey: "protected/archive/frogman-production-stems.zip",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)] pb-4 border-b border-[#1c1c20]">
        <Link
          href="/account"
          className="hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO ACCOUNT OVERVIEW</span>
        </Link>
        <span>PROTECTED DIGITAL ENCLAVE</span>
      </div>

      <div className="space-y-2">
        <h1 className="font-display text-3xl sm:text-4xl text-[var(--color-text)]">
          Digital Folio Vault
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
          High-resolution storybook editions, vector turnaround sheets, and acoustic stems.
          Downloads are protected using cryptographic HMAC signatures and time-limited tokens.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {downloadableAssets.map((asset) => {
          const downloadUrl = storageAdapter.generateSignedDownloadUrl(
            asset.fileKey,
            asset.orderRef
          );

          return (
            <div
              key={asset.id}
              className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-archive text-[var(--color-text-dim)]">
                  <span>ORDER: {asset.orderRef}</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>

                <h3 className="font-display text-xl text-[var(--color-text)]">
                  {asset.title}
                </h3>

                <div className="text-xs font-mono-archive text-[var(--color-text-muted)] flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3 h-3 text-[var(--color-text-dim)]" />
                    {asset.format}
                  </span>
                  <span>•</span>
                  <span>{asset.fileSize}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1c1c20] flex items-center justify-between">
                <span className="text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                  TOKEN VALID FOR 60 MINS
                </span>

                <a
                  href={downloadUrl}
                  className="px-4 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold uppercase tracking-wider flex items-center gap-1.5 hover:bg-white transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Master</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
