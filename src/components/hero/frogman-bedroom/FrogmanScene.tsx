"use client";

import React, { useEffect, useId, useLayoutEffect, useState } from "react";
import styles from "./hero-scene.module.css";

export interface FrogmanSceneProps {
  eyeOffset: { x: number; y: number };
  headOffset: { x: number; y: number };
  isBlinking: boolean;
}

/**
 * Frogman's bedroom — one text-free stage, drawn to the studio model sheet.
 *
 * Character rig (origin = his feet, standing):
 *   460 tall · head 152 wide × 128 tall with two crown bumps · torso 200
 *   legs 130 · thin arms hanging at the sides · cream #ECE7D5 · 3.2px ink line
 *
 * World (viewBox 1600 × 920, wall/floor line at y 560):
 *   headboard 392-540 · mattress 540-620 · bed base 620-672 · legs to 700
 *   standing spot: feet 706, beside the bed at x 330
 *   sleeping spot: same rig slid +276 x / +189 y, chin on the blanket
 */
export function FrogmanScene({
  eyeOffset,
  headOffset,
  isBlinking,
}: FrogmanSceneProps) {
  const uid = useId().replace(/[:]/g, "");
  const id = (name: string) => `${name}-${uid}`;

  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const [frame, setFrame] = useState({ x: 108.8, y: 148.7, w: 1236.5, h: 682.6, slide: 276 });

  // Frame the subject for whatever box the hero actually is: landscape keeps
  // the whole room, portrait tightens onto Frogman and shortens his slide so
  // both the sleeping and the standing pose always stay inside the crop.
  useLayoutEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const measure = () => {
      const r = el.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const aspect = r.width / r.height;
      const portrait = aspect < 1.25;
      const slide = portrait ? 120 : 276;

      const left = portrait ? 600 - slide - 178 : 214;
      const right = portrait ? 600 + 178 : 1240;
      const top = portrait ? 206 : 168;
      const bottom = portrait ? 800 : 812;

      const subjectW = right - left;
      const subjectH = bottom - top;
      const h = Math.max(subjectH, subjectW / aspect) * 1.06;
      const w = h * aspect;
      const cx = (left + right) / 2;
      const cy = (top + bottom) / 2;

      setFrame({ x: cx - w / 2, y: cy - h / 2, w, h, slide });
    };

    // first paint, then again once layout has settled, then on every resize
    measure();
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      measure();
      raf2 = requestAnimationFrame(measure);
    });

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const pupilX = Math.max(-6.5, Math.min(6.5, eyeOffset.x * 0.5));
  const pupilY = Math.max(-4, Math.min(4, eyeOffset.y * 0.45));
  const headTilt = Math.max(-3.5, Math.min(3.5, -headOffset.x * 0.06));

  return (
    <svg
      ref={svgRef}
      viewBox={`${frame.x.toFixed(1)} ${frame.y.toFixed(1)} ${frame.w.toFixed(1)} ${frame.h.toFixed(1)}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ "--slide": `${frame.slide}px` } as React.CSSProperties}
      className={styles.scene}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={id("wall")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e1e28" />
          <stop offset="55%" stopColor="#16161e" />
          <stop offset="100%" stopColor="#0e0e14" />
        </linearGradient>
        <linearGradient id={id("floor")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a1a22" />
          <stop offset="100%" stopColor="#070709" />
        </linearGradient>
        <linearGradient id={id("wood")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a392b" />
          <stop offset="55%" stopColor="#3a2c22" />
          <stop offset="100%" stopColor="#271e18" />
        </linearGradient>
        <linearGradient id={id("rail")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#86694d" />
          <stop offset="100%" stopColor="#5b4633" />
        </linearGradient>
        <linearGradient id={id("blanket")} x1="0.1" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="#586372" />
          <stop offset="45%" stopColor="#434e5c" />
          <stop offset="100%" stopColor="#2a323c" />
        </linearGradient>
        <linearGradient id={id("sheet")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f1ebd9" />
          <stop offset="100%" stopColor="#d6cdb6" />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffd8a3" stopOpacity="0.9" />
          <stop offset="42%" stopColor="#efa968" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#efa968" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("wash")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffc78c" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#ffc78c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("pool")} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#c99a63" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#c99a63" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={id("under")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={id("vignette")} cx="0.5" cy="0.44" r="0.8">
          <stop offset="52%" stopColor="#040406" stopOpacity="0" />
          <stop offset="100%" stopColor="#040406" stopOpacity="0.72" />
        </radialGradient>
      </defs>

      {/* ---------- room shell ---------- */}
      <rect width="1600" height="920" fill={`url(#${id("wall")})`} />
      <rect y="560" width="1600" height="360" fill={`url(#${id("floor")})`} />
      <rect y="552" width="1600" height="8" fill="#2a2a34" />
      <rect y="559" width="1600" height="2" fill="#000000" opacity="0.55" />

      {/* rug */}
      <g>
        <ellipse cx="700" cy="768" rx="430" ry="104" fill="#1b1a22" />
        <ellipse cx="700" cy="768" rx="404" ry="92" fill="none" stroke="#2b2933" strokeWidth="3" />
        <ellipse cx="700" cy="768" rx="300" ry="64" fill="none" stroke="#232230" strokeWidth="2" />
      </g>

      <ellipse cx="1110" cy="380" rx="330" ry="320" fill={`url(#${id("wash")})`} />
      <ellipse cx="760" cy="700" rx="620" ry="150" fill={`url(#${id("pool")})`} />

      {/* framed print above the bed */}
      <g>
        <rect x="642" y="196" width="176" height="130" rx="2" fill="#241c17" />
        <rect x="652" y="206" width="156" height="110" fill="#0a0a0e" />
        <circle cx="730" cy="250" r="18" fill="none" stroke="#4b3f31" strokeWidth="3" />
        <path d="M 690 288 H 770" stroke="#3d3429" strokeWidth="3" />
      </g>

      {/* ---------- bed (single bed: 520 long, ~1.1x his height) ---------- */}
      {/* headboard */}
      <g>
        <path
          d="M 500 556 V 420 Q 500 402 518 402 H 942 Q 960 402 960 420 V 556 Z"
          fill={`url(#${id("wood")})`}
        />
        <rect x="520" y="424" width="400" height="112" rx="6" fill="#000000" opacity="0.13" />
        <path d="M 730 424 V 536" stroke="#000000" strokeOpacity="0.16" strokeWidth="2" />
        <rect x="488" y="384" width="484" height="20" rx="10" fill={`url(#${id("rail")})`} />
        <rect x="496" y="387" width="468" height="3" rx="1.5" fill="#b08f6b" opacity="0.45" />
        <rect x="478" y="404" width="20" height="152" rx="6" fill="#43342a" />
        <rect x="962" y="404" width="20" height="152" rx="6" fill="#2c211a" />
      </g>

      {/* mattress */}
      <g>
        <path d="M 470 614 V 570 Q 470 556 488 556 H 972 Q 990 556 990 570 V 614 Z" fill="#ded7c2" />
        <path d="M 470 570 Q 470 556 488 556 H 972 Q 990 556 990 570 V 582 H 470 Z" fill="#f2ecdb" />
        <rect x="470" y="598" width="520" height="16" fill="#c7bea7" opacity="0.75" />
      </g>

      {/* base + legs */}
      <g>
        <rect x="486" y="614" width="488" height="44" fill="#241c15" />
        <rect x="486" y="614" width="488" height="5" fill="#3a2c21" />
        <path d="M 512 658 L 546 658 L 540 684 L 518 684 Z" fill="#181210" />
        <path d="M 914 658 L 948 658 L 942 684 L 920 684 Z" fill="#181210" />
        <ellipse cx="730" cy="690" rx="300" ry="20" fill={`url(#${id("under")})`} />
      </g>

      {/* pillow */}
      <g>
        <path
          d="M 496 572
             C 490 544 494 514 520 501
             C 566 478 646 472 714 476
             C 760 479 786 493 790 516
             C 794 538 790 558 786 572 Z"
          fill="#e9e2ce"
        />
        <path
          d="M 520 513 C 592 496 676 494 746 507"
          stroke="#d3c9ae"
          strokeWidth="4"
          fill="none"
          opacity="0.8"
        />
        <path
          d="M 508 558 C 592 543 686 545 778 556"
          stroke="#ffffff"
          strokeOpacity="0.16"
          strokeWidth="7"
          fill="none"
        />
        <path d="M 498 572 H 784" stroke="#000000" strokeOpacity="0.18" strokeWidth="6" />
      </g>

      {/* ---------- character ---------- */}
      {/* anchor = the sleeping spot; CSS lifts him 189 and slides him 276 left.
          Rig origin is at his feet, so everything above is negative y. */}
      <g transform="translate(610 898)">
        <g className={styles.body}>
          <ellipse cx="-30" cy="8" rx="98" ry="16" fill="#000000" className={styles.groundShadow} />

          <g className={styles.bodyInner}>
            <g className={styles.lowerBody}>
              {/* legs + feet */}
              <g fill="#ECE7D5" stroke="#191B21" strokeWidth="3.2" strokeLinejoin="round">
                <rect x="-38" y="-130" width="34" height="122" rx="17" />
                <rect x="4" y="-130" width="34" height="122" rx="17" />
                <ellipse cx="-22" cy="-8" rx="31" ry="14" />
                <ellipse cx="22" cy="-8" rx="31" ry="14" />
              </g>

              {/* torso */}
              <path
                d="M -52 -104 V -286 Q -52 -322 -18 -326 Q 0 -328 18 -326 Q 52 -322 52 -286 V -104 Q 52 -96 44 -96 H -44 Q -52 -96 -52 -104 Z"
                fill="#ECE7D5"
                stroke="#191B21"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* arms hang at the sides, drawn over the torso so the seam reads */}
              <g fill="#ECE7D5" stroke="#191B21" strokeWidth="3.2" strokeLinejoin="round">
                <rect x="-70" y="-322" width="28" height="132" rx="14" />
                <rect x="42" y="-322" width="28" height="132" rx="14" />
              </g>
            </g>
          </g>

          {/* head */}
          <g transform="translate(0 -390)">
            <g className={styles.head}>
              <g className={styles.headTrack} transform={`rotate(${headTilt.toFixed(2)} 0 58)`}>
                <g transform={`translate(${(headOffset.x * 0.4).toFixed(2)} ${(headOffset.y * 0.22).toFixed(2)})`}>
                  {/* skull: wide dome + two crown bumps (stroke pass, then fill pass
                      so only the outer silhouette keeps an outline) */}
                  <g stroke="#191B21" strokeWidth="6.6" fill="#ECE7D5">
                    <ellipse cx="0" cy="6" rx="86" ry="64" />
                    <circle cx="-36" cy="-46" r="30" />
                    <circle cx="36" cy="-46" r="30" />
                  </g>
                  <g fill="#ECE7D5">
                    <ellipse cx="0" cy="6" rx="86" ry="64" />
                    <circle cx="-36" cy="-46" r="30" />
                    <circle cx="36" cy="-46" r="30" />
                  </g>

                  {/* eyes */}
                  {[-34, 34].map((cx) => (
                    <g key={cx}>
                      <ellipse cx={cx} cy="8" rx="28" ry="22" fill="#fffdf4" stroke="#191B21" strokeWidth="3.2" />
                      <g className={`${styles.eyesOpen} ${isBlinking ? styles.blink : ""}`}>
                        <circle cx={cx + pupilX} cy={10 + pupilY} r="10" fill="#23262B" />
                      </g>
                      <path
                        d={`M ${cx - 29} 6 Q ${cx} -3 ${cx + 29} 6`}
                        stroke="#191B21"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <g className={styles.eyesClosed}>
                        <ellipse cx={cx} cy="8" rx="26" ry="20" fill="#ECE7D5" />
                        <path
                          d={`M ${cx - 23} 4 Q ${cx} 19 ${cx + 23} 4`}
                          stroke="#191B21"
                          strokeWidth="3.4"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </g>
                    </g>
                  ))}

                  {/* nostrils + mouth */}
                  <ellipse cx="-12" cy="36" rx="3" ry="2.4" fill="#191B21" />
                  <ellipse cx="12" cy="36" rx="3" ry="2.4" fill="#191B21" />
                  <path
                    d="M -19 48 Q 0 58 19 48"
                    stroke="#191B21"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>

      {/* ---------- blanket in front of him ---------- */}
      <g className={styles.duvetFront}>
        <g className={styles.duvetBreath}>
          <path
            d="M 566 648
               C 554 620 566 590 598 578
               C 650 560 760 552 860 552
               C 924 552 966 552 986 560
               V 640
               C 944 656 886 630 822 640
               C 756 650 690 626 636 636
               C 606 641 586 648 566 648 Z"
            fill={`url(#${id("blanket")})`}
          />
          {/* turned-down sheet */}
          <path
            d="M 606 604
               C 656 574 756 558 852 558
               C 920 558 962 558 982 566
               C 986 568 986 574 984 578
               C 940 566 860 572 780 574
               C 706 576 646 582 616 606 Z"
            fill="#ded6bf"
            opacity="0.95"
          />
          <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="5" fill="none" strokeLinecap="round">
            <path d="M 730 604 C 800 620 878 598 944 612" />
            <path d="M 770 630 C 840 644 906 624 952 636" />
            <path d="M 958 566 C 972 584 972 598 966 610" />
          </g>
        </g>
      </g>

      {/* ---------- bedside table + lamp ---------- */}
      <g>
        <rect x="1032" y="452" width="150" height="200" fill="#2c221b" />
        <rect x="1024" y="444" width="166" height="14" rx="3" fill="#3f2f23" />
        <rect x="1050" y="486" width="114" height="66" rx="2" fill="none" stroke="#1a1310" strokeWidth="2" />
        <circle cx="1107" cy="519" r="4.5" fill="#a48a5c" />
        <rect x="1032" y="452" width="7" height="200" fill="#000000" opacity="0.22" />

        <ellipse cx="1107" cy="386" rx="240" ry="220" fill={`url(#${id("glow")})`} className={styles.lampGlow} />

        <rect x="1103" y="372" width="8" height="74" fill="#3a2c22" />
        <ellipse cx="1107" cy="444" rx="27" ry="7" fill="#382a21" />
        <path d="M 1072 372 L 1142 372 L 1160 328 L 1054 328 Z" fill="#dca76c" />
        <path d="M 1072 372 L 1142 372 L 1160 328 L 1054 328 Z" fill="#000000" opacity="0.1" />
        <rect x="1052" y="324" width="110" height="6" rx="3" fill="#eab982" />
        <ellipse cx="1107" cy="373" rx="35" ry="6" fill="#ffe6bb" opacity="0.8" />
      </g>

      {/* ---------- grades ---------- */}
      <rect width="1600" height="920" fill={`url(#${id("vignette")})`} pointerEvents="none" />
      <rect
        width="1600"
        height="920"
        fill="#0a1220"
        className={styles.nightShade}
        pointerEvents="none"
      />
    </svg>
  );
}
