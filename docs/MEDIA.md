# Frogman Films — Media & Digital Assets Architecture

## 1. Video Streaming

- **Provider Isolation:** Configured in `src/lib/video/adapter.ts`. Supports Mux and Cloudflare Stream.
- **Unconfigured Guard:** If `VIDEO_API_TOKEN` is unset, the video detail page displays:
  > *"Video provider not configured. Archive reel requires active MUX_TOKEN or CLOUDFLARE_STREAM_TOKEN in environment."*
- **Playback Integrity:** Never substitutes unauthorized placeholder video feeds for canonical studio releases.

## 2. Private Digital Storybook Files

- **Storage Location:** Private object storage (S3 bucket or Cloudflare R2 bucket `frogman-vault-private`).
- **Signature Mechanism:** URLs are generated using `storageAdapter.generateSignedDownloadUrl()` with an HMAC-SHA256 signature and 1-hour expiration timestamp.
- **Verification Endpoint:** Handled by `/api/downloads` with constant-time signature comparison (`crypto.timingSafeEqual`).
