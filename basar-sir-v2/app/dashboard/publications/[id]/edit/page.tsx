"use client"

import { useRouter } from "next/navigation"
import { PublicationForm } from "@/src/components/dashboard/publication-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { publications } from "@/src/lib/demo-data"

export default function EditPublicationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const publication = publications.find((p) => p.id === params.id)

  if (!publication) {
    return <div>Publication not found</div>
  }

  const handleSubmit = (data: any) => {
    console.log("Updating publication:", data)
    router.push("/dashboard/publications")
  }

  const handleCancel = () => {
    router.push("/dashboard/publications")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Publication</CardTitle>
        </CardHeader>
        <CardContent>
          <PublicationForm initialData={publication} onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
