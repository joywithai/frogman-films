"use client";

import React, { useEffect, useId, useState } from "react";
import styles from "./hero-scene.module.css";

export interface FrogmanSceneProps {
  eyeOffset: { x: number; y: number };
  headOffset: { x: number; y: number };
  isBlinking: boolean;
}

/**
 * Frogman's bedroom — a single text-free 2D stage.
 *
 * Drawn to the studio model sheet: 6 head units, cream #ECE7D5 skin,
 * thin #191B21 line, eye bumps on top of the head, merged-arm silhouette.
 *
 * World layout (viewBox 1600 x 720):
 *   floor line 500 · mattress top 430 · bed base 514
 *   standing hip 438 on the rug at the foot of the bed (feet 640)
 *   sleeping hip 542 with his chin on the duvet at 438
 */
export function FrogmanScene({
  eyeOffset,
  headOffset,
  isBlinking,
}: FrogmanSceneProps) {
  const uid = useId().replace(/[:]/g, "");
  const id = (name: string) => `${name}-${uid}`;

  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const pupilX = Math.max(-6, Math.min(6, eyeOffset.x));
  const pupilY = Math.max(-4, Math.min(4, eyeOffset.y));
  const headRotate = Math.max(-3.5, Math.min(3.5, headOffset.x * 0.2));
  const headTiltY = headOffset.y * 0.15;

  const eye = (cx: number) => (
    <g key={cx}>
      <ellipse
        cx={cx}
        cy={-4}
        rx={22}
        ry={20}
        fill="#F4F0E2"
        stroke="#191B21"
        strokeWidth={2.8}
      />
      <circle cx={cx + pupilX} cy={2 + pupilY} r={8} fill="#23262B" />
      {/* heavy upper lid: a skin patch over the top of the eye plus a single
          lid line — the sleepy look from the model sheet */}
      <path
        d={`M ${cx - 22} -3 A 22 20 0 0 1 ${cx + 22} -3 Q ${cx} 1 ${cx - 22} -3 Z`}
        fill="#ECE7D5"
        stroke="none"
      />
      <path
        d={`M ${cx - 22} -3 Q ${cx} 1 ${cx + 22} -3`}
        fill="none"
        stroke="#191B21"
        strokeWidth={3}
        strokeLinecap="round"
      />
    </g>
  );

  return (
    <svg
      viewBox={compact ? "255 150 690 620" : "150 70 1300 650"}
      preserveAspectRatio="xMidYMid slice"
      className={styles.scene}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15151b" />
          <stop offset="58%" stopColor="#0c0c11" />
          <stop offset="100%" stopColor="#08080b" />
        </linearGradient>

        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#101015" />
          <stop offset="100%" stopColor="#060608" />
        </linearGradient>

        <linearGradient id={id("duvet")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#55616f" />
          <stop offset="52%" stopColor="#414b57" />
          <stop offset="100%" stopColor="#2b333c" />
        </linearGradient>

        <linearGradient id={id("wood")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a3a2e" />
          <stop offset="100%" stopColor="#2a211b" />
        </linearGradient>

        <linearGradient id={id("lampShade")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4b3e32" />
          <stop offset="100%" stopColor="#2a231d" />
        </linearGradient>

        <radialGradient id={id("lampGlow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffd9a0" stopOpacity="0.5" />
          <stop offset="45%" stopColor="#e0a857" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#070709" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={id("vignette")} cx="50%" cy="45%" r="72%">
          <stop offset="52%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
        </radialGradient>

        <radialGradient id={id("wallWarm")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4a3423" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#2a1d14" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={id("floorPool")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1a1a21" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#101017" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0a0a0e" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={id("moonGlow")} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#cfe0ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#cfe0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ============================ ROOM ============================ */}
      <rect width="1600" height="720" fill={`url(#${id("wall")})`} />
      <rect y="500" width="1600" height="220" fill={`url(#${id("floor")})`} />

      <g stroke="#17171e" strokeWidth="1.5">
        <line x1="0" y1="496" x2="1600" y2="496" />
        <line x1="0" y1="488" x2="1600" y2="488" stroke="#1d1d26" />
        <line x1="150" y1="0" x2="150" y2="488" />
        <line x1="1450" y1="0" x2="1450" y2="488" />
      </g>

      {/* window + moonlight */}
      <g>
        <rect
          x="26"
          y="96"
          width="272"
          height="300"
          rx="6"
          fill="#0a0f16"
          stroke="#2a2a33"
          strokeWidth="3"
        />
        <circle
          cx="118"
          cy="170"
          r="150"
          fill={`url(#${id("moonGlow")})`}
          className={styles.moonbeam}
        />
        <circle cx="120" cy="168" r="30" fill="#dfe8f6" opacity="0.45" />
        <g stroke="#1e222a" strokeWidth="2">
          <line x1="165" y1="96" x2="165" y2="396" />
          <line x1="26" y1="246" x2="298" y2="246" />
        </g>
      </g>

      {/* framed plate above the bed */}
      <g transform="translate(900 150)">
        <rect
          x="0"
          y="0"
          width="150"
          height="118"
          rx="3"
          fill="#121216"
          stroke="#2c2c36"
          strokeWidth="4"
        />
        <rect x="12" y="12" width="126" height="94" fill="#0a0a0d" />
        <circle cx="75" cy="52" r="17" fill="#1c1f24" />
        <path d="M 44 88 Q 75 60 106 88 Z" fill="#23272d" />
      </g>

      {/* ============================= BED ============================= */}
      {/* headboard */}
      <g>
        <rect
          x="392"
          y="252"
          width="776"
          height="180"
          rx="10"
          fill={`url(#${id("wood")})`}
          stroke="#6a5343"
          strokeWidth="3"
        />
        <g stroke="#241c17" strokeWidth="2" opacity="0.8">
          <line x1="560" y1="266" x2="560" y2="430" />
          <line x1="780" y1="266" x2="780" y2="430" />
          <line x1="1000" y1="266" x2="1000" y2="430" />
        </g>
        <rect
          x="382"
          y="240"
          width="796"
          height="16"
          rx="7"
          fill="#7a6049"
          stroke="#8a7057"
          strokeWidth="1.5"
        />
      </g>

      {/* mattress (cream sheet) + wooden base */}
      <rect
        x="386"
        y="430"
        width="788"
        height="46"
        rx="7"
        fill="#cdc7b4"
        stroke="#252525"
        strokeWidth="2.4"
      />
      <rect x="386" y="466" width="788" height="12" fill="#a49e8a" opacity="0.6" />
      <rect
        x="398"
        y="474"
        width="764"
        height="40"
        rx="4"
        fill="#221a15"
        stroke="#3a2d25"
        strokeWidth="2"
      />
      <g fill="#221a15" stroke="#3a2d25" strokeWidth="2">
        <rect x="418" y="512" width="24" height="14" rx="3" />
        <rect x="1118" y="512" width="24" height="14" rx="3" />
      </g>

      {/* pillow */}
      <g>
        <ellipse cx="636" cy="424" rx="150" ry="12" fill="#000000" opacity="0.35" />
        <rect
          x="486"
          y="340"
          width="300"
          height="82"
          rx="30"
          fill="#ded8c5"
          stroke="#2a2a2a"
          strokeWidth="2.6"
        />
        <path
          d="M 514 374 q 126 -18 252 0"
          fill="none"
          stroke="#b7b1a0"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </g>

      {/* rug / light pool */}
      <ellipse cx="760" cy="650" rx="560" ry="84" fill={`url(#${id("floorPool")})`} />

      {/* ================= BLANKET ON THE BED (drawn behind him) ================= */}
      <g>
        <path
          d="M 604 470
             C 640 448 700 442 760 448
             C 860 458 1000 442 1100 452
             L 1164 458
             L 1164 556
             C 1040 574 900 578 780 578
             C 700 578 640 572 604 558 Z"
          fill={`url(#${id("duvet")})`}
          stroke="#1b2129"
          strokeWidth="2"
        />
        {/* turned-down sheet */}
        <path
          d="M 604 470 C 640 448 700 442 760 448 C 860 458 1000 442 1100 452 L 1164 458 L 1164 480 C 1060 472 900 488 760 476 C 690 470 636 480 604 492 Z"
          fill="#a8a292"
          stroke="#2a2a2a"
          strokeOpacity="0.45"
          strokeWidth="1.8"
        />
        <path
          d="M 700 520 q 200 22 420 6 M 760 548 q 170 16 340 2"
          fill="none"
          stroke="#5b6774"
          strokeOpacity="0.45"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>

      {/* soft shadow under the bed */}
      <ellipse cx="780" cy="528" rx="400" ry="14" fill="#000000" opacity="0.5" />

      {/* night wash — never over the character */}
      <rect
        width="1600"
        height="720"
        fill="#02030a"
        className={styles.nightShade}
      />

      {/* ============================ FROGMAN ============================ */}
      {/* Static anchor = the sleeping spot (chin on the duvet, head on the
          pillow). The CSS module lifts him 111px and slides him left to stand:
          310px on desktop, a shorter 120px hop on narrow screens. */}
      <g transform="translate(660 549)">
        <g className={styles.body}>
          <ellipse
            cx="0"
            cy="91"
            rx="86"
            ry="13"
            fill="#000000"
            className={styles.groundShadow}
          />
          <g className={styles.bodyInner}>
          {/* torso + legs are hidden while he is under the duvet */}
          <g className={styles.lowerBody}>
            <g stroke="#191B21" strokeWidth="3.2">
              <rect x="-47" y="44" width="44" height="140" rx="22" fill="#ECE7D5" />
              <rect x="3" y="44" width="44" height="140" rx="22" fill="#ECE7D5" />
              <ellipse cx="-25" cy="188" rx="32" ry="15" fill="#ECE7D5" />
              <ellipse cx="25" cy="188" rx="32" ry="15" fill="#ECE7D5" />
            </g>

            <rect
              x="-48"
              y="-104"
              width="96"
              height="164"
              rx="48"
              fill="#ECE7D5"
              stroke="#191B21"
              strokeWidth="3.2"
            />
          </g>
          </g>

          {/* head */}
          <g transform="translate(0 -150)">
            <g className={styles.head}>
              <g
                className={styles.headTrack}
                style={{
                  transform: `rotate(${headRotate}deg) translateY(${headTiltY}px)`,
                }}
              >
                <path
                  d="M -60 10
                     C -60 -14 -52 -30 -38 -36
                     C -38 -54 -20 -60 -8 -46
                     C -4 -42 4 -42 8 -46
                     C 20 -60 38 -54 38 -36
                     C 52 -30 60 -14 60 10
                     C 60 34 32 46 0 46
                     C -32 46 -60 34 -60 10 Z"
                  fill="#ECE7D5"
                  stroke="#191B21"
                  strokeWidth="3.4"
                  strokeLinejoin="round"
                />

                <g
                  className={`${styles.eyesOpen} ${isBlinking ? styles.blink : ""}`}
                >
                  {eye(-28)}
                  {eye(28)}
                </g>

                {/* sleeping eyes: gentle lid arcs */}
                <g
                  className={styles.eyesClosed}
                  stroke="#191B21"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  fill="none"
                >
                  <path d="M -48 -6 Q -28 8 -8 -6" />
                  <path d="M 8 -6 Q 28 8 48 -6" />
                </g>

                <g fill="#191B21">
                  <circle cx="-6" cy="13" r="2.1" />
                  <circle cx="6" cy="13" r="2.1" />
                </g>
                <path
                  d="M -15 27 Q 0 29.5 15 27"
                  fill="none"
                  stroke="#191B21"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* ============ DUVET PULLED OVER HIM WHILE HE SLEEPS ============ */}
      <g className={styles.duvetFront}>
        <g className={styles.duvetBreath}>
          <path
            d="M 604 500
               C 606 470 618 452 640 442
               C 664 432 700 430 740 434
               C 830 442 980 430 1090 440
               L 1164 446
               L 1164 556
               C 1040 574 900 578 780 578
               C 700 578 640 574 604 560 Z"
            fill={`url(#${id("duvet")})`}
            stroke="#1b2129"
            strokeWidth="2"
          />
          <path
            d="M 604 452 C 640 434 690 430 740 434 C 830 442 980 430 1090 440 L 1164 446 L 1164 470 C 1050 462 900 480 740 464 C 690 458 636 468 604 480 Z"
            fill="#ada797"
            stroke="#2a2a2a"
            strokeOpacity="0.4"
            strokeWidth="1.8"
          />
          <path
            d="M 700 520 q 200 22 420 6 M 760 548 q 170 16 340 2 M 720 470 q 150 -10 300 2"
            fill="none"
            stroke="#5b6774"
            strokeOpacity="0.45"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* ========================= BEDSIDE LAMP ========================= */}
      <g transform="translate(1206 0)">
        <circle
          cx="92"
          cy="330"
          r="250"
          fill={`url(#${id("lampGlow")})`}
          className={styles.lampGlow}
        />
        <rect
          x="0"
          y="368"
          width="184"
          height="140"
          rx="4"
          fill="#1d1714"
          stroke="#332a24"
          strokeWidth="2"
        />
        <rect
          x="14"
          y="386"
          width="156"
          height="50"
          rx="3"
          fill="#241d19"
          stroke="#3a302a"
          strokeWidth="1.5"
        />
        <circle cx="92" cy="411" r="4" fill="#a48a5c" />
        <line
          x1="92"
          y1="330"
          x2="92"
          y2="368"
          stroke="#453830"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 52 332 L 132 332 L 116 282 L 68 282 Z"
          fill={`url(#${id("lampShade")})`}
          stroke="#4a3d31"
          strokeWidth="2"
        />
        <ellipse cx="92" cy="331" rx="40" ry="6" fill="#ffdcae" opacity="0.7" />
      </g>

      <rect
        width="1600"
        height="720"
        fill={`url(#${id("vignette")})`}
        pointerEvents="none"
      />
    </svg>
  );
}
