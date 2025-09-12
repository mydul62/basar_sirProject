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

import type { BlogPost } from "@/src/lib/demo-data"

const blogSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  publishedAt: z.string().min(1),
  status: z.enum(["published", "draft"]),
  readTime: z.number().min(1).max(60),
  imageFile: z.any().optional(),
})

type BlogFormData = z.infer<typeof blogSchema>

interface UpdateBlogFormProps {
  post: BlogPost
}

export function UpdateBlogForm({ post }: UpdateBlogFormProps) {
  const [tags, setTags] = useState<string[]>(post?.tags || [])
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
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      status: post.status,
      readTime: post.readTime,
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

      if (data.imageFile && data.imageFile[0]) {
        formData.append("file", data.imageFile[0])
      }

      const { imageFile, ...restData } = data
      formData.append("data", JSON.stringify({ ...restData, tags, id: post.id }))

      // const res = await UpdateBlog(formData)

      Swal.fire({
        icon: "success",
        title: "Blog Updated",
        text: "Your blog has been updated successfully!",
      })
      // console.log("Blog updated:", res)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update blog",
      })
      console.error("Error updating blog:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Form fields same as AddBlogForm */}
      {/* শুধু submit বাটনে আলাদা টেক্সট */}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Update Post"}
      </Button>
    </form>
  )
}
