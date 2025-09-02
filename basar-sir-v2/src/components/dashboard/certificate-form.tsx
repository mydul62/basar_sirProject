"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { X, Upload, Trash2 } from "lucide-react"
import Image from "next/image"

interface CertificateFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function CertificateForm({ initialData, onSubmit, onCancel }: CertificateFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    credentialId: "",
    image: "",
    description: "",
    skills: [] as string[],
    verificationUrl: "",
  })

  const [newSkill, setNewSkill] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
      setImagePreview(initialData.image || "")
    }
  }, [initialData])

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setFormData({ ...formData, skills: formData.skills.filter((s) => s !== skill) })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFormData({ ...formData, image: value })
    setImagePreview(value)
    setUploadedFile(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setIsUploading(true)
    setUploadedFile(file)

    try {
      // Create a preview URL for the uploaded file
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // In a real application, you would upload to a service like Vercel Blob
      // For demo purposes, we'll simulate an upload and use a placeholder
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate upload delay

      // Generate a mock URL for the uploaded file
      const mockUploadedUrl = `/uploaded-certificates/${file.name}`
      setFormData({ ...formData, image: mockUploadedUrl })
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    setFormData({ ...formData, image: "" })
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Certificate Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="issuer">Issuer *</Label>
          <Input
            id="issuer"
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="issueDate">Issue Date *</Label>
          <Input
            id="issueDate"
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            placeholder="2024"
            required
          />
        </div>
        <div>
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            placeholder="2027"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="credentialId">Credential ID</Label>
        <Input
          id="credentialId"
          value={formData.credentialId}
          onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })}
          placeholder="AWS-CSA-2024-001"
        />
      </div>

      <div>
        <Label>Certificate Image</Label>
        <div className="space-y-3">
          {/* File Upload Section */}
          <div className="border-2 border-dashed border-border rounded-lg p-4">
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <div className="text-sm text-muted-foreground mb-2">Upload certificate badge or image</div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="mb-2"
              >
                {isUploading ? "Uploading..." : "Choose File"}
              </Button>
              <div className="text-xs text-muted-foreground">Supports: JPG, PNG, GIF (max 5MB)</div>
            </div>
          </div>

          {/* URL Input Alternative */}
          <div className="relative">
            <Label htmlFor="image" className="text-sm text-muted-foreground">
              Or enter image URL
            </Label>
            <Input
              id="image"
              value={formData.image}
              onChange={handleImageChange}
              placeholder="https://example.com/certificate-badge.png"
              className="mt-1"
            />
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="relative">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                <div className="relative w-16 h-16 flex-shrink-0">
                  <Image
                    src={imagePreview || "/placeholder.svg"}
                    alt="Certificate preview"
                    fill
                    className="object-contain rounded"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{uploadedFile ? uploadedFile.name : "Image URL"}</div>
                  <div className="text-xs text-muted-foreground">
                    {uploadedFile ? `${(uploadedFile.size / 1024).toFixed(1)} KB` : "External URL"}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveImage}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
          {formData.skills.map((skill) => (
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
          value={formData.verificationUrl}
          onChange={(e) => setFormData({ ...formData, verificationUrl: e.target.value })}
          placeholder="https://verify.example.com/certificate-id"
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isUploading}>
          {isUploading ? "Uploading..." : initialData ? "Update" : "Add"} Certificate
        </Button>
      </DialogFooter>
    </form>
  )
}
