'use client';

import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  const { state } = useSidebar();
  const [isCompanyDropdownOpen, setCompanyDropdownOpen] = React.useState(false);

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
         <Image src="/logo.svg" alt="Logo" width={35} height={30} />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              href="/data"
              isActive={pathname.startsWith('/data')}
              tooltip="Data"
            >
              <Database />
              Data
            </SidebarMenuButton>
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
                tooltip="ACH + Checks Reconciliation"
                className="font-normal data-[active=true]:font-normal text-xs"
              >
                <ProcessIcon />
                <span style={{ fontSize: '0.7rem' }}>ACH + Checks Reconciliation</span>
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
                    L
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Lyft</span>
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
                  L
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 flex justify-between items-center">
                <span>Lyft</span>
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
            <DropdownMenuItem className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
