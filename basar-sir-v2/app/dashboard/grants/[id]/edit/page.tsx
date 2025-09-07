"use client"

import { useRouter } from "next/navigation"
import { GrantForm } from "@/src/components/dashboard/grant-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { grants } from "@/src/lib/demo-data"

export default function EditGrantPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const grant = grants.find((g) => g.id === params.id)

  if (!grant) {
    return <div>Grant not found</div>
  }

  const handleSubmit = (data: any) => {
    console.log("Updating grant:", data)
    router.push("/dashboard/grants")
  }

  const handleCancel = () => {
    router.push("/dashboard/grants")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Grant</CardTitle>
        </CardHeader>
        <CardContent>
          <GrantForm initialData={grant} onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
