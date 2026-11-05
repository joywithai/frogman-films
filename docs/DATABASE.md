# Frogman Films — Database Architecture & Data Dictionary

Database engine: **PostgreSQL**  
ORM: **Prisma**

---

## 1. Entity Relationship Overview

- **User**: Patrons and Studio Archivists.
- **Account / Session**: Authentication tokens and provider accounts.
- **Category**: Shop taxonomy (Stickers, Prints, Storybooks, Merchandise, Digital Archive).
- **Product & ProductVariant**: Merchandise objects with integer minor-unit pricing (`priceCents`), SKUs, and inventory.
- **Film & VideoAsset**: Cinematic releases with archive IDs (`FF-ARCHIVE-XXX`), aspect ratios, tags, and video provider metadata.
- **Book**: Physical and digital storybooks with folio identifiers (`FOLIO-NXX`), dimensions, and private file keys.
- **Order & OrderItem**: Complete historical snapshot of sales.
- **Payment**: Provider transaction tracking with idempotent webhooks.
- **DigitalEntitlement**: Cryptographic tokens for digital storybook downloads.

---

## 2. Minor-Unit Currency Standard

All prices are stored in minor units (`Int` cents) rather than floating point numbers.
- `$14.00` is stored as `1400`.
- `$38.00` is stored as `3800`.
- `$125.00` is stored as `12500`.

This prevents floating-point rounding inaccuracies during multi-item tax, discount, or shipping calculations.

---

## 3. Historical Order Snapshots

`OrderItem` records do not merely reference the product ID; they freeze the snapshot data:
- `snapshotTitle`: Title at moment of sale.
- `snapshotSku`: SKU at moment of sale.
- `snapshotVariant`: Chosen variant name.
- `unitPriceCents`: Price charged.
- `totalPriceCents`: Line total.
- `format`: PHYSICAL | DIGITAL | HYBRID.

This guarantees accounting and receipt integrity even if a catalog product is subsequently renamed, repriced, or retired.
