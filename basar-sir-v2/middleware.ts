import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./src/services/AuthService";

// Public routes (accessible without login)
const publicRoutes = ["/signin"];

// Middleware to protect dashboard routes
export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Check if current path is under /dashboard
  const isDashboardRoute = pathname.startsWith("/dashboard");

  // Get logged-in user
  const userInfo = await getCurrentUser();
  console.log(userInfo)
  // If not logged in
  if (!userInfo) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.next(); // allow login page
    }

    if (isDashboardRoute) {
      return NextResponse.redirect(
        new URL(`/signin?redirectPath=${pathname}`, request.url)
      );
    }
  }

  // If logged in and accessing dashboard → allow
  if (isDashboardRoute) {
    return NextResponse.next();
  }

  // For everything else, just continue
  return NextResponse.next();
};

// Apply middleware only to /dashboard routes
export const config = {
  matcher: [
    "/signin",
    "/dashboard",
    "/dashboard/:path*", // all nested routes inside dashboard
  ],
};
