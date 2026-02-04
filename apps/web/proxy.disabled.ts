import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { proxy } from '@repo/supabase/proxy';
import { ROUTES } from '@/shared/config/routes';

export async function middleware(request: NextRequest) {
  const protectedPaths = [
    ROUTES.ONBOARDING,
    ROUTES.PROJECTS.ROOT,
    ROUTES.TASKS.ROOT,
    ROUTES.WORKSPACES.ROOT,
    ROUTES.SETTINGS.ROOT,
  ];

  // console.log('[Middleware] Checking path:', request.nextUrl.pathname);

  // Manual check for workspaces path as temporary fix until @repo/supabase rebuilds reliably
  if (request.nextUrl.pathname.startsWith('/workspaces')) {
    // Fast check: if no session cookie, redirect.
    const hasSession = request.cookies
      .getAll()
      .some((c) => c.name.includes('sb-') && c.name.includes('-auth-token'));

    if (!hasSession) {
      // console.log('[Middleware] Redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return await proxy(request, protectedPaths);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
