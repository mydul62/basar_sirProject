"use client"

import type React from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

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
    },
  })

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      reset(initialData)
    }
  }, [initialData, reset])

  const handleFormSubmit = (data: PublicationData) => {
    console.log("📌 Submitted Publication Data:", data)
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="link">Publication Link</Label>
          <Input id="link" type="url" {...register("link")} placeholder="https://..." />
        </div>
        <div>
          <Label htmlFor="doi">DOI</Label>
          <Input
            id="doi"
            {...register("doi")}
            placeholder="10.1000/xyz123"
          />
        </div>
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
