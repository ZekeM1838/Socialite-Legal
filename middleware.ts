// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================================
// CONFIGURATION
// ============================================================================

const ALLOWED_HOSTS = new Set([
  "www.socialite.page",
  "socialite.page",
]);

// Paths to block immediately (common attack vectors)
const BLOCKED_PATHS = new Set([
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.git",
  "/wp-login.php",
  "/wp-admin",
  "/xmlrpc.php",
  "/phpmyadmin",
  "/config.json",
  "/admin",
  "/administrator",
  "/.well-known/security.txt", // Block if you don't have one
]);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getClientIP(req: NextRequest): string {
  // When behind Cloudflare, use CF-Connecting-IP
  const cfIp = req.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp;

  // Fallback to x-forwarded-for (first IP in the chain)
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  // Fallback to x-real-ip
  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp;

  return "unknown";
}

// ============================================================================
// CACHE HEADER CONFIGURATION
// ============================================================================

function addCacheHeaders(response: NextResponse, pathname: string): NextResponse {
  // Legal pages - cache aggressively (7 days edge, 1 day browser)
  if (
    pathname === "/privacy" ||
    pathname === "/terms" ||
    pathname === "/cookies" ||
    pathname === "/guidelines"
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400"
    );
    return response;
  }

  // Homepage - moderate cache (1 hour edge, 30 min browser)
  if (pathname === "/") {
    response.headers.set(
      "Cache-Control",
      "public, max-age=1800, s-maxage=3600, stale-while-revalidate=1800"
    );
    return response;
  }

  // Static manifests and metadata (1 day edge, 1 day browser)
  if (
    pathname === "/site.webmanifest" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600"
    );
    return response;
  }

  // Static assets from Next.js and fonts - cache forever (immutable)
  if (
    pathname.startsWith("/_next/static") ||
    pathname.startsWith("/fonts/") ||
    pathname.endsWith(".woff2") ||
    pathname.endsWith(".woff") ||
    pathname.endsWith(".ttf") ||
    pathname.endsWith(".otf")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
    return response;
  }

  // Favicon and images - cache for 1 week
  if (
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".jpeg") ||
    pathname.endsWith(".ico")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=604800, s-maxage=604800, stale-while-revalidate=86400"
    );
    return response;
  }

  // Default: no cache for dynamic content
  response.headers.set(
    "Cache-Control",
    "private, no-cache, no-store, must-revalidate"
  );
  return response;
}

// ============================================================================
// SECURITY CHECKS
// ============================================================================

function isCloudflareRequest(req: NextRequest): boolean {
  // Verify request came through Cloudflare by checking for CF headers
  const cfRay = req.headers.get("cf-ray");
  const cfConnectingIp = req.headers.get("cf-connecting-ip");
  const cfIpCountry = req.headers.get("cf-ipcountry");
  
  // At least one CF header should be present
  return !!(cfRay || cfConnectingIp || cfIpCountry);
}

function containsSuspiciousPatterns(pathname: string): boolean {
  const suspiciousPatterns = [
    "..",           // Path traversal
    "//",           // Double slashes
    ".php",         // PHP files
    ".sql",         // SQL files
    ".bak",         // Backup files
    ".zip",         // Archive files (unless you serve them)
    ".tar",
    ".gz",
    "eval(",        // Code injection attempts
    "<script",      // XSS attempts
    "SELECT%20",    // SQL injection (URL encoded)
    "UNION%20",
  ];

  const lowerPath = pathname.toLowerCase();
  return suspiciousPatterns.some(pattern => lowerPath.includes(pattern));
}

// ============================================================================
// MAIN MIDDLEWARE
// ============================================================================

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const host = (req.headers.get("host") || "").toLowerCase();
  const isLocalDev = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const clientIP = getClientIP(req);

  // -------------------------------------------------------------------------
  // 1. BLOCK MALICIOUS PATHS IMMEDIATELY
  // -------------------------------------------------------------------------
  if (BLOCKED_PATHS.has(pathname) || containsSuspiciousPatterns(pathname)) {
    console.warn(`[SECURITY] Blocked malicious path: ${pathname} from ${clientIP}`);
    return new NextResponse("Not Found", { status: 404 });
  }

  // -------------------------------------------------------------------------
  // 2. LOCAL DEVELOPMENT - ALLOW EVERYTHING
  // -------------------------------------------------------------------------
  if (isLocalDev) {
    const response = NextResponse.next();
    return addCacheHeaders(response, pathname);
  }

  // -------------------------------------------------------------------------
  // 3. PRODUCTION: VERIFY CLOUDFLARE ORIGIN
  // -------------------------------------------------------------------------
  if (process.env.NODE_ENV === "production" && !isCloudflareRequest(req)) {
    console.warn(`[SECURITY] Direct origin access attempt: ${host}${pathname} from ${clientIP}`);
    return new NextResponse("Forbidden - Direct origin access not allowed", {
      status: 403,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  // -------------------------------------------------------------------------
  // 4. VALIDATE HOST (BLOCK VERCEL PREVIEW URLS & UNAUTHORIZED DOMAINS)
  // -------------------------------------------------------------------------
  if (!ALLOWED_HOSTS.has(host)) {
    console.warn(`[SECURITY] Unauthorized host access: ${host}${pathname}`);
    return new NextResponse("Not Found", { status: 404 });
  }

  // -------------------------------------------------------------------------
  // 5. ADD SECURITY HEADERS + CACHE HEADERS
  // -------------------------------------------------------------------------
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );
  
  // Add cache headers based on path
  addCacheHeaders(response, pathname);

  // Optional: Log cache status in development (remove in prod)
  if (process.env.NODE_ENV === "development") {
    const cacheControl = response.headers.get("cache-control");
    console.log(`[CACHE] ${pathname} → ${cacheControl}`);
  }

  return response;
}

// ============================================================================
// MATCHER CONFIGURATION
// ============================================================================

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * 
     * Note: We still want to add cache headers to static files,
     * so we handle them in the middleware but let them pass through
     */
    "/((?!_next/image).*)",
  ],
};
