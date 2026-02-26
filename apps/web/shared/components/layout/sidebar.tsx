'use client';
import {
  Home,
  FolderKanban,
  CheckSquare,
  Settings,
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { use, Suspense } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { ROUTES } from '@/shared/config/routes';
import { UserNav } from './user-nav';
import { Skeleton } from '../ui/skeleton';
import { SidebarProvider, useSidebar } from '@/shared/components/ui/sidebar';

export { SidebarProvider };

interface SidebarContentProps {
  workspacesPromise: Promise<Workspace[]>;
}

function SidebarInner({ workspacesPromise }: SidebarContentProps) {
  const workspaces = use(workspacesPromise);
  const { state, setOpen } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const pathname = usePathname();
  const params = useParams<{ dashboardId: string }>();
  const dashboardId = params.dashboardId;

  const navigation = [
    {
      name: 'Dashboard',
      icon: Home,
      href: dashboardId ? ROUTES.DASHBOARD.HOME(dashboardId) : '#',
    },
    {
      name: 'Projects',
      icon: FolderKanban,
      href: dashboardId ? ROUTES.DASHBOARD.PROJECTS.ROOT(dashboardId) : '#',
    },
    {
      name: 'Tasks',
      icon: CheckSquare,
      href: dashboardId ? ROUTES.DASHBOARD.TASKS.ROOT(dashboardId) : '#',
    },
  ];

  return (
    <div
      data-state={state}
      className={cn(
        'group h-screen bg-sidebar border-r flex flex-col shrink-0 overflow-hidden',
        'transition-[width] duration-300 ease-in-out',
        'data-[state=expanded]:w-64 data-[state=collapsed]:w-16',
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border shrink-0">
        <div className="flex items-center min-w-0 flex-1 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-semibold">C</span>
          </div>
          <span className="font-semibold ml-2 whitespace-nowrap transition-opacity duration-300 group-data-[state=collapsed]:opacity-0">
            CollabSpace
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(state === 'collapsed')}
          className="shrink-0"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto overflow-x-hidden">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors whitespace-nowrap',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="transition-opacity duration-300 group-data-[state=collapsed]:opacity-0">
                {item.name}
              </span>
            </Link>
          );
        })}

        <div className="transition-all duration-300 overflow-hidden group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:h-0 group-data-[state=expanded]:opacity-100 group-data-[state=expanded]:h-auto">
          <div className="pt-6 pb-2 px-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase text-muted-foreground whitespace-nowrap">
                Workspaces
              </span>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Suspense
            fallback={
              <div className="space-y-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full flex items-center space-x-3 px-3 py-2"
                  >
                    <Skeleton className="w-5 h-5 rounded" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            }
          >
            {workspaces.map((workspace) => (
              <Link
                key={workspace.id}
                href={ROUTES.DASHBOARD.HOME(workspace.id)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors whitespace-nowrap"
              >
                <div
                  className={cn('w-5 h-5 rounded shrink-0', 'bg-blue-500')}
                />
                <span className="truncate">{workspace.name}</span>
              </Link>
            ))}
          </Suspense>
        </div>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-border space-y-1 shrink-0">
        <Link
          href={dashboardId ? ROUTES.DASHBOARD.SETTINGS.ROOT(dashboardId) : '#'}
          className={cn(
            'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors whitespace-nowrap',
            pathname ===
              (dashboardId ? ROUTES.DASHBOARD.SETTINGS.ROOT(dashboardId) : '')
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span className="transition-opacity duration-300 group-data-[state=collapsed]:opacity-0">
            Settings
          </span>
        </Link>

        <div className="transition-all duration-300 overflow-hidden group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:h-0 group-data-[state=expanded]:opacity-100 group-data-[state=expanded]:h-auto">
          <UserNav />
        </div>
      </div>
    </div>
  );
}

interface AppSidebarProps {
  workspacesPromise: Promise<Workspace[]>;
}

export function AppSidebar({ workspacesPromise }: AppSidebarProps) {
  return <SidebarInner workspacesPromise={workspacesPromise} />;
}
