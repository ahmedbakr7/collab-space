import { CheckSquare, FolderKanban, Home, SettingsIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import Logo from '@/features/shared/presentation/components/Logo/Logo';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/shared/components/ui/item';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import Link from 'next/link';

// Menu items.
const items = [
  { title: 'Dashboard', url: '/', icon: Home },
  { title: 'Projects', url: '/projects', icon: FolderKanban },
  { title: 'Tasks', url: '/tasks', icon: CheckSquare },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="flex flex-row items-center justify-between transition group-data-[collapsible=icon]:justify-center">
        <Logo className="group-data-[collapsible=icon]:hidden" />
        <SidebarTrigger
          aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'}
          className="inline-flex size-9 items-center justify-center rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ml-auto group-data-[collapsible=icon]:ml-0 [&>svg]:size-4 [&>svg]:transition-transform group-data-[state=expanded]:[&_svg]:-scale-x-100"
        />
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <SettingsIcon size={15} />
                    <span>Product Team</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <SettingsIcon size={15} />
                    <span>Marketing</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <SettingsIcon size={15} />
                    <span>Engineering</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#">
                <SettingsIcon size={15} />
                <span className="text-muted-foreground">Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {open && (
          <SidebarFooterProfile className="group-data-[collapsible=icon]:hidden" />
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

function SidebarFooterProfile({ className = '' }: { className?: string }) {
  return (
    <Item variant="default" className={className}>
      <ItemMedia>
        <Avatar className="size-8">
          <AvatarImage src="https://github.com/evilrabbit.png" />
          <AvatarFallback>ER</AvatarFallback>
        </Avatar>
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Sarah Anderson</ItemTitle>
        <ItemDescription>sarah@company.com</ItemDescription>
      </ItemContent>
    </Item>
  );
}
