"use client"
import Swal from "sweetalert2";

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  Home,
  BarChart3,
  FileText,
  Settings,
  User,
  ArrowLeft,
  BookOpen,
  Trophy,
  Users,
  DollarSign,
  Award,
  LogOut,
  Layout,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { logout } from "@/src/services/AuthService"

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Hero Section",
    href: "/dashboard/content/hero",
    icon: Layout,
  },
  {
    title: "About Section",
    href: "/dashboard/content/about",
    icon: User,
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
    title: "Activities",
    href: "/dashboard/activities",
    icon: Trophy,
  },
  {
    title: "Awards",
    href: "/dashboard/awards",
    icon: Trophy,
  },
  {
    title: "Certificates",
    href: "/dashboard/certificates",
    icon: Award,
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

  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  });

  if (result.isConfirmed) {
    try {
      await logout();
      Swal.fire("Logged Out!", "You have been logged out successfully.", "success");
    } catch (error) {
      Swal.fire("Error!", "Something went wrong while logging out.", "error");
    }
  }
};

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
                isActive={isActiveRoute(item.href)}
                className={cn(
                  "w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActiveRoute(item.href) &&
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

          <SidebarMenuButton
            onClick={handleLogout}
            className="w-full justify-start gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mt-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
