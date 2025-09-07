"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const grantSchema = z.object({
  title: z.string().min(1, "Project title is required"),
  role: z.string().min(1, "Role is required"),
  fundingAgency: z.string().min(1, "Funding agency is required"),
  location: z.string().optional(),
  amount: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  description: z.string().optional(),
})

type GrantFormData = z.infer<typeof grantSchema>

interface GrantFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function GrantForm({ initialData, onSubmit, onCancel }: GrantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<GrantFormData>({
    resolver: zodResolver(grantSchema),
    defaultValues: {
      title: initialData?.title || "",
      role: initialData?.role || "Principal Investigator",
      fundingAgency: initialData?.fundingAgency || "",
      location: initialData?.location || "",
      amount: initialData?.amount || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      description: initialData?.description || "",
    },
  })

  const onFormSubmit = (data: GrantFormData) => {
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title *</Label>
        <Input id="title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="role">Role</Label>
          <Select value={watch("role")} onValueChange={(value) => setValue("role", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Principal Investigator">Principal Investigator</SelectItem>
              <SelectItem value="Co-Principal Investigator">Co-Principal Investigator</SelectItem>
              <SelectItem value="Co-Investigator">Co-Investigator</SelectItem>
              <SelectItem value="Research Associate">Research Associate</SelectItem>
            </SelectContent>
          </Select>
          {errors.role && <p className="text-sm text-red-500">{errors.role.message}</p>}
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" {...register("location")} />
        </div>
      </div>
      <div>
        <Label htmlFor="fundingAgency">Funding Agency *</Label>
        <Input id="fundingAgency" {...register("fundingAgency")} />
        {errors.fundingAgency && <p className="text-sm text-red-500">{errors.fundingAgency.message}</p>}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input id="amount" {...register("amount")} placeholder="$50,000" />
        </div>
        <div>
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" type="date" {...register("startDate")} />
        </div>
        <div>
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" type="date" {...register("endDate")} />
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" {...register("description")} rows={3} />
      </div>
      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} Grant
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
