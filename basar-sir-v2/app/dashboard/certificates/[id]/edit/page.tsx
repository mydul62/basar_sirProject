"use client"

import { useRouter } from "next/navigation"
import { CertificateForm } from "@/src/components/dashboard/certificate-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { certificates } from "@/src/lib/demo-data"

export default function EditCertificatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const certificate = certificates.find((c) => c.id === params.id)

  if (!certificate) {
    return <div>Certificate not found</div>
  }

  const handleSubmit = (data: any) => {
    console.log("Updating certificate:", data)
    router.push("/dashboard/certificates")
  }

  const handleCancel = () => {
    router.push("/dashboard/certificates")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificateForm initialData={certificate} onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
