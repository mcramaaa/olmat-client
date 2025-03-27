import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { protectedPaths } from "./constant/protectPath.constant";

// Protected Path

const accessRestrictions = {
  admin: {
    restrictedPaths: ["/account"],
  },
  user: {
    restrictedPaths: [],
  },
};

// const publicPaths = ["/", "/login", "/register", "/about", "/contact"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`)
  );

  // const isPublicPath = publicPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  const authToken = request.cookies.get("CBO_Token")?.value;

  if (isProtectedPath && !authToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  if ((pathname === "/login" || pathname === "/register") && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (authToken) {
    const decodedToken: any = jwtDecode(authToken);
    const userType = decodedToken.type;

    const roleRestrictions =
      accessRestrictions[userType as keyof typeof accessRestrictions];

    if (roleRestrictions) {
      const isRestrictedPath = roleRestrictions.restrictedPaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`)
      );

      if (isRestrictedPath) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
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
