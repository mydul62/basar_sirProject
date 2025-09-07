"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { ImageUploader } from "../ui/image-uploader"

const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  image: z.string().optional(),
  description: z.string().optional(),
  verificationUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
})

type CertificateFormData = z.infer<typeof certificateSchema>

interface CertificateFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function CertificateForm({ initialData, onSubmit, onCancel }: CertificateFormProps) {
  const [skills, setSkills] = useState<string[]>(initialData?.skills || [])
  const [newSkill, setNewSkill] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: initialData?.title || "",
      issuer: initialData?.issuer || "",
      issueDate: initialData?.issueDate || "",
      expiryDate: initialData?.expiryDate || "",
      credentialId: initialData?.credentialId || "",
      image: initialData?.image || "",
      description: initialData?.description || "",
      verificationUrl: initialData?.verificationUrl || "",
    },
  })

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()])
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const onFormSubmit = (data: CertificateFormData) => {
    onSubmit({
      ...data,
      skills,
    })
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Certificate Title *</Label>
          <Input id="title" {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <Label htmlFor="issuer">Issuer *</Label>
          <Input id="issuer" {...register("issuer")} />
          {errors.issuer && <p className="text-sm text-red-500">{errors.issuer.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issueDate">Issue Date *</Label>
          <Input id="issueDate" {...register("issueDate")} placeholder="2024" />
          {errors.issueDate && <p className="text-sm text-red-500">{errors.issueDate.message}</p>}
        </div>
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input id="expiryDate" {...register("expiryDate")} placeholder="2027" />
        </div>
      </div>

      <div>
        <Label htmlFor="credentialId">Credential ID</Label>
        <Input id="credentialId" {...register("credentialId")} placeholder="AWS-CSA-2024-001" />
      </div>

      <ImageUploader
        value={watch("image") || ""}
        onChange={(value) => setValue("image", value)}
        label="Certificate Image"
        placeholder="https://example.com/certificate-badge.png"
        error={errors.image?.message}
      />

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Brief description of the certification..."
          rows={3}
        />
      </div>

      <div>
        <Label>Skills & Technologies</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add skill"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
          />
          <Button type="button" onClick={handleAddSkill} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemoveSkill(skill)} />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="verificationUrl">Verification URL</Label>
        <Input
          id="verificationUrl"
          type="url"
          {...register("verificationUrl")}
          placeholder="https://verify.example.com/certificate-id"
        />
        {errors.verificationUrl && <p className="text-sm text-red-500">{errors.verificationUrl.message}</p>}
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : initialData ? "Update" : "Add"} Certificate
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
