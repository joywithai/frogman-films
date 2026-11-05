"use client";

import React, { useId } from "react";

export interface FrogmanRigProps {
  isAwake: boolean;
  eyeOffset: { x: number; y: number };
  headOffset: { x: number; y: number };
  isBlinking: boolean;
  className?: string;
}

export const FrogmanRig: React.FC<FrogmanRigProps> = ({
  isAwake,
  eyeOffset,
  headOffset,
  isBlinking,
  className = "",
}) => {
  const filterId = useId();

  // Clamp pupil offsets safely so they stay inside the eye socket
  const pupilX = Math.max(-12, Math.min(12, eyeOffset.x));
  const pupilY = Math.max(-8, Math.min(8, eyeOffset.y));

  // Head anticipation tilt
  const headRotation = headOffset.x * 0.15;
  const headTranslateX = headOffset.x * 0.3;
  const headTranslateY = isAwake ? headOffset.y * 0.2 : 0;

  return (
    <svg
      viewBox="0 0 800 600"
      className={`w-full h-full select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Interactive 2D Frogman bedroom scene"
    >
      <defs>
        {/* Soft shadow under bed and headboard */}
        <filter id={`shadow-${filterId}`} x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000000" floodOpacity="0.6" />
        </filter>

        {/* Vintage warm bedroom lamp glow */}
        <radialGradient id={`lampGlow-${filterId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffeed2" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#e3a857" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#070709" stopOpacity="0" />
        </radialGradient>

        {/* Linen texture gradient for duvet/blanket */}
        <linearGradient id={`blanketGrad-${filterId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d4953" />
          <stop offset="45%" stopColor="#2c353d" />
          <stop offset="100%" stopColor="#1b2126" />
        </linearGradient>

        {/* Sheet trim gradient */}
        <linearGradient id={`sheetTrim-${filterId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#d5d0bf" />
          <stop offset="50%" stopColor="#ece7d5" />
          <stop offset="100%" stopColor="#d5d0bf" />
        </linearGradient>
      </defs>

      {/* ========================================================
          LAYER 1: BEDROOM ARCHIVAL AMBIENT BACKGROUND
          ======================================================== */}
      {/* Dark vintage room backdrop */}
      <rect width="800" height="600" fill="#0c0c0f" />

      {/* Wall wainscoting / wooden panelling line */}
      <line x1="0" y1="360" x2="800" y2="360" stroke="#1d1d22" strokeWidth="2" />
      <line x1="0" y1="364" x2="800" y2="364" stroke="#141418" strokeWidth="1" />

      {/* Bedside table on the left */}
      <g id="bedside-table" transform="translate(60, 260)">
        <rect x="0" y="70" width="110" height="180" rx="3" fill="#1b1715" stroke="#29221e" strokeWidth="2" />
        {/* Table drawer & brass pull */}
        <rect x="10" y="85" width="90" height="40" rx="2" fill="#241e1b" stroke="#332a24" strokeWidth="1.5" />
        <circle cx="55" cy="105" r="4" fill="#a48a5c" />
        {/* Vintage lamp stem & shade */}
        <line x1="55" y1="20" x2="55" y2="70" stroke="#4a3e35" strokeWidth="4" strokeLinecap="round" />
        <path d="M 25 22 L 85 22 L 72 -15 L 38 -15 Z" fill="#2b2622" stroke="#443931" strokeWidth="1.5" />
        {/* Warm lamp glow bulb */}
        <circle cx="55" cy="18" r="140" fill={`url(#lampGlow-${filterId})`} pointerEvents="none" />
        <circle cx="55" cy="18" r="6" fill="#fff7e6" />
      </g>

      {/* Vintage framed picture on wall above bed */}
      <g id="wall-picture" transform="translate(480, 70)">
        <rect x="0" y="0" width="130" height="100" rx="2" fill="#141418" stroke="#2c2723" strokeWidth="4" />
        <rect x="10" y="10" width="110" height="80" fill="#08080a" />
        {/* Archival miniature drawing inside frame */}
        <circle cx="65" cy="46" r="16" fill="#1a1c1e" />
        <path d="M 40 76 Q 65 52 90 76 Z" fill="#252a2f" />
        <line x1="65" y1="12" x2="65" y2="0" stroke="#443c34" strokeWidth="1.5" />
      </g>

      {/* ========================================================
          LAYER 2: BED STRUCTURE & HEADBOARD
          ======================================================== */}
      {/* Wood headboard */}
      <g id="headboard" filter={`url(#shadow-${filterId})`}>
        <rect x="220" y="140" width="460" height="240" rx="8" fill="#261f1c" stroke="#382e2a" strokeWidth="3" />
        {/* Vertical panel details */}
        <line x1="335" y1="150" x2="335" y2="340" stroke="#1a1513" strokeWidth="2" />
        <line x1="450" y1="150" x2="450" y2="340" stroke="#1a1513" strokeWidth="2" />
        <line x1="565" y1="150" x2="565" y2="340" stroke="#1a1513" strokeWidth="2" />
        {/* Top moulding strip */}
        <rect x="210" y="132" width="480" height="16" rx="4" fill="#382e2a" stroke="#483c37" strokeWidth="1.5" />
      </g>

      {/* Mattress / base */}
      <rect x="240" y="320" width="440" height="140" rx="4" fill="#15171a" stroke="#22252a" strokeWidth="2" />

      {/* Pillows */}
      <g id="pillows">
        {/* Backing pillow */}
        <rect x="290" y="240" width="220" height="90" rx="20" fill="#1e2226" stroke="#2e353c" strokeWidth="2" />
        {/* Main sleeping pillow with dent */}
        <path
          d="M 280 270 C 280 245, 330 240, 390 245 C 450 240, 500 245, 500 270 C 500 300, 460 315, 390 315 C 320 315, 280 300, 280 270 Z"
          fill="#d8d4c3"
          stroke="#443f38"
          strokeWidth="2.5"
        />
        {/* Pillow crease shadow */}
        <path d="M 330 275 Q 390 286 450 275" stroke="#b2ad9a" strokeWidth="2" fill="none" strokeLinecap="round" />
      </g>

      {/* ========================================================
          LAYER 3: FROGMAN CHARACTER RIG (Authentic Proportions)
          ======================================================== */}
      <g
        id="frogman-character"
        className="transition-transform duration-700 ease-out"
        style={{
          transform: isAwake
            ? `translate(0px, -65px)`
            : `translate(0px, 0px)`,
        }}
      >
        {/* Seated torso (becomes visible and smoothly rises when awake) */}
        <g
          id="frogman-torso"
          className="transition-opacity duration-500 ease-in-out"
          style={{
            opacity: isAwake ? 1 : 0.2,
          }}
        >
          {/* Authentic cream body silhouette from turnaround sheet 01 */}
          <path
            d="M 320 320 C 310 270, 340 230, 390 230 C 440 230, 470 270, 460 320 Z"
            fill="#ece7d5"
            stroke="#1f1e1b"
            strokeWidth="3.5"
          />
          {/* Subtle chest contour & collar line */}
          <path
            d="M 370 255 Q 390 265 410 255"
            stroke="#1f1e1b"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Frogman Head & Features Group (interactive anticipation tilt) */}
        <g
          id="frogman-head-group"
          style={{
            transform: `translate(${headTranslateX}px, ${headTranslateY}px) rotate(${headRotation}deg)`,
            transformOrigin: "390px 220px",
            transition: "transform 0.18s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
        >
          {/* Authentic Frogman Head Outline
              Features two prominent rounded domes at top, tapered cheeks, smooth chin */}
          <path
            d="M 305 210
               C 300 160, 335 130, 360 135
               C 375 138, 385 152, 390 155
               C 395 152, 405 138, 420 135
               C 445 130, 480 160, 475 210
               C 475 250, 445 265, 390 265
               C 335 265, 305 250, 305 210 Z"
            fill="#ece7d5"
            stroke="#1f1e1b"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Under-chin shadow */}
          <path
            d="M 350 258 Q 390 266 430 258"
            stroke="#d4ceb8"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />

          {/* Characteristic Nostrils (two small neat dots from Model Sheet 02) */}
          <circle cx="383" cy="214" r="2" fill="#1f1e1b" />
          <circle cx="397" cy="214" r="2" fill="#1f1e1b" />

          {/* Character Mouth (Wide, relaxed line) */}
          {isAwake ? (
            /* Gentle subtle waking curve */
            <path
              d="M 345 236 Q 390 248 435 236"
              stroke="#1f1e1b"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
            />
          ) : (
            /* Calm straight sleeping expression line */
            <line
              x1="348"
              y1="236"
              x2="432"
              y2="236"
              stroke="#1f1e1b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          )}

          {/* ========================================================
              LEFT EYE ASSEMBLY
              ======================================================== */}
          <g id="left-eye" transform="translate(340, 172)">
            {/* Eye socket white/cream interior */}
            <ellipse cx="0" cy="0" rx="20" ry="15" fill="#f8f6ee" stroke="#1f1e1b" strokeWidth="3" />

            {/* Moving pupil */}
            <g
              style={{
                transform: isAwake
                  ? `translate(${pupilX}px, ${pupilY}px)`
                  : `translate(0px, 3px)`,
                transition: "transform 0.08s ease-out",
              }}
            >
              <circle cx="0" cy="0" r="5.5" fill="#1f1e1b" />
              {/* Catchlight */}
              <circle cx="-1.5" cy="-2" r="1.5" fill="#ffffff" />
            </g>

            {/* Heavy sleepy eyelid */}
            {/* When asleep: closed lid covering pupil */}
            {/* When awake: half-lidded signature expression from sheet 02 (Neutral emotion) */}
            {isBlinking || !isAwake ? (
              <path
                d="M -21 1 Q 0 8 21 1 Q 0 -1 21 -1 L -21 -1 Z"
                fill="#ece7d5"
                stroke="#1f1e1b"
                strokeWidth="3.5"
              />
            ) : (
              <path
                d="M -20 -15 L 20 -15 L 20 -2 Q 0 4 -20 -2 Z"
                fill="#ece7d5"
                stroke="#1f1e1b"
                strokeWidth="2.5"
              />
            )}

            {/* Signature relaxed horizontal brow from Sheet 02 */}
            <path
              d="M -22 -15 Q 0 -18 22 -14"
              stroke="#1f1e1b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* ========================================================
              RIGHT EYE ASSEMBLY
              ======================================================== */}
          <g id="right-eye" transform="translate(440, 172)">
            {/* Eye socket white/cream interior */}
            <ellipse cx="0" cy="0" rx="20" ry="15" fill="#f8f6ee" stroke="#1f1e1b" strokeWidth="3" />

            {/* Moving pupil */}
            <g
              style={{
                transform: isAwake
                  ? `translate(${pupilX}px, ${pupilY}px)`
                  : `translate(0px, 3px)`,
                transition: "transform 0.08s ease-out",
              }}
            >
              <circle cx="0" cy="0" r="5.5" fill="#1f1e1b" />
              {/* Catchlight */}
              <circle cx="-1.5" cy="-2" r="1.5" fill="#ffffff" />
            </g>

            {/* Heavy sleepy eyelid */}
            {isBlinking || !isAwake ? (
              <path
                d="M -21 1 Q 0 8 21 1 Q 0 -1 21 -1 L -21 -1 Z"
                fill="#ece7d5"
                stroke="#1f1e1b"
                strokeWidth="3.5"
              />
            ) : (
              <path
                d="M -20 -15 L 20 -15 L 20 -2 Q 0 4 -20 -2 Z"
                fill="#ece7d5"
                stroke="#1f1e1b"
                strokeWidth="2.5"
              />
            )}

            {/* Signature relaxed horizontal brow from Sheet 02 */}
            <path
              d="M -22 -14 Q 0 -18 22 -15"
              stroke="#1f1e1b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>

      {/* ========================================================
          LAYER 4: FOREGROUND BLANKET & DUVET FOLDS
          ======================================================== */}
      <g id="foreground-blanket" filter={`url(#shadow-${filterId})`}>
        {/* Soft folded cream sheet border along the top of duvet */}
        <path
          d="M 230 310
             C 310 305, 380 315, 470 310
             C 540 305, 630 315, 690 325
             L 690 345
             C 630 335, 540 325, 470 330
             C 380 335, 310 325, 230 330 Z"
          fill={`url(#sheetTrim-${filterId})`}
          stroke="#474136"
          strokeWidth="2"
        />

        {/* Main quilted wool duvet covering bed */}
        <path
          d="M 220 330
             C 300 325, 390 335, 480 330
             C 570 325, 640 335, 700 345
             L 710 520
             C 640 530, 480 540, 390 535
             C 300 540, 220 530, 210 510 Z"
          fill={`url(#blanketGrad-${filterId})`}
          stroke="#1b2126"
          strokeWidth="3"
        />

        {/* Diagonal linen weave / crease lines */}
        <path
          d="M 260 350 Q 360 380 440 360"
          stroke="#3d4a56"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 460 365 Q 560 395 660 375"
          stroke="#3d4a56"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 310 410 Q 420 440 540 420"
          stroke="#262f37"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Bed frame foot rail */}
      <rect x="200" y="500" width="520" height="40" rx="4" fill="#241d1a" stroke="#362c27" strokeWidth="2.5" />
      <circle cx="215" cy="520" r="4" fill="#a48a5c" />
      <circle cx="705" cy="520" r="4" fill="#a48a5c" />
    </svg>
  );
};
