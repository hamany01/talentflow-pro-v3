import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.nextUrl);
  if (url.pathname.startsWith("/admin")) {
    // Allow; UI will enforce role by querying 'profiles'. RLS protects data.
    return NextResponse.next();
  }
  return NextResponse.next();
}
