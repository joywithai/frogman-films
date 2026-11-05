# Frogman Films — Artist Asset Handoff Checklist & Technical Rig Specifications

**Canvas Standard:** `800px × 600px` (Aspect Ratio 4:3)  
**Origin / Coordinate Space:** Top-left `(0, 0)`  
**Character Proportions:** 6 Head Units total (Turnaround Sheet 01)  
**Palette:** Cream character skin `#ECE7D5` / `#F6F3E7`, dark ink outlines `#1F1E1B`

---

## 1. 2D Layer Breakdown & Anchor Points

| Layer ID | Asset Name | Dimensions | Anchor Point `(x, y)` | Notes |
| :--- | :--- | :--- | :--- | :--- |
| `L01_BG` | Bedroom Ambient Wall & Floor | 800 × 600 px | `(0, 0)` | Near-black `#0C0C0F` with wooden wainscot line at `y = 360` |
| `L02_TABLE` | Bedside Nightstand & Lamp | 110 × 260 px | `(60, 260)` | Warm glow radial gradient centered at `(115, 278)` |
| `L03_HEADBOARD` | Antique Wood Headboard | 460 × 240 px | `(220, 140)` | Dark walnut `#261F1C` with bevel moulding at `y = 132` |
| `L04_MATTRESS` | Base Mattress & Frame | 440 × 140 px | `(240, 320)` | Deep slate `#15171A` |
| `L05_PILLOWS` | Sleeping Pillow with Dent | 220 × 90 px | `(280, 245)` | Off-white linen `#D8D4C3` with center indentation |
| `L06_BODY_SEATED` | Frogman Seated Torso | 160 × 100 px | `(320, 230)` | Connects to duvet at `y = 320`. Fades in on wake-up |
| `L07_HEAD` | Frogman Head Contour | 175 × 135 px | `(390, 220)` | Center of rotation for anticipation tilt (`max ±4°`) |
| `L08_EYES_SOCKET` | Left & Right Eye Cavities | 40 × 30 px ea | `(340, 172)`, `(440, 172)` | Cream background `#F8F6EE` with heavy top brow arc |
| `L09_PUPILS` | Left & Right Dark Pupils | 11 × 11 px ea | Clamped: `dx ±12px`, `dy ±8px` | Features white catchlight dot at `(-1.5, -2)` |
| `L10_EYELIDS` | Multi-State Eyelids | 42 × 30 px ea | Anchored to socket | Asleep: closed; Awake: half-lidded signature Neutral |
| `L11_BLANKET_TRIM` | Folded Cream Sheet Flap | 460 × 35 px | `(230, 310)` | Curved linen contour along top edge of quilt |
| `L12_BLANKET_MAIN` | Heavy Wool Quilt Duvet | 500 × 210 px | `(210, 330)` | Deep teal-charcoal `#2C353D` to `#1B2126` gradient |
| `L13_FOOTBOARD` | Brass & Wood Foot Rail | 520 × 40 px | `(200, 500)` | Foreground framing element |

---

## 2. Approved Canonical Model References

1. **Turnaround & Proportion Sheet (Sheet 01):**
   - Available at `public/frogman/model-sheet-01.jpg`.
   - Orthographic views: Front `(0°)`, 3/4 Front `(45°)`, Side `(90°)`, 3/4 Back `(135°)`, Back `(180°)`.
   - Shoulder width = `1.5 × Head width`.

2. **Facial Expression Sheet (Sheet 02):**
   - Available at `public/frogman/expression-sheet-02.jpg`.
   - 12 Core Emotions: Neutral, Happy, Sad, Angry, Surprised, Scared, Disgusted, Confused, Smirk, Crying, Laughing, Annoyed.
   - Squash & Stretch deformation limit: `max ±15%`.
