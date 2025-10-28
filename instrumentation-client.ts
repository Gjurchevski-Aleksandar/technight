import posthog from "posthog-js"

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
  api_host: "/ingest",
  ui_host: "https://eu.posthog.com",
  defaults: '2025-05-24',
  capture_exceptions: true, // This enables capturing exceptions using Error Tracking
  debug: process.env.NODE_ENV === "development",
  // Configure Web Vitals to handle high values in development
  capture_performance: {
    __web_vitals_max_value: process.env.NODE_ENV === "development" ? 3600000 : 900000, // 1 hour in dev, 15min in prod
    // Alternative: Disable web vitals entirely in development
    // web_vitals_allowed_metrics: process.env.NODE_ENV === "development" ? [] : ['LCP', 'CLS', 'FCP', 'INP'],
  },
})
