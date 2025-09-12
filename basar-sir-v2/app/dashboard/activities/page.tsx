"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Briefcase } from "lucide-react"

import Swal from "sweetalert2"
import { Activity } from "@/src/lib/demo-data"
import { DeleteActivities, GetAllActivities } from "@/src/services/activities"


export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await GetAllActivities()
        setActivities(res?.data)
      } catch (error) {
        console.error("Failed to fetch activities:", error)
      }
    }

    fetchActivities()
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
          await DeleteActivities(id)
          setActivities((prev) => prev.filter((activity) => activity.id !== id))
          Swal.fire("Deleted!", "The activity has been removed.", "success")
        } catch (error) {
          console.error("Delete Error:", error)
          Swal.fire("Failed!", "Something went wrong.", "error")
        }
      }
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Activities</h1>
          <p className="text-muted-foreground">Manage your volunteering, leadership, and community activities</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/activities/add">
            <Plus className="w-4 h-4" />
            Add Activity
          </Link>
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activities Overview</CardTitle>
          <CardDescription>Your volunteering, leadership, and community contributions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Skills</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      {activity.title}
                    </div>
                  </TableCell>
                  <TableCell>{activity.organization}</TableCell>
                  <TableCell>{activity.role}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{activity.type}</Badge>
                  </TableCell>
                  <TableCell>{activity.startDate}</TableCell>
                  <TableCell>{activity.endDate || "Ongoing"}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                  <TableCell>{activity.skills.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/activities/${activity._id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(activity._id!)}
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
