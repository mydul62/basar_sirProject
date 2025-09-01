"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "./ui/theme-toggle"

import {
  Home,
  PenTool,
  FolderOpen,
  BookOpen,
  Trophy,
  Users,
  DollarSign,
  Award,
  BadgeCheck,
  LayoutDashboard,
  Mail,
} from "lucide-react"

const mainNavItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#about", label: "About", icon: PenTool },
  { href: "/#blog", label: "Blog", icon: PenTool },
  { href: "/#projects", label: "Projects", icon: FolderOpen },
]

const miniNavItems = [
  { href: "/#research-interest", label: "Research Interest", icon: PenTool },
  { href: "/#publications", label: "Publications", icon: BookOpen },
  { href: "/#awards", label: "Awards", icon: Trophy },
  { href: "/#networks", label: "Networks", icon: Users },
  { href: "/#grants", label: "Grants", icon: DollarSign },
  { href: "/#extr acurricular", label: "Extracurricular", icon: Award },
  { href: "/#certification", label: "Certification", icon: BadgeCheck },
  { href: "/#contact", label: "Contact", icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const isItemActive = (href: string) => pathname === href

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm">
      {/* === Top Nav === */}
      <nav className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-bold text-xl text-foreground hover:text-primary transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
        Md. Abul Basar
        </Link>

        {/* Main nav (desktop) */}
        <div className="hidden md:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isItemActive(item.href) ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Theme toggle */}
        <ThemeToggle />

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          ☰
        </Button>
      </nav>

      {/* === Mini Nav (desktop) === */}
     <div className=" flex justify-center w-full">
      <nav className="hidden md:flex  mx-auto max-w-7xl px-6 h-12 items-center space-x-4 border-t border-border/40 bg-background/70 backdrop-blur">
        {miniNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-md transition-colors hover:bg-muted/80",
              isItemActive(item.href) ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
     </div>

      {/* === Mobile Drawer === */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-4">
            {/* Main items */}
            <div className="space-y-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block text-base px-3 py-2 rounded-md transition-colors",
                    isItemActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mini items */}
            <div className="pt-4 border-t border-border/40 space-y-2">
              {miniNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block text-sm px-3 py-2 rounded-md transition-colors",
                    isItemActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
