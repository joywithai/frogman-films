"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { FrogmanRig } from "./FrogmanRig";
import { Moon, Sun, Compass, Sparkles } from "lucide-react";

export function FrogmanBedroomHero() {
  const [isAwake, setIsAwake] = useState(false);
  const [isPinnedAwake, setIsPinnedAwake] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [interactionHint, setInteractionHint] = useState("Hover or tap the bed — or press 'Wake Frogman'");

  const containerRef = useRef<HTMLDivElement>(null);
  const sleepTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const blinkIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Target and current interpolated offsets for smooth damping
  const targetEye = useRef({ x: 0, y: 0 });
  const currentEye = useRef({ x: 0, y: 0 });
  const [renderedEye, setRenderedEye] = useState({ x: 0, y: 0 });
  const [renderedHead, setRenderedHead] = useState({ x: 0, y: 0 });

  // Detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  // Periodic natural blink loop when awake
  useEffect(() => {
    if (!isAwake) return;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    };

    blinkIntervalRef.current = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerBlink();
      }
    }, 3800);

    return () => {
      if (blinkIntervalRef.current) clearInterval(blinkIntervalRef.current);
    };
  }, [isAwake]);

  // Smooth animation frame loop for pointer damping (no snapping or jitter)
  useEffect(() => {
    if (prefersReducedMotion) {
      setRenderedEye({ x: 0, y: 0 });
      setRenderedHead({ x: 0, y: 0 });
      return;
    }

    let animationFrameId: number;

    const updateLoop = () => {
      // Damping factor (smooth easing)
      const ease = 0.12;
      currentEye.current.x += (targetEye.current.x - currentEye.current.x) * ease;
      currentEye.current.y += (targetEye.current.y - currentEye.current.y) * ease;

      setRenderedEye({
        x: Math.round(currentEye.current.x * 10) / 10,
        y: Math.round(currentEye.current.y * 10) / 10,
      });

      setRenderedHead({
        x: Math.round(currentEye.current.x * 0.4 * 10) / 10,
        y: Math.round(currentEye.current.y * 0.2 * 10) / 10,
      });

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    animationFrameId = requestAnimationFrame(updateLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [prefersReducedMotion]);

  // Wake sequence triggering
  const triggerWakeup = useCallback(
    (pin = false) => {
      if (sleepTimeoutRef.current) {
        clearTimeout(sleepTimeoutRef.current);
      }
      if (pin) {
        setIsPinnedAwake(true);
      }
      setIsAwake(true);
      // Brief blink upon awakening
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
      setInteractionHint("Frogman is watching your cursor");
    },
    []
  );

  const triggerSleep = useCallback(() => {
    setIsPinnedAwake(false);
    setIsAwake(false);
    targetEye.current = { x: 0, y: 0 };
    setInteractionHint("Frogman has returned to rest");
  }, []);

  // Track pointer strictly inside hero container
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width; // 0 to 1
    const relY = (e.clientY - rect.top) / rect.height; // 0 to 1

    // Map to eye offset range (-12px to +12px horizontal, -8px to +8px vertical)
    targetEye.current = {
      x: (relX - 0.5) * 24,
      y: (relY - 0.5) * 16,
    };

    // If approaching center bed area, trigger waking up if not yet awake
    const distanceFromCenter = Math.hypot(relX - 0.5, relY - 0.5);
    if (!isAwake && distanceFromCenter < 0.38) {
      triggerWakeup(false);
    }
  };

  const handlePointerLeave = () => {
    targetEye.current = { x: 0, y: 0 };
    if (!isPinnedAwake && isAwake) {
      // Gentle delayed return to rest after leaving hero
      sleepTimeoutRef.current = setTimeout(() => {
        setIsAwake(false);
        setInteractionHint("Frogman is resting");
      }, 2600);
    }
  };

  return (
    <section
      aria-label="Frogman's Bedroom Archive Experience"
      className="relative w-full border-b border-[var(--color-border)] bg-[var(--color-bg)] overflow-hidden"
    >
      {/* Folio Header & Metadata Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono-archive text-[var(--color-text-dim)] uppercase">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>FOLIO N° 00 // STUDIO BEDROOM ARCHIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>CANONICAL RATIO: 4:3</span>
          <span className="hidden sm:inline">PROPORTION: 6 HEAD UNITS</span>
          <span className="text-[var(--color-text-muted)]">
            STATUS: {isAwake ? "AWAKE & OBSERVING" : "RESTING ASLEEP"}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Editorial Introduction */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block px-2.5 py-1 text-[11px] font-mono-archive tracking-widest text-[#ece7d5] bg-[#14151a] border border-[#29292d] rounded-sm">
              ORIGINAL CHARACTER INTERACTION
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--color-text)] leading-[1.08] tracking-tight">
              Quiet stories from the edge of the pond.
            </h1>

            <p className="text-[var(--color-text-muted)] text-base sm:text-lg leading-relaxed font-sans max-w-lg">
              Frogman Films is a character-led film studio and storybook archive.
              Here, hand-drawn 2D animation meets the quiet cadence of vintage
              printmaking.
            </p>

            {/* Accessible Interactive Controls Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => (isAwake ? triggerSleep() : triggerWakeup(true))}
                aria-pressed={isAwake}
                className="px-5 py-2.5 rounded-sm bg-[#ece7d5] text-[#070709] font-medium text-sm hover:bg-[#ffffff] transition-all flex items-center gap-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#ece7d5]"
              >
                {isAwake ? (
                  <>
                    <Moon className="w-4 h-4" />
                    <span>Let Frogman Rest</span>
                  </>
                ) : (
                  <>
                    <Sun className="w-4 h-4" />
                    <span>Wake Frogman</span>
                  </>
                )}
              </button>

              <a
                href="/films"
                className="px-5 py-2.5 rounded-sm border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-surface)] text-sm font-medium transition-all"
              >
                Enter Archive
              </a>
            </div>

            {/* Interaction Hint & Accessibility indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs font-mono-archive text-[var(--color-text-dim)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300/70" />
              <span>{interactionHint}</span>
            </div>
          </div>

          {/* Right Column: Layered 2D Bedroom Rig */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={() => triggerWakeup(true)}
              role="region"
              aria-label="Interactive bedroom viewport. Click to awaken Frogman."
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  isAwake ? triggerSleep() : triggerWakeup(true);
                }
              }}
              className="relative aspect-[4/3] w-full rounded-md border border-[var(--color-border)] bg-[#070709] overflow-hidden shadow-2xl cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#ece7d5]"
            >
              {/* Layered SVG scene */}
              <FrogmanRig
                isAwake={isAwake}
                eyeOffset={renderedEye}
                headOffset={renderedHead}
                isBlinking={isBlinking}
              />

              {/* Touch & Click visual affordance overlay */}
              <div className="absolute top-4 right-4 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity">
                <div className="px-2.5 py-1 rounded bg-[#070709]/80 border border-[#29292d] text-[10px] font-mono-archive text-[#ece7d5] flex items-center gap-1.5 backdrop-blur-sm">
                  <Compass className="w-3 h-3 text-amber-200/80" />
                  <span>{isAwake ? "GAZE ACTIVE" : "TOUCH OR HOVER"}</span>
                </div>
              </div>

              {/* Reduced motion badge if active */}
              {prefersReducedMotion && (
                <div className="absolute bottom-4 left-4 pointer-events-none px-2 py-1 rounded bg-[#070709]/90 border border-[#29292d] text-[10px] font-mono-archive text-[var(--color-text-dim)]">
                  Reduced motion enabled
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
