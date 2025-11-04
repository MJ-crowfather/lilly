
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronUp, Check, Database, FilePlus, Users, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '../auth-provider';

const ProcessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1 8H3L5 3L8 13L11 1L13 8H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function AppSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const { state } = useSidebar();
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = React.useState(false);

  const isDataActive = pathname.startsWith('/data');

  const handleLogout = () => {
    logout();
    router.push('/login');
  };


  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
         <Image src="/logo.svg" alt="Logo" width={35} height={30} />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
              <Link href="/data" className={cn(
                "flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2",
                isDataActive && 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
              )}>
                <Database className="h-4 w-4" />
                <span className="truncate">Data</span>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="#"
              isActive={pathname.startsWith('/people')}
              tooltip="People"
            >
              <Users />
              People
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarSeparator />

        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Processes</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton
                href="/"
                isActive={pathname === '/'}
                tooltip="AE/PC Reporting"
                className="font-normal data-[active=true]:font-normal text-xs"
              >
                <ProcessIcon />
                <span style={{ fontSize: '0.7rem' }}>AE/PC Reporting</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Pages</SidebarGroupLabel>
            <SidebarGroupAction asChild>
              <Button variant="ghost" size="icon" className="w-6 h-6">
                <FilePlus />
              </Button>
            </SidebarGroupAction>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-0">
        <DropdownMenu
          open={isCompanyDropdownOpen}
          onOpenChange={setCompanyDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-between items-center px-4 py-2 h-auto rounded-none border-t"
            >
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6 rounded-sm bg-yellow-300">
                  <AvatarFallback className="bg-yellow-300 rounded-sm font-bold text-yellow-900 text-xs">
                    E
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Eli Lilly</span>
              </div>
              <ChevronUp
                className={`h-4 w-4 transition-transform ${
                  isCompanyDropdownOpen ? 'rotate-0' : 'rotate-180'
                }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="w-[var(--sidebar-width)] md:w-[calc(var(--sidebar-width)_-_1rem)] mb-1"
            style={state === 'collapsed' ? { width: '15rem' } : {}}
          >
            <DropdownMenuItem className="gap-2">
              <Avatar className="h-6 w-6 rounded-sm bg-pink-200">
                <AvatarFallback className="bg-pink-200 rounded-sm font-bold text-pink-800 text-xs">
                  C
                </AvatarFallback>
              </Avatar>
              <span>Clutch</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Avatar className="h-6 w-6 rounded-sm bg-yellow-300">
                <AvatarFallback className="bg-yellow-300 rounded-sm font-bold text-yellow-900 text-xs">
                  E
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex justify-between items-center">
                <span>Eli Lilly</span>
                <Check className="h-4 w-4" />
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2">
              <Avatar className="h-6 w-6 rounded-sm bg-green-200">
                <AvatarFallback className="bg-green-200 rounded-sm font-bold text-green-800 text-xs">
                  S
                </AvatarFallback>
              </Avatar>
              <span>skunk works</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
