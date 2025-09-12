"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// Roles array
const roles = [
  "Lead Guest Editor",
  "Technical Trainer",
  "Volunteer Coordinator",
  "Lead Guest Editor Lead Guest Editor",
] as const

export const activitySchema = z.object({
  title: z.string().min(1, "Title is required"),
  organization: z.string().min(1, "Organization is required"),
  type: z.enum(["volunteering", "leadership", "community"], {
    errorMap: () => ({ message: "Type must be volunteering, leadership, or community" }),
  }),
  role: z.enum(roles, {
    errorMap: () => ({ message: "Role must be a valid option" }),
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  location: z.string().min(1, "Location is required"),
})

type ActivityFormData = z.infer<typeof activitySchema>

interface ActivityFormProps {
  initialData?: Partial<ActivityFormData>
  onSubmit: (data: ActivityFormData) => void
  onCancel: () => void
}

export function ActivityForm({ initialData, onSubmit, onCancel }: ActivityFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: initialData?.title || "",
      organization: initialData?.organization || "",
      type: initialData?.type || "volunteering",
      role: initialData?.role || "Lead Guest Editor",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      description: initialData?.description || "",
      skills: initialData?.skills || [],
      location: initialData?.location || "",
    },
  })

  const watchedType = watch("type")
  const watchedRole = watch("role")
  const watchedSkills = watch("skills")

  const onFormSubmit = (data: ActivityFormData) => {
    if (typeof data.skills === "string") {
      data.skills = (data.skills as unknown as string)
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    }
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input id="title" {...register("title")} className={errors.title ? "border-destructive" : ""} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      {/* Organization */}
      <div className="space-y-2">
        <Label htmlFor="organization">Organization *</Label>
        <Input
          id="organization"
          {...register("organization")}
          className={errors.organization ? "border-destructive" : ""}
        />
        {errors.organization && <p className="text-sm text-destructive">{errors.organization.message}</p>}
      </div>

      {/* Type & Role */}
      <div className="grid grid-cols-2 gap-4">
        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={watchedType} onValueChange={(value) => setValue("type", value as any)}>
            <SelectTrigger className={errors.type ? "border-destructive" : ""}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="volunteering">Volunteering</SelectItem>
              <SelectItem value="leadership">Leadership</SelectItem>
              <SelectItem value="community">Community</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role *</Label>
          <Select value={watchedRole} onValueChange={(value) => setValue("role", value as any)}>
            <SelectTrigger className={errors.role ? "border-destructive" : ""}>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-destructive">{errors.role.message}</p>}
        </div>
      </div>

      {/* Start & End Date */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date *</Label>
          <Input id="startDate" type="date" {...register("startDate")} className={errors.startDate ? "border-destructive" : ""} />
          {errors.startDate && <p className="text-sm text-destructive">{errors.startDate.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input id="location" {...register("location")} className={errors.location ? "border-destructive" : ""} />
        {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <Label htmlFor="skills">Skills (comma-separated) *</Label>
        <Input
          id="skills"
          defaultValue={watchedSkills?.join(", ")}
          onChange={(e) =>
            setValue(
              "skills",
              e.target.value.split(",").map((s) => s.trim())
            )
          }
          className={errors.skills ? "border-destructive" : ""}
        />
        {errors.skills && <p className="text-sm text-destructive">{errors.skills.message}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Optional description of the activity..."
          rows={3}
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Activity" : "Add Activity"}
        </Button>
      </div>
    </form>
  )
}
