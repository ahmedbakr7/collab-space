import { type NextRequest } from 'next/server';
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
