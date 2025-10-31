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
  SidebarGroupLabel,
  SidebarGroupAction
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, Database, FilePlus, Users, Settings, LifeBuoy, LogOut, MoreVertical } from "lucide-react"

const ProcessIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M1 8H3L5 3L8 13L11 1L13 8H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)


export function AppSidebar() {
  const pathname = usePathname()
  
  return (
    <Sidebar collapsible="none">
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 rounded-sm bg-yellow-300">
              <AvatarFallback className="bg-yellow-300 rounded-sm font-bold text-yellow-900">L</AvatarFallback>
            </Avatar>
            <h2 className="text-sm font-semibold tracking-tight">Lyft</h2>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
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
        </SidebarMenu>

        <SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Processes</SidebarGroupLabel>
            <SidebarMenuItem>
              <SidebarMenuButton href="/" isActive={pathname === '/'} tooltip="ACH + Checks Reconciliation">
                <ProcessIcon />
                ACH + Checks Reconciliation
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarGroup>
        </SidebarMenu>
        
        <SidebarMenu>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupAction asChild>
                <Button variant="ghost" size="icon" className="w-6 h-6"><FilePlus /></Button>
              </SidebarGroupAction>
            </SidebarGroup>
        </SidebarMenu>

      </SidebarContent>
    </Sidebar>
  )
}
