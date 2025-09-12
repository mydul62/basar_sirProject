"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react"
import {  type BlogPost } from "@/src/lib/demo-data"
import Link from "next/link"
import { DeleteBlog, GetAllBlog } from "@/src/services/blogs"
import Swal from "sweetalert2"
export default function BlogPage() {
 const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllBlog()
        setPosts(res?.data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])



const handleDeletePost = async (id: string) => {
console.log(id)
  Swal.fire({
    title: "Are you sure?",
    text: "This blog post will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await DeleteBlog(id)
        console.log("Delete Response:", res)
      if(res.success=='true'){
         Swal.fire("Deleted!", "The blog post has been removed.", "success")
     }
    
      } catch (error) {
        console.error("Delete Error:", error)
        Swal.fire("Failed!", "Something went wrong while deleting.", "error")
      }
    }
  })
}



  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans">Blog Posts</h1>
          <p className="text-muted-foreground font-serif">Create and manage your blog content.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/blog/add">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post._id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold font-sans">{post.title}</CardTitle>
                  <CardDescription className="font-serif">{post.excerpt}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={post.status === "published" ? "default" : "secondary"}
                    className="cursor-pointer"
                  >
                    {post.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/blog/${post._id}/edit`}>
                        <Edit className="w-4 h-4" />
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeletePost(post?._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground line-clamp-2">{post.content}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


    </div>
  )
}
