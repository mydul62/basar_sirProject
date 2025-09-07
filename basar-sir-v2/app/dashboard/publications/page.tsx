"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { publications as initialPublications } from "@/src/lib/demo-data"
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

export default function PublicationsPage() {
  const [publications, setPublications] = useState(initialPublications)
  const [deletingPublication, setDeletingPublication] = useState<any>(null)

  const handleDelete = () => {
    if (!deletingPublication) return

    setPublications(publications.filter((pub) => pub.id !== deletingPublication.id))
    setDeletingPublication(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Publications</h1>
          <p className="text-muted-foreground">Manage your research publications and academic papers</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/publications/add">
            <Plus className="w-4 h-4" />
            Add Publication
          </Link>
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
                <TableHead>Type</TableHead>
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
                  <TableCell>
                    <Badge variant="outline" className="text-xs">
                      {publication.type === "journal"
                        ? "Journal"
                        : publication.type === "conference"
                          ? "Conference"
                          : "Book Chapter"}
                    </Badge>
                  </TableCell>
                  <TableCell>{publication.year}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        publication.status === "published"
                          ? "default"
                          : publication.status === "accepted"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {publication.status === "published"
                        ? "Published"
                        : publication.status === "accepted"
                          ? "Accepted"
                          : "Under Review"}
                    </Badge>
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
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/dashboard/publications/${publication.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingPublication(publication)}>
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

      <AlertDialog open={!!deletingPublication} onOpenChange={(open) => !open && setDeletingPublication(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Publication</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deletingPublication?.title}"? This action cannot be undone.
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
