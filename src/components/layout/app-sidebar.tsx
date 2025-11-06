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
import { useCompany } from '../company-provider';

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
  const { company, setCompany, companyData, companies } = useCompany();

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
              href="/people"
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
                tooltip={companyData.processName}
                className="font-normal data-[active=true]:font-normal text-xs"
              >
                <ProcessIcon />
                <span style={{ fontSize: '0.7rem' }}>{companyData.processName}</span>
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
                <Avatar className={cn("h-6 w-6 rounded-sm", companyData.avatar.bgColor)}>
                  <AvatarFallback className={cn("rounded-sm font-bold text-xs", companyData.avatar.bgColor, companyData.avatar.textColor)}>
                    {companyData.avatar.fallback}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{companyData.name}</span>
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
            {companies.map((comp) => (
                <DropdownMenuItem key={comp.name} className="gap-2" onClick={() => setCompany(comp.name)}>
                    <Avatar className={cn("h-6 w-6 rounded-sm", comp.avatar.bgColor)}>
                        <AvatarFallback className={cn("rounded-sm font-bold text-xs", comp.avatar.bgColor, comp.avatar.textColor)}>
                            {comp.avatar.fallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex justify-between items-center">
                        <span>{comp.name}</span>
                        {company === comp.name && <Check className="h-4 w-4" />}
                    </div>
              </DropdownMenuItem>
            ))}
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
