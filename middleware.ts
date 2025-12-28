import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_HOSTS = new Set([
  "www.socialite.page",
  "socialite.page",
]);

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();

  // Allow local dev
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  // Block everything except your two domains (including *.vercel.app preview URLs)
  if (!ALLOWED_HOSTS.has(host)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return NextResponse.next();
}

// Apply to ALL paths (including assets) so preview hosts can't even load static files
export const config = {
  matcher: ["/:path*"],
};
