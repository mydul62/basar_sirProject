"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Trophy } from "lucide-react"
import { awards as initialAwards } from "@/src/lib/demo-data"
import { AwardModals } from "@/src/components/dashboard/award-modals"

export default function AwardsPage() {
  const [awards, setAwards] = useState(initialAwards)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedAward, setSelectedAward] = useState<any>(null)

  const handleAdd = (awardData: any) => {
    const newAward = {
      ...awardData,
      id: Date.now().toString(),
    }
    setAwards([newAward, ...awards])
    setIsAddModalOpen(false)
  }

  const handleEdit = (awardData: any) => {
    setAwards(awards.map((award) => (award.id === selectedAward.id ? { ...awardData, id: selectedAward.id } : award)))
    setIsEditModalOpen(false)
    setSelectedAward(null)
  }

  const handleDelete = () => {
    setAwards(awards.filter((award) => award.id !== selectedAward.id))
    setIsDeleteModalOpen(false)
    setSelectedAward(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Awards & Honours</h1>
          <p className="text-muted-foreground">Manage your achievements and recognition</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Award
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recognition & Achievements</CardTitle>
          <CardDescription>Your awards, honors, and professional recognition</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Award</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {awards.map((award) => (
                <TableRow key={award.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      {award.title}
                    </div>
                  </TableCell>
                  <TableCell>{award.organization}</TableCell>
                  <TableCell>{award.year}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{award.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAward(award)
                          setIsEditModalOpen(true)
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedAward(award)
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

      <AwardModals
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedAward={selectedAward}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
