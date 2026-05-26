import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let login page through always
  if (pathname === '/portal/login') return NextResponse.next();

  // Check session cookie set after login
  const session = request.cookies.get('tappy-session');
  if (!session) {
    const loginUrl = new URL('/portal/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
