"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { logout } from "@/src/services/AuthService"
import Swal from "sweetalert2"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    })

    if (result.isConfirmed) {
      await logout()
      Swal.fire({
        title: "Logged Out!",
        text: "You have been successfully logged out.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      })
      router.push("/signin")
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      className="w-full justify-start text-muted-foreground hover:text-foreground"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  )
}
