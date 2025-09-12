"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  // const post = blogPosts.find((p) => p.id === params.id)

  // if (!post) {
  //   return <div>Blog post not found</div>
  // }

  const handleSubmit = (data: any) => {
    console.log("Updating blog post:", data)
    router.push("/dashboard/blog")
  }

  const handleCancel = () => {
    router.push("/dashboard/blog")
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <BlogForm post={post} onSubmit={handleSubmit} onCancel={handleCancel} /> */}
        </CardContent>
      </Card>
    </div>
  )
}
