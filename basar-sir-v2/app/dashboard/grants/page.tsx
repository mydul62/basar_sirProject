"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"
import { grants as initialGrants } from "@/src/lib/demo-data"
import { GrantModals } from "@/src/components/dashboard/grant-modals"

export default function GrantsPage() {
  const [grants, setGrants] = useState(initialGrants)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedGrant, setSelectedGrant] = useState<any>(null)

  const handleAdd = (grantData: any) => {
    const newGrant = {
      ...grantData,
      id: Date.now().toString(),
    }
    setGrants([newGrant, ...grants])
    setIsAddModalOpen(false)
  }

  const handleEdit = (grantData: any) => {
    setGrants(grants.map((grant) => (grant.id === selectedGrant.id ? { ...grantData, id: selectedGrant.id } : grant)))
    setIsEditModalOpen(false)
    setSelectedGrant(null)
  }

  const handleDelete = () => {
    setGrants(grants.filter((grant) => grant.id !== selectedGrant.id))
    setIsDeleteModalOpen(false)
    setSelectedGrant(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grants & Projects</h1>
          <p className="text-muted-foreground">Manage your research funding and project grants</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Grant
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Research Funding</CardTitle>
          <CardDescription>Your research grants, funding, and project investments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Funding Agency</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grants.map((grant) => (
                <TableRow key={grant.id}>
                  <TableCell className="font-medium max-w-xs">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <div className="truncate">{grant.title}</div>
                    </div>
                  </TableCell>
                  <TableCell>{grant.role}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate">{grant.fundingAgency}</div>
                  </TableCell>
                  <TableCell>{grant.location}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedGrant(grant)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedGrant(grant)
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

      <GrantModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedGrant={selectedGrant}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
