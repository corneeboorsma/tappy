import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ORIGINS = [
  'https://tappy--tappy-e9eed.europe-west4.hosted.app',
  'http://localhost:3000',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Blokkeer API calls van externe origins
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

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
  matcher: ['/portal/:path*', '/api/:path*'],
};
