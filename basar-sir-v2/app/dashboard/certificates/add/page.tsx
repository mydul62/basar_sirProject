"use client"

import { useRouter } from "next/navigation"
import { CertificateForm } from "@/src/components/dashboard/certificate-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddCertificatePage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Creating certificate:", data)
    router.push("/dashboard/certificates")
  }

  const handleCancel = () => {
    router.push("/dashboard/certificates")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificateForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
