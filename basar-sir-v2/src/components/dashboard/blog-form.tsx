"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { BlogPost } from "@/src/lib/demo-data"

interface BlogFormProps {
  post?: BlogPost
  onSubmit: (post: Omit<BlogPost, "id"> & { id?: string }) => void
  onCancel: () => void
}

export function BlogForm({ post, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: post?.title || "",
    excerpt: post?.excerpt || "",
    content: post?.content || "",
    publishedAt: post?.publishedAt || new Date().toISOString().split("T")[0],
    tags: post?.tags || [],
    status: post?.status || ("draft" as const),
    readTime: post?.readTime || 5,
    imageUrl: post?.imageUrl || "",
  })

  const [newTag, setNewTag] = useState("")

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      ...(post?.id && { id: post.id }),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Post Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          placeholder="Enter post title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
          placeholder="Brief description of your post"
          rows={2}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
          placeholder="Write your blog post content here..."
          rows={8}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: "published" | "draft") => setFormData((prev) => ({ ...prev, status: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="readTime">Read Time (minutes)</Label>
          <Input
            id="readTime"
            type="number"
            min="1"
            max="60"
            value={formData.readTime}
            onChange={(e) => setFormData((prev) => ({ ...prev, readTime: Number.parseInt(e.target.value) || 5 }))}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="publishedAt">Published Date</Label>
        <Input
          id="publishedAt"
          type="date"
          value={formData.publishedAt}
          onChange={(e) => setFormData((prev) => ({ ...prev, publishedAt: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add tag"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
          />
          <Button type="button" onClick={handleAddTag} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">Featured Image URL</Label>
        <Input
          id="imageUrl"
          type="url"
          value={formData.imageUrl}
          onChange={(e) => setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit">{post ? "Update Post" : "Create Post"}</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
