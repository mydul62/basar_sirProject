"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Trash2 } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  value?: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  required?: boolean
  error?: string
  className?: string
}

export function ImageUploader({
  value = "",
  onChange,
  label = "Image",
  placeholder = "https://example.com/image.jpg",
  required = false,
  error,
  className = "",
}: ImageUploaderProps) {
  const [imagePreview, setImagePreview] = useState(value)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    onChange(url)
    setImagePreview(url)
    setUploadedFile(null)
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB")
      return
    }

    setIsUploading(true)
    setUploadedFile(file)

    try {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      // Simulate upload process
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock uploaded URL (in real app, this would be the actual uploaded URL)
      const mockUploadedUrl = `/uploaded-images/${file.name}`
      onChange(mockUploadedUrl)
    } catch (error) {
      console.error("Upload failed:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setImagePreview("")
    onChange("")
    setUploadedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className={className}>
      <Label className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>

      <div className="space-y-3 mt-2">
        {/* File Upload Area */}
        <div className="border-2 border-dashed border-border rounded-lg p-4">
          <div className="text-center">
            <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <div className="text-sm text-muted-foreground mb-2">Upload an image</div>
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

        {/* URL Input */}
        <div>
          <Label className="text-sm text-muted-foreground">Or enter image URL</Label>
          <Input
            value={value}
            onChange={handleImageUrlChange}
            placeholder={placeholder}
            className="mt-1"
            disabled={isUploading}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="relative">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-contain rounded"
                  onError={() => {
                    setImagePreview("")
                    if (!uploadedFile) {
                      onChange("")
                    }
                  }}
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

        {/* Error Message */}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  )
}
