"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AwardForm } from "@/src/components/dashboard/award-form"
import { awards } from "@/src/lib/demo-data"

export default function EditAwardPage() {
  const router = useRouter()
  const params = useParams()
  const awardId = params.id as string

  // In a real app, this would fetch from a database
  const award = awards.find((a) => a.id === awardId)

  if (!award) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Award Not Found</h1>
          <p className="text-muted-foreground">The award you're looking for doesn't exist</p>
        </div>
      </div>
    )
  }

  const handleSubmit = (data: any) => {
    // In a real app, this would update the database
    console.log("Updating award:", data)
    router.push("/dashboard/awards")
  }

  const handleCancel = () => {
    router.push("/dashboard/awards")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Award</h1>
        <p className="text-muted-foreground">Update the award information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Award Details</CardTitle>
          <CardDescription>Update the information about your award or recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <AwardForm initialData={award} onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
