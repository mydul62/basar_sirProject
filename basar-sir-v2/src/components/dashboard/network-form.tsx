"use client"

import { useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const networkSchema = z.object({
  role: z.string().min(1, "Role/Position is required"),
  organization: z.string().min(1, "Organization is required"),
  type: z.string().min(1, "Type is required"),
  startYear: z.string().optional(),
  endYear: z.string().optional(),
})

type NetworkFormData = z.infer<typeof networkSchema>

interface NetworkFormProps {
  initialData?: Partial<NetworkFormData>
  onSubmit: (data: NetworkFormData) => void
  onCancel: () => void
}

export function NetworkForm({ initialData, onSubmit, onCancel }: NetworkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<NetworkFormData>({
    resolver: zodResolver(networkSchema),
    defaultValues: {
      role: "",
      organization: "",
      type: "Membership",
      startYear: "",
      endYear: "",
    },
  })

  // 🔑 When initialData arrives, load it into the form
  useEffect(() => {
    if (initialData) {
      reset({
        role: initialData.role || "",
        organization: initialData.organization || "",
        type: initialData.type || "Membership",
        startYear: initialData.startYear || "",
        endYear: initialData.endYear || "",
      })
    }
  }, [initialData, reset])

  const onFormSubmit = (data: NetworkFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* Role */}
      <div>
        <Label htmlFor="role">Role/Position *</Label>
        <Input id="role" {...register("role")} />
        {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
      </div>

      {/* Organization */}
      <div>
        <Label htmlFor="organization">Organization *</Label>
        <Input id="organization" {...register("organization")} />
        {errors.organization && (
          <p className="text-sm text-red-500">{errors.organization.message}</p>
        )}
      </div>

      {/* Type */}
      <div>
        <Label htmlFor="type">Type *</Label>
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Membership">Membership</SelectItem>
                <SelectItem value="Editorial">Editorial</SelectItem>
                <SelectItem value="Advisory">Advisory</SelectItem>
                <SelectItem value="Committee">Committee</SelectItem>
                <SelectItem value="Board">Board</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
      </div>

      {/* Years */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startYear">Start Year</Label>
          <Controller
            name="startYear"
            control={control}
            render={({ field }) => (
              <Input id="startYear" type="number" {...field} />
            )}
          />
        </div>
        <div>
          <Label htmlFor="endYear">End Year</Label>
          <Controller
            name="endYear"
            control={control}
            render={({ field }) => (
              <Input
                id="endYear"
                type="number"
                placeholder="Leave empty if current"
                {...field}
              />
            )}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} Network
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
