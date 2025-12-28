#!/bin/bash
# test-caching.sh - Run this after deploying to verify caching is working
# Usage: ./test-caching.sh [domain]
# Example: ./test-caching.sh socialite.page

DOMAIN="${1:-socialite.page}"
BASE_URL="https://${DOMAIN}"

echo "=========================================="
echo "Testing Caching for: ${BASE_URL}"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

check_cache() {
    local path=$1
    local description=$2
    
    echo "Checking: ${path} (${description})"
    
    # Make the request and capture headers
    HEADERS=$(curl -sI "${BASE_URL}${path}" 2>&1)
    
    # Extract cf-cache-status
    CF_STATUS=$(echo "$HEADERS" | grep -i "cf-cache-status" | awk '{print $2}' | tr -d '\r')
    
    # Extract cache-control
    CACHE_CONTROL=$(echo "$HEADERS" | grep -i "cache-control" | head -1 | cut -d: -f2- | tr -d '\r')
    
    # Check for security headers
    X_FRAME=$(echo "$HEADERS" | grep -i "x-frame-options" | awk '{print $2}' | tr -d '\r')
    
    if [ "$CF_STATUS" = "HIT" ]; then
        echo -e "  cf-cache-status: ${GREEN}${CF_STATUS}${NC} ✓"
    elif [ "$CF_STATUS" = "MISS" ]; then
        echo -e "  cf-cache-status: ${YELLOW}${CF_STATUS}${NC} (will be HIT on next request)"
    elif [ "$CF_STATUS" = "DYNAMIC" ]; then
        echo -e "  cf-cache-status: ${RED}${CF_STATUS}${NC} ✗ (not being cached!)"
    else
        echo -e "  cf-cache-status: ${YELLOW}${CF_STATUS:-not found}${NC}"
    fi
    
    echo "  cache-control:${CACHE_CONTROL:-not set}"
    echo "  x-frame-options: ${X_FRAME:-not set}"
    echo ""
}

echo "--- Legal Pages ---"
check_cache "/" "Homepage"
check_cache "/privacy" "Privacy Policy"
check_cache "/terms" "Terms of Service"
check_cache "/cookies" "Cookie Policy"
check_cache "/guidelines" "Community Guidelines"

echo "--- Static Files ---"
check_cache "/robots.txt" "Robots.txt"
check_cache "/sitemap.xml" "Sitemap"
check_cache "/site.webmanifest" "Web Manifest"

echo "=========================================="
echo "Second request to check cache HITs"
echo "=========================================="
echo ""

# Small delay
sleep 1

echo "--- Legal Pages (second request) ---"
check_cache "/" "Homepage"
check_cache "/privacy" "Privacy Policy"

echo "=========================================="
echo "Testing Blocked Paths (should return 404)"
echo "=========================================="
echo ""

test_blocked() {
    local path=$1
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "${BASE_URL}${path}")
    if [ "$STATUS" = "404" ]; then
        echo -e "${GREEN}✓${NC} ${path} -> ${STATUS} (blocked correctly)"
    else
        echo -e "${RED}✗${NC} ${path} -> ${STATUS} (should be 404!)"
    fi
}

test_blocked "/wp-login.php"
test_blocked "/.env"
test_blocked "/.git/config"
test_blocked "/phpmyadmin"
test_blocked "/admin.php"

echo ""
echo "=========================================="
echo "Summary"
echo "=========================================="
echo ""
echo "If cf-cache-status shows 'HIT', Cloudflare is serving cached content."
echo "If it shows 'DYNAMIC', the page is not being cached - check Cloudflare cache rules."
echo ""
echo "Goal: All legal pages should show 'HIT' after the first request."
echo ""
