"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Trophy } from "lucide-react"
import { DeleteAward, GetAllAward } from "@/src/services/award"

import Swal from "sweetalert2"
import { IAward } from "@/src/lib/demo-data"
export default function AwardsPage() {
 const [awards, setAwards] = useState<IAward[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllAward()
        setAwards(res?.data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])




const handleDelete = async (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await DeleteAward(id)
        Swal.fire("Deleted!", "The award has been removed.", "success")
      } catch (error) {
        console.error("Delete Error:", error)
        Swal.fire("Failed!", "Something went wrong.", "error")
      }
    }
  })
}

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Awards & Honours</h1>
          <p className="text-muted-foreground">Manage your achievements and recognition</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/awards/add">
            <Plus className="w-4 h-4" />
            Add Award
          </Link>
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
                <TableRow key={award._id}>
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/awards/${award.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                   (handleDelete(award?._id))
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

    </div>
  )
}
