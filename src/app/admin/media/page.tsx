import { Upload, ImageIcon, FileText, CheckCircle } from "lucide-react";

export default function AdminMediaPage() {
  const mediaFiles = [
    {
      name: "model-sheet-01.jpg",
      size: "109 KB",
      dimensions: "Orthographic Turnaround & Proportions",
      category: "Approved Character Canon",
    },
    {
      name: "expression-sheet-02.jpg",
      size: "128 KB",
      dimensions: "12 Core Facial Expressions Sheet",
      category: "Approved Character Canon",
    },
    {
      name: "film-midnight-pond.svg",
      size: "14 KB",
      dimensions: "Vector 4:3 Anamorphic Poster",
      category: "Film Poster Asset",
    },
    {
      name: "book-quiet-room.svg",
      size: "18 KB",
      dimensions: "Vector Folio N° 01 Book Jacket",
      category: "Storybook Asset",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] flex justify-between items-center">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            VAULT ASSET STORAGE
          </span>
          <h1 className="font-display text-2xl text-[var(--color-text)] mt-0.5">
            Archival Media Management
          </h1>
        </div>
        <button
          type="button"
          className="px-3.5 py-2 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive font-semibold flex items-center gap-1.5 hover:bg-white"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Asset</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mediaFiles.map((m) => (
          <div
            key={m.name}
            className="p-4 rounded-md border border-[var(--color-border)] bg-[#111114] flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded bg-[#070709] border border-[#29292d] flex items-center justify-center flex-shrink-0 text-amber-300">
              <ImageIcon className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs font-mono-archive flex-1">
              <div className="font-semibold text-[#ece7d5]">{m.name}</div>
              <div className="text-[var(--color-text-dim)]">{m.dimensions}</div>
              <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] pt-1">
                <span>{m.category}</span>
                <span>{m.size}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
