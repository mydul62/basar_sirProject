"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { type Certificate } from "@/src/lib/demo-data"
import { DeleteCertification, GetAllCertification } from "@/src/services/certification"
import Swal from "sweetalert2"
export default function CertificatesPage() {
 const [certificates, setCertificate] = useState<Certificate[]>([])

  useEffect(() => {
    const fetchcerticate= async () => {
      try {
        const res = await GetAllCertification()
        setCertificate(res?.data) 
    
      } catch (error) {
        console.error("Failed to fetch certicates:", error)
      }
    }

    fetchcerticate()
  }, [])



const handleDelete = async (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This certification will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await DeleteCertification(id)
     
   if(res.success == "true"){
      Swal.fire("Deleted!", "The certification has been removed.", "success")
   }
     
      } catch (error) {
        console.error("Delete Error:", error)
        Swal.fire("Failed!", "Something went wrong while deleting.", "error")
      }
    }
  })
}


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <p className="text-muted-foreground">Manage your professional certifications and credentials</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/certificates/add">
            <Plus className="w-4 h-4" />
            Add Certificate
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Certifications</CardTitle>
          <CardDescription>Your professional certifications and credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate</TableHead>
                <TableHead>Issuer</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates.map((certificate) => (
                <TableRow key={certificate._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 flex-shrink-0">
                        <Image
                          src={certificate.image || "/placeholder.svg"}
                          alt={`${certificate.title} badge`}
                          fill
                          className="object-contain rounded"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{certificate.title}</div>
                        <div className="text-sm text-muted-foreground">ID: {certificate.credentialId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{certificate.issuer}</TableCell>
                  <TableCell>{certificate.issueDate}</TableCell>
                  <TableCell>{certificate.expiryDate}</TableCell>
                  <TableCell>
                    <Badge variant={new Date(certificate.expiryDate) > new Date() ? "default" : "destructive"}>
                      {new Date(certificate.expiryDate) > new Date() ? "Valid" : "Expired"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {certificate.verificationUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(certificate.verificationUrl, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/certificates/${certificate._id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(certificate?._id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>


    </div>
  )
}
