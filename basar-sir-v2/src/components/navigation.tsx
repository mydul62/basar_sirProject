"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/src/components/ui/theme-toggle"
import {
  Menu,
  X,
  Home,
  User,
  FolderOpen,
  BookOpen,
  PenTool,
  Mail,
  LayoutDashboard,
  Trophy,
  Users,
  DollarSign,
} from "lucide-react"

const navItems = [
  { href: "/#", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: User },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
  { href: "/#publications", label: "Publications", icon: BookOpen },
  { href: "/#awards", label: "Awards", icon: Trophy },
  { href: "/#networks", label: "Networks", icon: Users },
  { href: "/#grants", label: "Grants", icon: DollarSign },
  { href: "/#blog", label: "Blog", icon: PenTool },
  { href: "/#contact", label: "Contact", icon: Mail },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
]

export function Navigation() {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

const handleAnchorClick = (href: string) => {
  if (href.startsWith("/#")) {
    const id = href.split("#")[1] // "/#about" -> "about"
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }
  setIsSidebarOpen(false)
}


  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-background/95 backdrop-blur"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      <nav
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-background/95 backdrop-blur border-r border-border z-50 transition-transform duration-300",
          "md:translate-x-0", // Always visible on desktop
          isSidebarOpen ? "translate-x-0" : "-translate-x-full", // Mobile toggle
        )}
      >
        <div className="p-6 flex flex-col h-full">
          <Link
            href="/"
            className="block font-bold text-xl text-primary mb-8 font-sans"
            onClick={() => setIsSidebarOpen(false)}
          >
            Md. Abul Basar
          </Link>

          <div className="space-y-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => handleAnchorClick(item.href)}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-primary",
                    pathname === item.href ? "bg-primary/10 text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
