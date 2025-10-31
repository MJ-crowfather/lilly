'use client'

import { usePathname } from "next/navigation"
import { 
  Sidebar, 
  SidebarHeader, 
  SidebarContent, 
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Blend, ClipboardList, Database, FileText, LogOut, MoreHorizontal, Replace, Users, Settings, LifeBuoy } from "lucide-react"

export function AppSidebar() {
  const pathname = usePathname()
  
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Blend className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-lg font-semibold tracking-tight">Reconciliation</h2>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive={pathname.startsWith('/data')} tooltip="Data">
                <Database />
                Data
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive={pathname.startsWith('/people')} tooltip="People">
                <Users />
                People
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Processes</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" isActive={pathname === '/'} tooltip="ACH Reconciliation">
                <Replace />
                ACH Reconciliation
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#" isActive={pathname.startsWith('/checks')} tooltip="Checks Reconciliation">
                <FileText />
                Checks Reconciliation
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start items-center gap-3 h-auto p-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Jane Doe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden group-data-[collapsible=icon]:hidden">
                <p className="font-medium text-sm">Jane Doe</p>
                <p className="text-xs text-muted-foreground">jane.doe@example.com</p>
              </div>
              <MoreHorizontal className="ml-auto hidden group-data-[collapsible=icon]:hidden"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-4 w-4" />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
