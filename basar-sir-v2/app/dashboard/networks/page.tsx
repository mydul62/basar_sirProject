"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import Link from "next/link"
import { IAward } from "@/src/lib/demo-data"
import { DeleteNetworks, GetAllNetworks } from "@/src/services/networks"
import Swal from "sweetalert2"

export default function NetworksPage() {
 const [networks, setNetworks] = useState<IAward[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllNetworks()
        setNetworks(res?.data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])



const handleDelete = async (id: string) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This network will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await DeleteNetworks(id)
       if(res.success =="true"){
        Swal.fire("Deleted!", "The network has been removed.", "success")
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
          <h1 className="text-3xl font-bold text-foreground">Professional Networks</h1>
          <p className="text-muted-foreground">Manage your professional affiliations and memberships</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/networks/add">
            <Plus className="w-4 h-4" />
            Add Network
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Professional Affiliations</CardTitle>
          <CardDescription>Your memberships, editorial roles, and professional connections</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Organization</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {networks.map((network) => (
                <TableRow key={network._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      {network.role}
                    </div>
                  </TableCell>
                  <TableCell>{network.organization}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{network.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Active</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/networks/${network._id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(network?._id)}>
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
