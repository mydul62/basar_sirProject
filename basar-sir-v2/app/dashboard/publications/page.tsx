"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import { publications as initialPublications } from "@/src/lib/demo-data"
import { PublicationModals } from "@/src/components/dashboard/publication-modals"

export default function PublicationsPage() {
  const [publications, setPublications] = useState(initialPublications)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<any>(null)

  const handleAdd = (publicationData: any) => {
    const newPublication = {
      ...publicationData,
      id: Date.now().toString(),
    }
    setPublications([newPublication, ...publications])
    setIsAddModalOpen(false)
  }

  const handleEdit = (publicationData: any) => {
    setPublications(
      publications.map((pub) =>
        pub.id === selectedPublication.id ? { ...publicationData, id: selectedPublication.id } : pub,
      ),
    )
    setIsEditModalOpen(false)
    setSelectedPublication(null)
  }

  const handleDelete = () => {
    setPublications(publications.filter((pub) => pub.id !== selectedPublication.id))
    setIsDeleteModalOpen(false)
    setSelectedPublication(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground">Manage your research publications and academic papers</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Publication
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Publications</CardTitle>
          <CardDescription>Your published research papers and academic contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publications.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="truncate">{publication.title}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{publication.authors}</div>
                  </TableCell>
                  <TableCell>{publication.journal}</TableCell>
                  <TableCell>{publication.year}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Published</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {publication.link && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={publication.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPublication(publication)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedPublication(publication)
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

      <PublicationModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedPublication={selectedPublication}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
