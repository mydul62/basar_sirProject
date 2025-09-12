"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const publicationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  authors: z.string().min(1, "Authors are required"),
  journal: z.string().min(1, "Journal/Conference/Book is required"),
  year: z.string().min(1, "Year is required"),
  type: z.enum(["journal", "conference", "book-chapter"]),
  status: z.enum(["published", "accepted", "under-review"]),
  link: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  doi: z.string().optional(),
  abstract: z.string().optional(),
  volume: z.string().optional(),
  pages: z.string().optional(),
})

type PublicationFormData = z.infer<typeof publicationSchema>

interface PublicationFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function PublicationForm({ initialData, onSubmit, onCancel }: PublicationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<PublicationFormData>({
    resolver: zodResolver(publicationSchema),
    defaultValues: {
      title: initialData?.title || "",
      authors: initialData?.authors || "",
      journal: initialData?.journal || "",
      year: initialData?.year || "",
      type: initialData?.type || "journal",
      status: initialData?.status || "published",
      link: initialData?.link || "",
      doi: initialData?.doi || "",
      abstract: initialData?.abstract || "",
      volume: initialData?.volume || "",
      pages: initialData?.pages || "",
    },
  })

  const onFormSubmit = (data: PublicationFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>
        <div className="col-span-2">
          <Label htmlFor="authors">Authors *</Label>
          <Input id="authors" {...register("authors")} placeholder="Author 1, Author 2, Author 3" />
          {errors.authors && <p className="text-sm text-red-500">{errors.authors.message}</p>}
        </div>
        <div>
          <Label htmlFor="type">Publication Type *</Label>
          <Select
            value={watch("type")}
            onValueChange={(value: "journal" | "conference" | "book-chapter") => setValue("type", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="journal">Journal</SelectItem>
              <SelectItem value="conference">Conference Proceedings</SelectItem>
              <SelectItem value="book-chapter">Book Chapter</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
        </div>
        <div>
          <Label htmlFor="status">Status *</Label>
          <Select
            value={watch("status")}
            onValueChange={(value: "published" | "accepted" | "under-review") => setValue("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
        </div>
        <div>
          <Label htmlFor="journal">Journal/Conference/Book *</Label>
          <Input id="journal" {...register("journal")} />
          {errors.journal && <p className="text-sm text-red-500">{errors.journal.message}</p>}
        </div>
        <div>
          <Label htmlFor="year">Year *</Label>
          <Input id="year" type="number" {...register("year")} />
          {errors.year && <p className="text-sm text-red-500">{errors.year.message}</p>}
        </div>
        <div>
          <Label htmlFor="volume">Volume</Label>
          <Input id="volume" {...register("volume")} placeholder="e.g., 12" />
        </div>
        <div>
          <Label htmlFor="pages">Pages</Label>
          <Input id="pages" {...register("pages")} placeholder="e.g., 101-120" />
        </div>
        <div>
          <Label htmlFor="link">Publication Link</Label>
          <Input id="link" type="url" {...register("link")} placeholder="https://..." />
          {errors.link && <p className="text-sm text-red-500">{errors.link.message}</p>}
        </div>
        <div>
          <Label htmlFor="doi">DOI</Label>
          <Input id="doi" {...register("doi")} placeholder="10.1000/xyz123" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea id="abstract" {...register("abstract")} rows={4} />
        </div>
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} Publication
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
