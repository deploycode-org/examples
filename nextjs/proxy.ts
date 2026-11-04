import { type NextRequest, NextResponse } from "next/server";

/**
 * Next.js 16 renamed middleware to proxy. It runs before the route: /old-proxy is redirected, and
 * /proxy gets a request header the page reads back, so the page shows the proxy ran on this server.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/old-proxy") {
    return NextResponse.redirect(new URL("/proxy", request.url));
  }
  const headers = new Headers(request.headers);
  headers.set("x-proxy-at", new Date().toISOString());
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("x-deploycode-proxy", "ran");
  return response;
}

export const config = {
  matcher: ["/old-proxy", "/proxy"],
};
