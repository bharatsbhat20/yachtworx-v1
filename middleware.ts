import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Redirect providers away from owner dashboard
    if (token?.role === "PROVIDER" && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/provider/dashboard", req.url));
    }

    // Redirect owners away from provider dashboard
    if (token?.role === "OWNER" && pathname.startsWith("/provider")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/boats/:path*",
    "/marketplace/:path*",
    "/requests/:path*",
    "/documents/:path*",
    "/messages/:path*",
    "/provider/:path*",
  ],
};
