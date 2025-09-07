"use client"

import { useRouter } from "next/navigation"
import { GrantForm } from "@/src/components/dashboard/grant-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddGrantPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Creating grant:", data)
    router.push("/dashboard/grants")
  }

  const handleCancel = () => {
    router.push("/dashboard/grants")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Grant</CardTitle>
        </CardHeader>
        <CardContent>
          <GrantForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
