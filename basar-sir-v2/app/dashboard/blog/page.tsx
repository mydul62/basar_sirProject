"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react"
import { demoBlogPosts, type BlogPost } from "@/src/lib/demo-data"
import { BlogModal, DeleteBlogModal } from "@/src/components/dashboard/blog-modals"

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(demoBlogPosts)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>()
  const [deletingPost, setDeletingPost] = useState<BlogPost | undefined>()

  const handleAddPost = (postData: Omit<BlogPost, "id">) => {
    const newPost: BlogPost = {
      ...postData,
      id: Date.now().toString(), // Simple ID generation for demo
    }
    setPosts((prev) => [...prev, newPost])
  }

  const handleEditPost = (postData: Omit<BlogPost, "id"> & { id?: string }) => {
    if (!postData.id) return

    setPosts((prev) => prev.map((post) => (post.id === postData.id ? { ...(postData as BlogPost) } : post)))
    setEditingPost(undefined)
  }

  const handleDeletePost = () => {
    if (!deletingPost) return

    setPosts((prev) => prev.filter((post) => post.id !== deletingPost.id))
    setDeletingPost(undefined)
  }

  const handleToggleStatus = (post: BlogPost) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === post.id ? { ...p, status: p.status === "published" ? "draft" : "published" } : p)),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans">Blog Posts</h1>
          <p className="text-muted-foreground font-serif">Create and manage your blog content.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="bg-card border-border">
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
                    onClick={() => handleToggleStatus(post)}
                  >
                    {post.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingPost(post)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingPost(post)}
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

      {/* Add Post Modal */}
      <BlogModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddPost} />

      {/* Edit Post Modal */}
      <BlogModal
        open={!!editingPost}
        onOpenChange={(open) => !open && setEditingPost(undefined)}
        post={editingPost}
        onSubmit={handleEditPost}
      />

      {/* Delete Post Modal */}
      <DeleteBlogModal
        open={!!deletingPost}
        onOpenChange={(open) => !open && setDeletingPost(undefined)}
        post={deletingPost}
        onConfirm={handleDeletePost}
      />
    </div>
  )
}
