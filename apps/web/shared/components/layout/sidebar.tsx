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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { useState, use } from 'react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Workspace } from '@repo/domain/src/workspace/entities/workspace.entity';
import { ROUTES } from '@/shared/config/routes';

interface SidebarProps {
  workspacesPromise: Promise<Workspace[]>;
}

export function Sidebar(props: SidebarProps) {
  const { workspacesPromise } = props;
  const workspaces = use(workspacesPromise);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const params = useParams<{ dashboardId: string }>();
  const dashboardId = params.dashboardId;

  // If we are not in a dashboard context (e.g. root redirection), accessing these routes might be invalid.
  // But Sidebar should typically be used within [dashboardId] layout.
  // Fallback to empty string or handle gracefully?
  // Given the layout structure, we should have dashboardId.

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
      className={cn(
        'h-screen bg-sidebar border-r flex flex-col transition-all duration-300 shrink-0',
        isCollapsed ? 'w-16' : 'w-64',
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-semibold">C</span>
            </div>
            <span className="font-semibold">CollabSpace</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn('', isCollapsed ? 'mx-auto' : '')}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}

        {!isCollapsed && (
          <>
            <div className="pt-6 pb-2 px-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase text-muted-foreground">
                  Workspaces
                </span>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {workspaces.map((workspace) => (
              <Link
                key={workspace.id}
                href={ROUTES.DASHBOARD.HOME(workspace.id)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <div
                  className={cn(
                    'w-5 h-5 rounded shrink-0',
                    'bg-blue-500', // Default color as entity doesn't have one
                  )}
                />
                <span className="truncate">{workspace.name}</span>
              </Link>
            ))}
          </>
        )}
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href={dashboardId ? ROUTES.DASHBOARD.SETTINGS.ROOT(dashboardId) : '#'}
          className={cn(
            'w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors',
            pathname ===
              (dashboardId ? ROUTES.DASHBOARD.SETTINGS.ROOT(dashboardId) : '')
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </Link>

        {!isCollapsed && (
          <div className="flex items-center space-x-3 px-3 py-2 mt-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
              <AvatarFallback>SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">Sarah Anderson</p>
              <p className="text-xs text-muted-foreground truncate">
                sarah@company.com
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
