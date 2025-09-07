"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import Swal from "sweetalert2"
import { CreateBlog } from "@/src/actions/blog.actions"   // 👉 আপনার API কল এখানে থাকবে

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  publishedAt: z.string().min(1, "Published date is required"),
  status: z.enum(["published", "draft"]),
  readTime: z.number().min(1).max(60),
  imageFile: z.any().optional(), // file input
})

type BlogFormData = z.infer<typeof blogSchema>

export function AddBlogForm() {
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      publishedAt: new Date().toISOString().split("T")[0],
      status: "draft",
      readTime: 5,
    },
  })

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const onFormSubmit = async (data: BlogFormData) => {
    try {
      const formData = new FormData()

      // file
      if (data.imageFile && data.imageFile[0]) {
        formData.append("file", data.imageFile[0])
      }

      // rest data
      const { imageFile, ...restData } = data
      formData.append("data", JSON.stringify({ ...restData, tags }))

      const res = await CreateBlog(formData)

      Swal.fire({
        icon: "success",
        title: "Blog Created",
        text: "Your blog has been created successfully!",
      })
      console.log("Blog created:", res)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create blog",
      })
      console.error("Error creating blog:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Post Title</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>

      {/* Excerpt */}
      <div>
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea id="excerpt" {...register("excerpt")} rows={2} />
      </div>

      {/* Content */}
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" {...register("content")} rows={8} />
      </div>

      {/* Status + ReadTime */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Status</Label>
          <Select value={watch("status")} onValueChange={(val) => setValue("status", val as "published" | "draft")}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Read Time</Label>
          <Input type="number" {...register("readTime", { valueAsNumber: true })} />
        </div>
      </div>

      {/* PublishedAt */}
      <div>
        <Label htmlFor="publishedAt">Published Date</Label>
        <Input id="publishedAt" type="date" {...register("publishedAt")} />
      </div>

      {/* Tags */}
      <div>
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
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
            </Badge>
          ))}
        </div>
      </div>

      {/* Image File */}
      <div>
        <Label>Featured Image</Label>
        <Input type="file" accept="image/*" {...register("imageFile")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Create Post"}
      </Button>
    </form>
  )
}
