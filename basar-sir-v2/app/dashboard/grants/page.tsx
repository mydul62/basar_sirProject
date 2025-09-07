"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, DollarSign } from "lucide-react"
import Link from "next/link"
import { grants as initialGrants } from "@/src/lib/demo-data"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function GrantsPage() {
  const [grants, setGrants] = useState(initialGrants)
  const [deletingGrant, setDeletingGrant] = useState<any>(null)

  const handleDelete = () => {
    if (!deletingGrant) return

    setGrants(grants.filter((grant) => grant.id !== deletingGrant.id))
    setDeletingGrant(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Grants & Projects</h1>
          <p className="text-muted-foreground">Manage your research funding and project grants</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/grants/add">
            <Plus className="w-4 h-4" />
            Add Grant
          </Link>
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/grants/${grant.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingGrant(grant)}>
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

      <AlertDialog open={!!deletingGrant} onOpenChange={(open) => !open && setDeletingGrant(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Grant</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingGrant?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
