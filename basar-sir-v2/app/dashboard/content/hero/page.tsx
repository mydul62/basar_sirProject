"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { GetAllHero, updateHero } from "@/src/services/about copy"
import { IHeroContent } from "@/src/types/types"
import Swal from "sweetalert2"
export default function HeroDashboard() {
  const [heroContent, setHeroContent] = useState<IHeroContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newInterest, setNewInterest] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchHeroContent()
  }, [])

  const fetchHeroContent = async () => {
    try {
      const response = await GetAllHero()
      if (response.success) {
    
        setHeroContent(response?.data[0])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch hero content",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }



const handleSave = async () => {
  if (!heroContent) return

  setIsSaving(true)
  try {
    const id = heroContent?._id
    const response = await updateHero(id, heroContent)
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Hero content updated successfully",
        timer: 2000,
        showConfirmButton: false,
      })
    } else {
      throw new Error("Failed to update")
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Failed to update hero content",
    })
  } finally {
    setIsSaving(false)
  }
}


  const addResearchInterest = () => {
    if (newInterest.trim() && heroContent) {
      setHeroContent({
        ...heroContent,
        researchInterests: [...heroContent.researchInterests, newInterest.trim()],
      })
      setNewInterest("")
    }
  }

  const removeResearchInterest = (index: number) => {
    if (heroContent) {
      setHeroContent({
        ...heroContent,
        researchInterests: heroContent.researchInterests.filter((_, i) => i !== index),
      })
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (!heroContent) {
    return <div>Failed to load hero content</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Hero Section</h1>
          <p className="text-muted-foreground">Manage your homepage hero section content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your name, title, and description</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={heroContent.name}
                  onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={4}
                value={heroContent.description}
                onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call-to-Action Buttons</CardTitle>
            <CardDescription>Customize your action buttons</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactButton">Contact Button Text</Label>
                <Input
                  id="contactButton"
                  value={heroContent.contactButtonText}
                  onChange={(e) => setHeroContent({ ...heroContent, contactButtonText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="researchButton">Research Button Text</Label>
                <Input
                  id="researchButton"
                  value={heroContent.researchButtonText}
                  onChange={(e) => setHeroContent({ ...heroContent, researchButtonText: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Position</CardTitle>
            <CardDescription>Update your current role and organization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="position">Current Position</Label>
                <Input
                  id="position"
                  value={heroContent.currentPosition}
                  onChange={(e) => setHeroContent({ ...heroContent, currentPosition: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={heroContent.currentOrganization}
                  onChange={(e) => setHeroContent({ ...heroContent, currentOrganization: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Research Interests</CardTitle>
            <CardDescription>Manage your research interest tags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {heroContent.researchInterests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-auto p-0 w-4 "
                    onClick={() => removeResearchInterest(index)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new research interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addResearchInterest()}
              />
              <Button onClick={addResearchInterest} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
