import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const protectedRoutes = ["/admin", "/upload-movie"];

export function middleware(req: NextRequest) {
  const { cookies, nextUrl } = req;

  const token = cookies.get("sb-access-token")?.value;

  const isProtected = protectedRoutes.some((path) =>
    nextUrl.pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: ["/admin/:path*", "/upload-movie/:path*"],
};
