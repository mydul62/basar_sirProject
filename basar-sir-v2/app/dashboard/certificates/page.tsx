"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Image from "next/image"
import { demoCertificates, type Certificate } from "@/src/lib/demo-data"
import { CertificateModals } from "@/src/components/dashboard/certificate-modals"

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>(demoCertificates)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  const handleAdd = (certificateData: Omit<Certificate, "id">) => {
    const newCertificate: Certificate = {
      ...certificateData,
      id: Date.now().toString(),
    }
    setCertificates([newCertificate, ...certificates])
    setIsAddModalOpen(false)
  }

  const handleEdit = (certificateData: Omit<Certificate, "id">) => {
    if (!selectedCertificate) return

    setCertificates(
      certificates.map((cert) =>
        cert.id === selectedCertificate.id ? { ...certificateData, id: selectedCertificate.id } : cert,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedCertificate(null)
  }

  const handleDelete = () => {
    if (!selectedCertificate) return

    setCertificates(certificates.filter((cert) => cert.id !== selectedCertificate.id))
    setIsDeleteModalOpen(false)
    setSelectedCertificate(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Certifications</h1>
          <p className="text-muted-foreground">Manage your professional certifications and credentials</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Certificate
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
                <TableRow key={certificate.id}>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCertificate(certificate)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCertificate(certificate)
                          setIsDeleteModalOpen(true)
                        }}
                      >
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

      <CertificateModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedCertificate={selectedCertificate}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
