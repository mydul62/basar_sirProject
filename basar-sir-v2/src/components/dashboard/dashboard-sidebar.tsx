"use client"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Home, BarChart3, FileText, Settings, User, ArrowLeft, BookOpen, Trophy, Users, DollarSign } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: BarChart3,
  },
  {
    title: "Blog Posts",
    href: "/dashboard/blog",
    icon: FileText,
  },
  {
    title: "Publications",
    href: "/dashboard/publications",
    icon: BookOpen,
  },
  {
    title: "Awards",
    href: "/dashboard/awards",
    icon: Trophy,
  },
  {
    title: "Networks",
    href: "/dashboard/networks",
    icon: Users,
  },
  {
    title: "Grants",
    href: "/dashboard/grants",
    icon: DollarSign,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
            <User className="w-4 h-4 text-sidebar-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="font-semibold text-sidebar-foreground">Dashboard</h2>
            <p className="text-xs text-sidebar-foreground/60">Md. Abul Basar</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  pathname === item.href &&
                    "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
                )}
              >
                <Link href={item.href}>
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <div className="mt-8 pt-4 border-t border-sidebar-border">
          <SidebarMenuButton
            asChild
            className="w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Back to Website
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
