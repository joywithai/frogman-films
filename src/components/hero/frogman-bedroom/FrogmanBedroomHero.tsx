"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { FrogmanScene } from "./FrogmanScene";
import styles from "./hero-scene.module.css";

/**
 * Hero stage — no copy, no controls: just Frogman's bedroom.
 *
 * Pointer enters the stage  → he gets up out of bed and stands.
 * Pointer leaves the stage  → he flops straight back down and sleeps.
 * Touch / keyboard         → tap or focus toggles the same state.
 */
export function FrogmanBedroomHero() {
  const [isAwake, setIsAwake] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [renderedEye, setRenderedEye] = useState({ x: 0, y: 0 });
  const [renderedHead, setRenderedHead] = useState({ x: 0, y: 0 });

  // reduced motion: eyes stay centred, no rAF loop needed
  const eye = prefersReducedMotion ? { x: 0, y: 0 } : renderedEye;
  const head = prefersReducedMotion ? { x: 0, y: 0 } : renderedHead;

  const stageRef = useRef<HTMLDivElement>(null);
  const targetEye = useRef({ x: 0, y: 0 });
  const currentEye = useRef({ x: 0, y: 0 });
  const touchSleepTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---------------- reduced motion ---------------- */
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPrefersReducedMotion(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* ---------------- pupil / head tracking (damped, no jitter) ---------------- */
  useEffect(() => {
    if (prefersReducedMotion) {
      currentEye.current = { x: 0, y: 0 };
      return;
    }

    let frame = 0;
    const tick = () => {
      const ease = 0.09;
      currentEye.current.x += (targetEye.current.x - currentEye.current.x) * ease;
      currentEye.current.y += (targetEye.current.y - currentEye.current.y) * ease;

      const x = Math.round(currentEye.current.x * 10) / 10;
      const y = Math.round(currentEye.current.y * 10) / 10;

      setRenderedEye({ x, y });
      setRenderedHead({ x: Math.round(x * 0.45 * 10) / 10, y: Math.round(y * 0.2 * 10) / 10 });

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion]);

  /* ---------------- natural blink while he is up ---------------- */
  useEffect(() => {
    if (!isAwake || prefersReducedMotion) return;

    const schedule = () => {
      blinkTimer.current = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 140);
        schedule();
      }, 2600 + Math.random() * 3400);
    };

    schedule();
    return () => {
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    };
  }, [isAwake, prefersReducedMotion]);

  /* ---------------- wake / sleep ---------------- */
  const wake = useCallback(() => {
    if (touchSleepTimer.current) clearTimeout(touchSleepTimer.current);
    setIsAwake(true);
  }, []);

  const sleep = useCallback(() => {
    if (touchSleepTimer.current) clearTimeout(touchSleepTimer.current);
    targetEye.current = { x: 0, y: 0 };
    setIsBlinking(false);
    setIsAwake(false);
  }, []);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !stageRef.current) return;
    if (e.pointerType === "touch") return;

    const rect = stageRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;

    targetEye.current = { x: (relX - 0.5) * 18, y: (relY - 0.5) * 12 };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "touch") return;
    // Touch: first tap wakes him, a later tap (or a 6s pause) lets him sleep.
    if (isAwake) {
      sleep();
    } else {
      wake();
      touchSleepTimer.current = setTimeout(sleep, 6000);
    }
  };

  useEffect(
    () => () => {
      if (touchSleepTimer.current) clearTimeout(touchSleepTimer.current);
      if (blinkTimer.current) clearTimeout(blinkTimer.current);
    },
    []
  );

  return (
    <section
      aria-label="Frogman resting in his bedroom — point at or tap the scene to wake him"
      className="relative w-full overflow-hidden border-b border-[var(--color-border)] bg-[#070709] select-none"
      style={{ height: "calc(100svh - 104px)", minHeight: 520, maxHeight: 980 }}
    >
      <div
        ref={stageRef}
        data-awake={isAwake ? "true" : "false"}
        onPointerEnter={wake}
        onPointerLeave={sleep}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onFocus={wake}
        onBlur={sleep}
        tabIndex={0}
        role="img"
        aria-label={
          isAwake
            ? "Frogman has woken up and is standing beside his bed"
            : "Frogman is asleep in bed"
        }
        className={`${styles.stage} cursor-default outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#ece7d5]/40`}
      >
        <FrogmanScene
          eyeOffset={eye}
          headOffset={head}
          isBlinking={isBlinking}
        />
      </div>
    </section>
  );
}
