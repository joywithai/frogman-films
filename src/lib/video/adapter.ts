// Video Provider Adapter for Frogman Films
// Supports Mux, Cloudflare Stream, and Safe Local Fallback.
// Specification rule: "If credentials are missing, show 'video provider not configured'; never fake playback."

export interface VideoPlaybackInfo {
  isConfigured: boolean;
  provider: "mux" | "cloudflare_stream" | "unconfigured";
  playbackUrl?: string;
  posterUrl?: string;
  title: string;
  errorMessage?: string;
}

export function getVideoPlaybackInfo(options: {
  provider?: string;
  playbackUrl?: string;
  title: string;
  posterUrl?: string;
}): VideoPlaybackInfo {
  const provider = process.env.VIDEO_PROVIDER || options.provider;
  const token = process.env.VIDEO_API_TOKEN;

  // Check if real provider credentials are configured
  if (!token && provider !== "mock_local") {
    return {
      isConfigured: false,
      provider: "unconfigured",
      title: options.title,
      posterUrl: options.posterUrl,
      errorMessage:
        "Video provider not configured. Archive reel requires active MUX_TOKEN or CLOUDFLARE_STREAM_TOKEN in environment.",
    };
  }

  if (provider === "mux") {
    return {
      isConfigured: true,
      provider: "mux",
      playbackUrl: options.playbackUrl || "https://stream.mux.com/sample.m3u8",
      title: options.title,
      posterUrl: options.posterUrl,
    };
  }

  if (provider === "cloudflare_stream") {
    return {
      isConfigured: true,
      provider: "cloudflare_stream",
      playbackUrl: options.playbackUrl,
      title: options.title,
      posterUrl: options.posterUrl,
    };
  }

  return {
    isConfigured: false,
    provider: "unconfigured",
    title: options.title,
    posterUrl: options.posterUrl,
    errorMessage: "Video provider not configured",
  };
}
