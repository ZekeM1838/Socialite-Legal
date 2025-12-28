import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================
// ALLOWED HOSTS - Only these can access the site
// ============================================
const ALLOWED_HOSTS = new Set([
  "www.socialite.page",
  "socialite.page",
]);

// ============================================
// BLOCKED PATHS - Common attack vectors & junk probes
// These paths should NEVER exist on your site
// ============================================
const BLOCKED_PATHS = new Set([
  // Environment & config files
  "/.env",
  "/.env.local",
  "/.env.production",
  "/.env.development",
  "/.git",
  "/.git/config",
  "/.git/HEAD",
  "/.gitignore",
  "/.svn",
  "/.hg",
  
  // WordPress / PHP probes (you're not running PHP)
  "/wp-login.php",
  "/wp-admin",
  "/wp-admin/",
  "/wp-content",
  "/wp-includes",
  "/xmlrpc.php",
  "/wp-config.php",
  "/wp-cron.php",
  "/wordpress",
  "/blog/wp-login.php",
  
  // Database & admin panels
  "/phpmyadmin",
  "/phpMyAdmin",
  "/pma",
  "/adminer.php",
  "/adminer",
  "/mysql",
  "/mysqladmin",
  
  // Common CMS/framework probes
  "/administrator",
  "/admin.php",
  "/admin/login",
  "/drupal",
  "/joomla",
  "/magento",
  
  // Config/backup files
  "/config.php",
  "/configuration.php",
  "/settings.php",
  "/database.sql",
  "/backup.sql",
  "/dump.sql",
  "/db.sql",
  "/.htaccess",
  "/.htpasswd",
  "/web.config",
  
  // AWS/cloud metadata (SSRF attempts)
  "/latest/meta-data",
  "/latest/user-data",
  
  // Other common probes
  "/cgi-bin",
  "/shell",
  "/cmd",
  "/eval",
  "/debug",
  "/test.php",
  "/info.php",
  "/phpinfo.php",
  "/server-status",
  "/server-info",
  "/.well-known/security.txt", // You can remove this if you add one
]);

// ============================================
// BLOCKED PATH PREFIXES - Block entire directories
// ============================================
const BLOCKED_PREFIXES = [
  "/wp-",
  "/wordpress/",
  "/.git/",
  "/.svn/",
  "/cgi-bin/",
  "/admin/",
  "/backup/",
  "/old/",
  "/temp/",
  "/tmp/",
];

// ============================================
// BLOCKED EXTENSIONS - Files that should never be served
// ============================================
const BLOCKED_EXTENSIONS = [
  ".php",
  ".asp",
  ".aspx",
  ".jsp",
  ".cgi",
  ".pl",
  ".py",    // Don't serve raw Python
  ".rb",    // Don't serve raw Ruby
  ".sql",
  ".bak",
  ".backup",
  ".old",
  ".orig",
  ".swp",
  ".log",
  ".ini",
  ".conf",
  ".config",
];

export function middleware(req: NextRequest) {
  const host = (req.headers.get("host") || "").toLowerCase();
  const pathname = req.nextUrl.pathname.toLowerCase();
  const url = req.nextUrl;

  // ==========================================
  // 1. Allow local development
  // ==========================================
  if (host.startsWith("localhost") || host.startsWith("127.0.0.1")) {
    return NextResponse.next();
  }

  // ==========================================
  // 2. Block requests not from allowed hosts
  //    (Blocks direct Vercel URL access, etc.)
  // ==========================================
  if (!ALLOWED_HOSTS.has(host)) {
    return new NextResponse("Not Found", { status: 404 });
  }

  // ==========================================
  // 3. Block known bad paths (junk probes)
  // ==========================================
  if (BLOCKED_PATHS.has(pathname)) {
    // Return 404 to not reveal what exists
    // Could also return 403 or just close connection
    return new NextResponse("Not Found", { status: 404 });
  }

  // ==========================================
  // 4. Block bad path prefixes
  // ==========================================
  for (const prefix of BLOCKED_PREFIXES) {
    if (pathname.startsWith(prefix)) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // ==========================================
  // 5. Block dangerous file extensions
  // ==========================================
  for (const ext of BLOCKED_EXTENSIONS) {
    if (pathname.endsWith(ext)) {
      return new NextResponse("Not Found", { status: 404 });
    }
  }

  // ==========================================
  // 6. Block suspiciously long paths (often attacks)
  // ==========================================
  if (pathname.length > 500) {
    return new NextResponse("URI Too Long", { status: 414 });
  }

  // ==========================================
  // 7. Block paths with suspicious patterns
  // ==========================================
  const suspiciousPatterns = [
    /\.\.\//, // Path traversal
    /\.\.\\/, // Windows path traversal
    /%2e%2e/i, // URL-encoded path traversal
    /<script/i, // XSS in URL
    /javascript:/i, // XSS
    /data:/i, // Data URI (sometimes malicious)
    /vbscript:/i, // VBScript injection
    /onload=/i, // Event handler injection
    /onerror=/i, // Event handler injection
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(pathname) || pattern.test(url.search)) {
      return new NextResponse("Bad Request", { status: 400 });
    }
  }

  // ==========================================
  // 8. Enforce HTTPS redirect (Cloudflare usually handles this)
  // ==========================================
  // Cloudflare handles this via "Always Use HTTPS" setting
  // But as defense in depth:
  const proto = req.headers.get("x-forwarded-proto");
  if (proto === "http" && !host.startsWith("localhost")) {
    const httpsUrl = new URL(url);
    httpsUrl.protocol = "https:";
    return NextResponse.redirect(httpsUrl, 301);
  }

  // ==========================================
  // 9. Add security headers to response
  // ==========================================
  const response = NextResponse.next();
  
  // These supplement what's in next.config.ts headers()
  // and help with requests that bypass static caching
  response.headers.set("X-Robots-Tag", "index, follow");
  
  return response;
}

// ============================================
// MATCHER - Apply to all paths
// ============================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * 
     * But we DO want to check other paths for security
     */
    "/((?!_next/static|_next/image).*)",
  ],
};
