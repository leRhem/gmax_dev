"use client"

import * as React from "react"
import {
  IconBuildingWarehouse,
  IconCalendarEvent,
  IconCamera,
  IconCash,
  IconChartBar,
  IconChecklist,
  IconDashboard,
  IconHelp,
  IconHistory,
  IconPhotoCheck,
  IconTools,
  IconUserCog,
  IconUsers,
  IconSchool,
} from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

import { NavManagement } from "./nav-management"
import { NavMain } from "./nav-main"
import { NavSecondary } from "./nav-secondary"
import { NavUser } from "./nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar"
import { getNavItemsForRole, type NavItem } from "@repo/database/permissions"
import type { StaffRole } from "@repo/database/generated/prisma"

// Icon mapping for dynamic rendering
const iconMap = {
  IconDashboard,
  IconCalendarEvent,
  IconUsers,
  IconTools,
  IconUserCog,
  IconBuildingWarehouse,
  IconChartBar,
  IconHistory,
  IconHelp,
  IconChecklist,
  IconPhotoCheck,
  IconCamera,
  IconSchool,
  IconCash,
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string | null
    email: string
    image: string | null
    role: string
  }
}

// Transform NavItem to the format expected by nav components
function transformNavItems(items: NavItem[]) {
  return items.map((item) => ({
    title: item.title,
    url: item.url,
    icon: iconMap[item.icon as keyof typeof iconMap] || IconDashboard,
  }))
}

// Transform for management section (uses 'name' instead of 'title')
function transformManagementItems(items: NavItem[]) {
  return items.map((item) => ({
    name: item.title,
    url: item.url,
    icon: iconMap[item.icon as keyof typeof iconMap] || IconTools,
  }))
}

const navSecondary = [
  {
    title: "Get Help",
    url: "#",
    icon: IconHelp,
  },
]

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  // Get navigation items based on user's role
  const userRole = user.role as StaffRole
  const { main, management } = getNavItemsForRole(userRole)

  // Transform to component-expected format
  const navMain = transformNavItems(main)
  const managementItems = transformManagementItems(management)

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-3.5! pointer-events-none"
            >
              <Link href="/dashboard">
                <Image src="/Logo.png" alt="Logo" height={32} width={32} />
                <span className="text-2xl font-semibold">Gmax Studioz</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        {managementItems.length > 0 && (
          <NavManagement items={managementItems} />
        )}
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
