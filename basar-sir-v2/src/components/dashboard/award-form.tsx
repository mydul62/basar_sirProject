"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const awardSchema = z.object({
  title: z.string().min(1, "Award title is required"),
  organization: z.string().min(1, "Organization is required"),
  year: z.string().min(4, "Year must be at least 4 digits"),
  type: z.string().min(1, "Type is required"),
  description: z.string().optional(),
})

type AwardFormData = z.infer<typeof awardSchema>

interface AwardFormProps {
  initialData?: Partial<AwardFormData>
  onSubmit: (data: AwardFormData) => void
  onCancel: () => void
}

export function AwardForm({ initialData, onSubmit, onCancel }: AwardFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AwardFormData>({
    resolver: zodResolver(awardSchema),
    defaultValues: {
      title: initialData?.title || "",
      organization: initialData?.organization || "",
      year: initialData?.year || "",
      type: initialData?.type || "Award",
      description: initialData?.description || "",
    },
  })

  const watchedType = watch("type")

  const onFormSubmit = (data: AwardFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Award Title *</Label>
        <Input id="title" {...register("title")} className={errors.title ? "border-destructive" : ""} />
        {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="organization">Organization *</Label>
        <Input
          id="organization"
          {...register("organization")}
          className={errors.organization ? "border-destructive" : ""}
        />
        {errors.organization && <p className="text-sm text-destructive">{errors.organization.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Year *</Label>
          <Input id="year" type="number" {...register("year")} className={errors.year ? "border-destructive" : ""} />
          {errors.year && <p className="text-sm text-destructive">{errors.year.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Select value={watchedType} onValueChange={(value) => setValue("type", value)}>
            <SelectTrigger className={errors.type ? "border-destructive" : ""}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="award">Award</SelectItem>
              <SelectItem value="fellowship">Fellowship</SelectItem>
              <SelectItem value="recognition">Recognition</SelectItem>
              <SelectItem value="honor">Honor</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <p className="text-sm text-destructive">{errors.type.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Optional description of the award..."
          rows={3}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update Award" : "Add Award"}
        </Button>
      </div>
    </form>
  )
}
