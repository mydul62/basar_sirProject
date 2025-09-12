"use client"

import { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import Swal from "sweetalert2"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Save, User, Lock, Eye, EyeOff } from "lucide-react"

import { IUser } from "@/src/types/types"
import { GetMe, PasswordChange, Updateuser } from "@/src/services/singleUser"

export default function SettingsPage() {
  const [user, setUser] = useState<Partial<IUser>>({})
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
  })

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfile,
    control,
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      contactNo: "",
      designation: "",
      image: null,
    },
  })

  const {
    register: registerPassword,
    handleSubmit: handlePasswordFormSubmit,
    reset: resetPassword,
    watch: watchPassword,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await GetMe()
      if (response.success) {
        const userData: IUser = response.data
        setUser(userData)
        resetProfile({
          fullName: userData.fullName || "",
          email: userData.email || "",
          contactNo: userData.contactNo || "",
          designation: userData.designation || "",
          image: null,
        })
      }
    } catch (error) {
      Swal.fire("Error", "Failed to load user profile", "error")
    }
  }

  const onProfileSubmit = async (data: any) => {
    setLoading((prev) => ({ ...prev, profile: true }))
    try {
      const formData = new FormData()
      if (data.image) {
        formData.append("file", data.image)
      }
      formData.append(
        "data",
        JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          contactNo: data.contactNo,
          designation: data.designation,
        })
      )

      const response = await Updateuser(formData)

      if (response.success) {
        setUser(response.data)
        resetProfile((prev) => ({
          ...prev,
          image: null,
        }))
        Swal.fire("Success", "Profile updated successfully", "success")
      } else {
        Swal.fire("Error", response.error || "Failed to update profile", "error")
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update profile", "error")
    } finally {
      setLoading((prev) => ({ ...prev, profile: false }))
    }
  }

  const onPasswordSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      Swal.fire("Error", "New passwords do not match", "error")
      return
    }
    if (data.newPassword.length < 8) {
      Swal.fire("Error", "Password must be at least 8 characters long", "error")
      return
    }

    setLoading((prev) => ({ ...prev, password: true }))

    try {
      const payload = {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }

      const response = await PasswordChange(payload)

      if (response.success) {
        resetPassword()
        Swal.fire("Success", "Password updated successfully", "success")
      } else {
        Swal.fire("Error", response.error || "Failed to update password", "error")
      }
    } catch (error) {
      Swal.fire("Error", "Failed to update password", "error")
    } finally {
      setLoading((prev) => ({ ...prev, password: false }))
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground font-sans">Settings</h1>
        <p className="text-muted-foreground font-serif">Manage your account and dashboard preferences.</p>
      </div>

      <div className="grid gap-6">
        {/* Profile Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-sans">
              <User className="w-5 h-5" /> Profile Information
            </CardTitle>
            <CardDescription>Update your personal and professional details.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user.image || "/placeholder.svg"} alt={user.fullName} />
                  <AvatarFallback className="text-lg">
                    {user.fullName
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role?.toUpperCase()}
                    </Badge>
                    <Badge
                      variant={
                        user.status === "active"
                          ? "default"
                          : user.status === "in-progress"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {user.status?.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <Controller
                      control={control}
                      name="image"
                      render={({ field }) => (
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                        />
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" {...registerProfile("fullName", { required: true })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" {...registerProfile("email", { required: true })} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactNo">Contact Number</Label>
                  <Input id="contactNo" {...registerProfile("contactNo")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Professional Title</Label>
                  <Input id="designation" {...registerProfile("designation")} />
                </div>
              </div>

              <Button type="submit" disabled={loading.profile}>
                <Save className="w-4 h-4 mr-2" />
                {loading.profile ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Password & Security */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-sans">
              <Lock className="w-5 h-5" /> Password & Security
            </CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordFormSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password *</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    {...registerPassword("currentPassword", { required: true })}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password *</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPasswords.new ? "text" : "password"}
                      {...registerPassword("newPassword", { required: true, minLength: 8 })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirm ? "text" : "password"}
                      {...registerPassword("confirmPassword", { required: true, minLength: 8 })}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols.
              </div>

              <Button type="submit" disabled={loading.password}>
                <Lock className="w-4 h-4 mr-2" />
                {loading.password ? "Updating..." : "Update Password"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
