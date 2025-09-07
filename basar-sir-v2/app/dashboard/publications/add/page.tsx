"use client"

import { useRouter } from "next/navigation"
import { PublicationForm } from "@/src/components/dashboard/publication-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddPublicationPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Creating publication:", data)
    router.push("/dashboard/publications")
  }

  const handleCancel = () => {
    router.push("/dashboard/publications")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <PublicationForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
