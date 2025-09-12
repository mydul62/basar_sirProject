"use client"

import { useRouter } from "next/navigation"
import { CertificateForm } from "@/src/components/dashboard/certificate-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddCertificateForm } from "@/src/components/dashboard/AddCertificateForm"

export default function AddCertificatePage() {

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Certificate</CardTitle>
        </CardHeader>
        <CardContent>
          <AddCertificateForm />
        </CardContent>
      </Card>
    </div>
  )
}
