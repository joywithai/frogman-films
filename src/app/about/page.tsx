import Link from "next/link";
import { Archive, Film, BookOpen, Compass, Layers } from "lucide-react";

export const metadata = {
  title: "Studio Lore & Character Canon — Frogman Films",
  description:
    "The history, character turnaround specifications, and aesthetic philosophy of Frogman Films.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Editorial Header */}
      <div className="border-b border-[var(--color-border)] pb-8 space-y-4">
        <div className="flex items-center gap-3 text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
          <span>ARCHIVAL DOSSIER // STUDIO LORE</span>
          <span>•</span>
          <span>EST. MMXIV</span>
        </div>
        <h1 className="font-display text-4xl sm:text-6xl text-[var(--color-text)]">
          The World of Frogman Films
        </h1>
        <p className="text-[var(--color-text-muted)] text-base sm:text-lg max-w-3xl leading-relaxed">
          Frogman Films is an independent studio producing character-led 2D
          animation and fine printed storybooks. Our aesthetic embraces
          monochrome ink, restrained color palettes, heavy paper grain, and
          contemplative pacing.
        </p>
      </div>

      {/* Philosophy Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-3">
          <div className="text-xs font-mono-archive text-amber-300/80 uppercase">
            I. ORTHOGRAPHIC DISCIPLINE
          </div>
          <h3 className="font-display text-2xl text-[var(--color-text)]">
            The 6-Head Unit Canon
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            Every drawing of Frogman adheres to the strict 6-head turnaround
            standard. Shoulder width equals 1.5 times the head width. Limbs
            never stretch beyond 15% deformation.
          </p>
        </div>

        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-3">
          <div className="text-xs font-mono-archive text-emerald-400/80 uppercase">
            II. THE VINTAGE ARCHIVE
          </div>
          <h3 className="font-display text-2xl text-[var(--color-text)]">
            Paper Grain & Tin Reels
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            We avoid modern saturated neon gradients and frantic edits. Our work
            lives inside near-black `#070709`, charcoal, warm cream `#ece7d5`, and
            linen bindings.
          </p>
        </div>

        <div className="p-6 rounded-md border border-[var(--color-border)] bg-[#111114] space-y-3">
          <div className="text-xs font-mono-archive text-sky-400/80 uppercase">
            III. QUIET TEMPERAMENTS
          </div>
          <h3 className="font-display text-2xl text-[var(--color-text)]">
            Meditation in Reeds
          </h3>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
            Narratives revolve around simple acts: stoking a woodstove,
            listening to rain upon corrugated tin, disassembling an antique clock,
            or pausing by the reed beds.
          </p>
        </div>
      </div>

      {/* Official Model Sheets Showcase (Using the user-uploaded sheets) */}
      <section className="space-y-8 pt-8 border-t border-[var(--color-border)]">
        <div>
          <span className="text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
            CANONICAL REFERENCE ARCHIVE
          </span>
          <h2 className="font-display text-3xl sm:text-4xl text-[var(--color-text)] mt-1">
            Studio Model & Expression Sheets
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1 max-w-2xl">
            Official production sheets utilized by animators and illustrators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sheet 01: Turnaround */}
          <div className="rounded-md border border-[var(--color-border)] bg-[#070709] overflow-hidden p-4 space-y-4">
            <div className="relative aspect-[16/9] rounded overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/frogman/model-sheet-01.jpg"
                alt="01 — Model Sheet & Turnaround | Frogman"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono-archive text-amber-300">
                01 — MODEL SHEET & TURNAROUND // FROGMAN
              </div>
              <p className="text-xs text-[var(--color-text-dim)] font-mono-archive">
                Orthographic Views (Front 0°, 3/4 Front 45°, Side 90°, 3/4 Back 135°, Back 180°) • Proportion Grid • Head Unit System
              </p>
            </div>
          </div>

          {/* Sheet 02: Facial Expressions */}
          <div className="rounded-md border border-[var(--color-border)] bg-[#070709] overflow-hidden p-4 space-y-4">
            <div className="relative aspect-[16/9] rounded overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/frogman/expression-sheet-02.jpg"
                alt="02 — Facial Expression Sheet | Frogman"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="space-y-1">
              <div className="text-xs font-mono-archive text-emerald-400">
                02 — FACIAL EXPRESSION SHEET // FROGMAN
              </div>
              <p className="text-xs text-[var(--color-text-dim)] font-mono-archive">
                12 Core Emotions (Neutral, Happy, Sad, Angry, Surprised, Scared, Disgusted, Confused, Smirk, Crying, Laughing, Annoyed) • Eyebrow Angle Dynamics • Eye Spacing Rules
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <div className="p-8 rounded-md border border-[var(--color-border)] bg-[#111114] text-center space-y-4 max-w-3xl mx-auto">
        <h3 className="font-display text-2xl text-[var(--color-text)]">
          Explore the Animated Archive
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
          Begin with our short film &ldquo;The Midnight Pond&rdquo; or inspect Folio N° 01 in the storybook library.
        </p>
        <div className="pt-2 flex justify-center gap-4">
          <Link
            href="/films"
            className="px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] text-xs font-mono-archive uppercase font-semibold hover:bg-white transition-colors"
          >
            Watch Films
          </Link>
          <Link
            href="/stories"
            className="px-5 py-2.5 rounded-sm border border-[var(--color-border)] text-xs font-mono-archive uppercase font-medium hover:bg-[#14151a] transition-colors"
          >
            Read Folios
          </Link>
        </div>
      </div>
    </div>
  );
}
