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
import Swal from "sweetalert2"
import { createCertification } from "@/src/services/certification"
import { useRouter } from "next/navigation"


const certificateSchema = z.object({
  title: z.string().min(1, "Certificate title is required"),
  issuer: z.string().min(1, "Issuer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  expiryDate: z.string().optional(),
  credentialId: z.string().optional(),
  description: z.string().optional(),
  verificationUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  imageFile: z.any().optional(),
})

type CertificateFormData = z.infer<typeof certificateSchema>

export function AddCertificateForm() {
  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")
     const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CertificateFormData>({
    resolver: zodResolver(certificateSchema),
    defaultValues: {
      title: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      credentialId: "",
      description: "",
      verificationUrl: "",
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

  const onFormSubmit = async (data: CertificateFormData) => {
    try {
      const formData = new FormData()

      if (data.imageFile && data.imageFile[0]) {
        formData.append("file", data.imageFile[0])
      }

      const { imageFile, ...restData } = data
      formData.append("data", JSON.stringify({ ...restData, skills }))
        const res =    await createCertification(formData)
        if(res.success == "true"){
            router.push("/dashboard/certificates")
        }
      Swal.fire({
        icon: "success",
        title: "Certificate Created",
        text: "Your certificate has been added successfully!",
      })
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create certificate",
      })
      console.error("Error creating certificate:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Certificate Title *</Label>
          <Input {...register("title")} />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>
        <div>
          <Label>Issuer *</Label>
          <Input {...register("issuer")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Issue Date *</Label>
          <Input {...register("issueDate")} />
        </div>
        <div>
          <Label>Expiry Date</Label>
          <Input {...register("expiryDate")} />
        </div>
      </div>

      <div>
        <Label>Credential ID</Label>
        <Input {...register("credentialId")} />
      </div>

      <div>
        <Label>Description</Label>
        <Textarea {...register("description")} rows={3} />
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
          <Button type="button" onClick={handleAddSkill} variant="outline">Add</Button>
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
        <Label>Verification URL</Label>
        <Input type="url" {...register("verificationUrl")} />
      </div>

      <div>
        <Label>Certificate Image</Label>
        <Input type="file" accept="image/*" {...register("imageFile")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Certificate"}
      </Button>
    </form>
  )
}
