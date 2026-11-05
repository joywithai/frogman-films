# Frogman Films — Payment Integration & Regional Adapters

## 1. Multi-Provider Architecture

The payment layer is abstracted behind `PaymentAdapter` in `src/lib/payments/adapter.ts`:
1. **Stripe**: Global card payments, Apple Pay, Google Pay.
2. **SSLCOMMERZ**: Leading merchant aggregator for Bangladesh (cards, internet banking, mobile wallets).
3. **bKash**: Direct merchant payment API for Bangladesh mobile financial services.
4. **Sandbox Test Mode**: Autonomous simulated checkout when live credentials are unconfigured.

## 2. Integrity Guidelines

- **Explicit Test Mode Notice:** Whenever test mode is active, clear visual banners inform the user that no real financial charges will occur.
- **No Faked Payments:** Never simulate a successful transaction without genuine server authorization.
- **Idempotent Webhooks:** Webhook processing validates unique transaction event IDs to prevent duplicate fulfillment.
- **Client Redirect Rule:** An order is never marked as `PAID` based merely on the client's return URL. The server verifies payment directly with the provider or through signed webhook callbacks.
