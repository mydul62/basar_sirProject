"use client"

import React, { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import Swal from "sweetalert2"
import { UpdateProject } from "@/src/services/projects"


const projectSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.array(z.string()).min(1, "At least one technology is required"),
  status: z.enum(["completed", "in-progress", "planned"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid live URL").optional().or(z.literal("")),
  imageFile: z.any().optional(), // File type
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectUpdateFormProps {
  project: any
  onCancel: () => void
}

export function ProjectUpdateForm({ project, onCancel }: ProjectUpdateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      status: "planned",
      startDate: "",
      endDate: "",
      githubUrl: "",
      liveUrl: "",
      imageFile: undefined,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "technologies",
  })

  const [newTech, setNewTech] = React.useState("")

  useEffect(() => {
    if (project) {
      setValue("title", project.title)
      setValue("description", project.description)
      setValue("status", project.status)
      setValue("startDate", project.startDate)
      setValue("endDate", project.endDate)
      setValue("githubUrl", project.githubUrl)
      setValue("liveUrl", project.liveUrl)
      setValue("technologies", project.technologies || [])
    }
  }, [project, setValue])

  const handleAddTechnology = () => {
    if (newTech.trim()) {
      const currentTechs = watch("technologies")
      if (!currentTechs.includes(newTech.trim())) {
        append(newTech.trim())
        setNewTech("")
      }
    }
  }

  const onFormSubmit = async (data: ProjectFormData) => {
    try {
      const formData = new FormData()

      // append file if selected
      if (data.imageFile && data.imageFile[0]) {
        formData.append("file", data.imageFile[0])
      }

      // append rest of the data
      const { imageFile, ...restData } = data
      formData.append("data", JSON.stringify({ ...restData, id: project.id }))

      const res = await UpdateProject(formData) 
      console.log("Project updated:", res)

      Swal.fire({
        icon: "success",
        title: "Project Updated!",
        text: "Your project has been successfully updated.",
        confirmButtonText: "OK",
      })

  
    } catch (error) {
      console.error("Error updating project:", error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while updating the project.",
        confirmButtonText: "OK",
      })
    }
  }

  const watchedStatus = watch("status")

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Project Title *</Label>
        <Input id="title" {...register("title")} placeholder="Enter project title" className={errors.title ? "border-destructive" : ""} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea id="description" {...register("description")} placeholder="Describe your project" rows={3} className={errors.description ? "border-destructive" : ""} />
        {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select value={watchedStatus} onValueChange={(value: "completed" | "in-progress" | "planned") => setValue("status", value)}>
          <SelectTrigger className={errors.status ? "border-destructive" : ""}>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planned">Planned</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-sm text-destructive">{errors.status.message}</p>}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="date" {...register("startDate")} className={errors.startDate ? "border-destructive" : ""} />
          {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" {...register("endDate")} className={errors.endDate ? "border-destructive" : ""} />
          {errors.endDate && <p className="text-sm text-destructive">{errors.endDate.message}</p>}
        </div>
      </div>

      {/* Technologies */}
      <div className="space-y-2">
        <Label>Technologies *</Label>
        <div className="flex gap-2">
          <Input
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            placeholder="Add technology"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTechnology())}
          />
          <Button type="button" onClick={handleAddTechnology} variant="outline" size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {/* <div className="flex flex-wrap gap-2 mt-2">
          {fields.map((field, index) => (
            <Badge key={index} variant="secondary" className="flex items-center gap-1">
              {field as unknown as string}
              <X className="w-3 h-3 cursor-pointer" onClick={() => remove(index)} />
            </Badge>
          ))}
        </div> */}
        {errors.technologies && <p className="text-sm text-destructive">{errors.technologies.message}</p>}
      </div>

      {/* GitHub & Live URL */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub URL</Label>
          <Input id="githubUrl" type="url" {...register("githubUrl")} placeholder="https://github.com/..." className={errors.githubUrl ? "border-destructive" : ""} />
          {errors.githubUrl && <p className="text-sm text-destructive">{errors.githubUrl.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="liveUrl">Live URL</Label>
          <Input id="liveUrl" type="url" {...register("liveUrl")} placeholder="https://..." className={errors.liveUrl ? "border-destructive" : ""} />
          {errors.liveUrl && <p className="text-sm text-destructive">{errors.liveUrl.message}</p>}
        </div>
      </div>

      {/* Native File Input */}
      <div className="space-y-2">
        <Label htmlFor="imageFile">Project Image (Change if needed)</Label>
        <Input
          id="imageFile"
          type="file"
          accept="image/*"
          {...register("imageFile")}
        />
        {typeof errors.imageFile?.message === "string" && (
          <p className="text-sm text-destructive">{errors.imageFile.message}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Update Project"}
        </Button>
      </div>
    </form>
  )
}
