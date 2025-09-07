"use client"

import { useRouter } from "next/navigation"
import { BlogForm } from "@/src/components/dashboard/AddBlogForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddBlogPage() {
  const router = useRouter()

  const handleSubmit = (data: any) => {
    console.log("Creating blog post:", data)
    router.push("/dashboard/blog")
  }

  const handleCancel = () => {
    router.push("/dashboard/blog")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <BlogForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
