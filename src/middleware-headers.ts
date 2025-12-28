// src/middleware-headers.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function addCacheHeaders(
  response: NextResponse,
  path: string
): NextResponse {
  // Legal pages - cache aggressively
  if (
    path === "/privacy" ||
    path === "/terms" ||
    path === "/cookies" ||
    path === "/guidelines"
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    );
    return response;
  }

  // Homepage - shorter cache
  if (path === "/") {
    response.headers.set(
      "Cache-Control",
      "public, max-age=1800, s-maxage=3600, stale-while-revalidate=1800"
    );
    return response;
  }

  // Static assets
  if (
    path.startsWith("/_next/static") ||
    path === "/site.webmanifest" ||
    path === "/robots.txt" ||
    path.endsWith(".png") ||
    path.endsWith(".ico")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  return response;
}
