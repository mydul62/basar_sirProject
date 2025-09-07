"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AwardForm } from "@/src/components/dashboard/award-form"

export default function AddAwardPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    // In a real app, this would save to a database
    console.log("Adding award:", data)
    // router.push("/dashboard/awards")
  }

  const handleCancel = () => {
    router.push("/dashboard/awards")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Award</h1>
        <p className="text-muted-foreground">Add a new award or recognition to your profile</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Award Details</CardTitle>
          <CardDescription>Fill in the information about your award or recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <AwardForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
