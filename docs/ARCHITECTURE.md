# Frogman Films — System Architecture & Technical Specifications

**Brand:** Frogman Films  
**Character:** Frogman  
**Core UI Tone:** `#070709` / `rgb(7, 7, 9)`  
**Aesthetic:** Vintage Book / Old Film Archive (Editorial Serif headlines, readable UI sans, folio numbers, thin archival rules, restrained film grain, generous spacing).

---

## 1. High-Level Architecture

The Frogman Films platform is built as an end-to-end, production-minded Next.js App Router application with PostgreSQL and Prisma ORM.

```
                           [ Web / Mobile Clients ]
                                      |
                           [ Next.js App Router ]
                     (React 19 Server & Client Components)
                   /            |                 \
                  /             |                  \
        [ Public Routes ]  [ Auth & Account ]   [ Admin Console ]
        - Hero Bedroom     - Patron Profile     - Releases & Vault
        - Film Archives    - Orders Ledger      - Inventory & Stock
        - Storybook Folios - Digital Vault      - Fulfilment Ledger
        - Studio Artifacts                      - Adapter Status
                  \             |                  /
                   \            |                 /
                   [ Server Actions & API Handlers ]
                    - Server-side Price Revalidation
                    - Stock Decrement Transactions
                    - HMAC Signed Download Tokens
                                |
             +------------------+------------------+
             |                                     |
      [ Prisma Client ]                   [ Provider Adapters ]
             |                                     |
   [ PostgreSQL Database ]               - Video (Mux / Stream)
   - Canonical Catalog Models            - Payments (Stripe / Regional)
   - Order & Item Snapshots              - Storage (S3 / R2)
   - Digital Entitlement Tokens          - Postal Email (Resend)
```

---

## 2. The Signature Hero: Frogman's Bedroom

The primary interactive brand feature is an interactive 2D bedroom scene:
1. **Initial State:** Frogman begins asleep in bed under a layered quilt duvet.
2. **Pointer Tracking:** Coordinates are tracked strictly inside the hero container, normalized, and smoothed using a damping loop (`ease = 0.12`).
3. **Eyeball Dynamics:** The pupils follow the pointer smoothly, clamped to a safe radius within the eye socket.
4. **Head Anticipation:** Subtle rotation and horizontal translation tilt towards the pointer.
5. **Wake-Up Sequence:**
   - Eyelids react with an authentic opening blink.
   - Head lifts from the pillow.
   - Upper body smoothly rises from under the blanket.
   - Settles into an upright seated position.
   - Frogman looks attentively toward the visitor's cursor.
6. **Interaction Affordances:**
   - Cursor proximity trigger.
   - Click/tap anywhere on the scene.
   - Accessible keyboard-operable `"Wake Frogman"` / `"Let Frogman Rest"` button.
   - Automatic `prefers-reduced-motion` compliance.

---

## 3. Strict Architectural Rules Enforced

- **No Faked Playback:** If `VIDEO_API_TOKEN` is missing, the player cleanly displays `"Video provider not configured"` with full archive reel metadata.
- **No Faked Payments:** Without real credentials, the checkout runs in clearly labelled `"SANDBOX TEST MODE"`.
- **Zero Client Trust:** Prices, stock, and totals are revalidated server-side before order creation.
- **Historical Snapshots:** Every order persists frozen snapshots of item title, SKU, variant, unit price, and currency at the moment of purchase.
- **Protected Downloads:** Digital storybooks and stems are never exposed via static URLs; access requires time-limited HMAC-SHA256 signed tokens.
