import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of paths that require authentication
const protectedPaths = [
  "/dashboard",
  "/participants",
  "/participants/register",
  "/transactions",
  "/account",
];

// List of paths that are accessible to everyone
// const publicPaths = ["/", "/login", "/register", "/about", "/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // Check if the path is public
  // const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  // Get the authentication token from cookies
  const authToken = request.cookies.get("CBO_Token")?.value;

  // If the path is protected and the user is not authenticated, redirect to login
  if (isProtectedPath && !authToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and trying to access login/register, redirect to dashboard
  if ((pathname === "/login" || pathname === "/register") && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)",
  ],
};
