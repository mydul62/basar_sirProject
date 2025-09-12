"use client"

import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AddBlogForm } from "@/src/components/dashboard/AddBlogForm"

export default function AddBlogPage() {

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <AddBlogForm />
        </CardContent>
      </Card>
    </div>
  )
}
