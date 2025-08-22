"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"

interface PublicationFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function PublicationForm({ initialData, onSubmit, onCancel }: PublicationFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: "",
    link: "",
    doi: "",
    abstract: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="authors">Authors *</Label>
          <Input
            id="authors"
            value={formData.authors}
            onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
            placeholder="Author 1, Author 2, Author 3"
            required
          />
        </div>
        <div>
          <Label htmlFor="journal">Journal *</Label>
          <Input
            id="journal"
            value={formData.journal}
            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="year">Year *</Label>
          <Input
            id="year"
            type="number"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="link">Publication Link</Label>
          <Input
            id="link"
            type="url"
            value={formData.link}
            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://..."
          />
        </div>
        <div>
          <Label htmlFor="doi">DOI</Label>
          <Input
            id="doi"
            value={formData.doi}
            onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
            placeholder="10.1000/xyz123"
          />
        </div>
        <div className="col-span-2">
          <Label htmlFor="abstract">Abstract</Label>
          <Textarea
            id="abstract"
            value={formData.abstract}
            onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
            rows={4}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Publication</Button>
      </DialogFooter>
    </form>
  )
}
