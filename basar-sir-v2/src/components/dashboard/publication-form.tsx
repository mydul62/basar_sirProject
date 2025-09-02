"use client"

import type React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { CreatePublication } from "@/src/services/Publications"
import Swal from "sweetalert2"

interface PublicationFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

type PublicationData = {
  title: string
  authors: string
  journal: string
  year: string
  link?: string
  doi?: string
  abstract?: string
  type: "journal" | "conference" | "book-chapter"
  status: "published" | "accepted" | "under-review"
  volume?: string
  pages?: string
}

export function PublicationForm({
  initialData,
  onSubmit,
  onCancel,
}: PublicationFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PublicationData>({
    defaultValues: {
      title: "",
      authors: "",
      journal: "",
      year: "",
      link: "",
      doi: "",
      abstract: "",
      type: "journal",
      status: "published",
      volume: "",
      pages: "",
    },
  })

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const handleFormSubmit = async (data: PublicationData) => {
    console.log("📌 Submitted Publication Data:", data)

    try {
      const res = await CreatePublication(data)
      console.log(res)
      if (res.success) {
      onCancel()
        await Swal.fire({
          title: "✅ Success!",
          text: "Publication has been added successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        })
        onSubmit(data)
      }
    } catch (error: any) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Title */}
        <div className="col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Authors */}
        <div className="col-span-2">
          <Label htmlFor="authors">Authors *</Label>
          <Input
            id="authors"
            {...register("authors", { required: "Authors are required" })}
            placeholder="Author 1, Author 2, Author 3"
          />
          {errors.authors && (
            <p className="text-sm text-red-500">{errors.authors.message}</p>
          )}
        </div>

        {/* Journal */}
        <div>
          <Label htmlFor="journal">Journal *</Label>
          <Input
            id="journal"
            {...register("journal", { required: "Journal is required" })}
          />
          {errors.journal && (
            <p className="text-sm text-red-500">{errors.journal.message}</p>
          )}
        </div>

        {/* Year */}
        <div>
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            {...register("year", { required: "Year is required" })}
          />
          {errors.year && (
            <p className="text-sm text-red-500">{errors.year.message}</p>
          )}
        </div>

        {/* Volume */}
        <div>
          <Label htmlFor="volume">Volume</Label>
          <Input id="volume" {...register("volume")} />
        </div>

        {/* Pages */}
        <div>
          <Label htmlFor="pages">Pages</Label>
          <Input id="pages" {...register("pages")} placeholder="123-135" />
        </div>

        {/* Publication Link */}
        <div>
          <Label htmlFor="link">Publication Link</Label>
          <Input id="link" type="url" {...register("link")} placeholder="https://..." />
        </div>

        {/* DOI */}
        <div>
          <Label htmlFor="doi">DOI</Label>
          <Input id="doi" {...register("doi")} placeholder="10.1000/xyz123" />
        </div>

        {/* Type */}
        <div>
          <Label htmlFor="type">Type *</Label>
          <select
            id="type"
            {...register("type", { required: "Type is required" })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
            <option value="book-chapter">Book Chapter</option>
          </select>
          {errors.type && (
            <p className="text-sm text-red-500">{errors.type.message}</p>
          )}
        </div>

        {/* Status */}
        <div>
          <Label htmlFor="status">Status *</Label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="w-full rounded-md border border-gray-300 p-2"
          >
            <option value="published">Published</option>
            <option value="accepted">Accepted</option>
            <option value="under-review">Under Review</option>
          </select>
          {errors.status && (
            <p className="text-sm text-red-500">{errors.status.message}</p>
          )}
        </div>

        {/* Abstract */}
        <div className="col-span-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea id="abstract" rows={4} {...register("abstract")} />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Publication</Button>
      </DialogFooter>
    </form>
  )
}
