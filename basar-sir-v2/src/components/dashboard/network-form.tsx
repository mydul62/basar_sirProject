"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"

interface NetworkFormProps {
  initialData?: any
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function NetworkForm({ initialData, onSubmit, onCancel }: NetworkFormProps) {
  const [formData, setFormData] = useState({
    role: "",
    organization: "",
    type: "Membership",
    startYear: "",
    endYear: "",
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
      <div>
        <Label htmlFor="role">Role/Position *</Label>
        <Input
          id="role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="organization">Organization *</Label>
        <Input
          id="organization"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Membership">Membership</SelectItem>
            <SelectItem value="Editorial">Editorial</SelectItem>
            <SelectItem value="Advisory">Advisory</SelectItem>
            <SelectItem value="Committee">Committee</SelectItem>
            <SelectItem value="Board">Board</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startYear">Start Year</Label>
          <Input
            id="startYear"
            type="number"
            value={formData.startYear}
            onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="endYear">End Year</Label>
          <Input
            id="endYear"
            type="number"
            value={formData.endYear}
            onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
            placeholder="Leave empty if current"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{initialData ? "Update" : "Add"} Network</Button>
      </DialogFooter>
    </form>
  )
}
