"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { IAboutContent } from "@/src/types/types"
import { GetAllAbout, updateAbout } from "@/src/services/about"
import Swal from "sweetalert2"
export default function AboutDashboard() {
  const [aboutContent, setAboutContent] = useState<IAboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    fetchAboutContent()
  }, [])

  const fetchAboutContent = async () => {
    try {
      const response = await GetAllAbout()
      if (response.success) {
        setAboutContent(response?.data[0])
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch about content",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

 const handleSave = async () => {
  if (!aboutContent) return


  setIsSaving(true)
  try {
  const id = aboutContent?._id
    const response = await updateAbout(id,aboutContent)
    console.log(response)
    if (response.success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "About content updated successfully",
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
      text: "Failed to update about content",
    })
  } finally {
    setIsSaving(false)
  }
}

  const addAcademicParagraph = () => {
    if (aboutContent) {
      setAboutContent({
        ...aboutContent,
        academicJourneyContent: [...aboutContent.academicJourneyContent, ""],
      })
    }
  }

  const updateAcademicParagraph = (index: number, value: string) => {
    if (aboutContent) {
      const newContent = [...aboutContent.academicJourneyContent]
      newContent[index] = value
      setAboutContent({
        ...aboutContent,
        academicJourneyContent: newContent,
      })
    }
  }

  const removeAcademicParagraph = (index: number) => {
    if (aboutContent) {
      setAboutContent({
        ...aboutContent,
        academicJourneyContent: aboutContent.academicJourneyContent.filter((_, i) => i !== index),
      })
    }
  }

  const addPhilosophyParagraph = () => {
    if (aboutContent) {
      setAboutContent({
        ...aboutContent,
        researchPhilosophyContent: [...aboutContent.researchPhilosophyContent, ""],
      })
    }
  }

  const updatePhilosophyParagraph = (index: number, value: string) => {
    if (aboutContent) {
      const newContent = [...aboutContent.researchPhilosophyContent]
      newContent[index] = value
      setAboutContent({
        ...aboutContent,
        researchPhilosophyContent: newContent,
      })
    }
  }

  const removePhilosophyParagraph = (index: number) => {
    if (aboutContent) {
      setAboutContent({
        ...aboutContent,
        researchPhilosophyContent: aboutContent.researchPhilosophyContent.filter((_, i) => i !== index),
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

  if (!aboutContent) {
    return <div>Failed to load about content</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">About Section</h1>
          <p className="text-muted-foreground">Manage your about section content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Section Header</CardTitle>
            <CardDescription>Update the main title and subtitle</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={aboutContent.title}
                onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea
                id="subtitle"
                rows={3}
                value={aboutContent.subtitle}
                onChange={(e) => setAboutContent({ ...aboutContent, subtitle: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statistics Cards</CardTitle>
            <CardDescription>Update the four stat cards displayed in the about section</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input
                  id="education"
                  value={aboutContent.stats.education}
                  onChange={(e) =>
                    setAboutContent({
                      ...aboutContent,
                      stats: { ...aboutContent.stats, education: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={aboutContent.stats.experience}
                  onChange={(e) =>
                    setAboutContent({
                      ...aboutContent,
                      stats: { ...aboutContent.stats, experience: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="research">Research</Label>
                <Input
                  id="research"
                  value={aboutContent.stats.research}
                  onChange={(e) =>
                    setAboutContent({
                      ...aboutContent,
                      stats: { ...aboutContent.stats, research: e.target.value },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collaboration">Collaboration</Label>
                <Input
                  id="collaboration"
                  value={aboutContent.stats.collaboration}
                  onChange={(e) =>
                    setAboutContent({
                      ...aboutContent,
                      stats: { ...aboutContent.stats, collaboration: e.target.value },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Journey</CardTitle>
            <CardDescription>Manage the academic journey section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="academicTitle">Section Title</Label>
              <Input
                id="academicTitle"
                value={aboutContent.academicJourneyTitle}
                onChange={(e) => setAboutContent({ ...aboutContent, academicJourneyTitle: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Paragraphs</Label>
                <Button onClick={addAcademicParagraph} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>
              {aboutContent.academicJourneyContent.map((paragraph, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    rows={3}
                    value={paragraph}
                    onChange={(e) => updateAcademicParagraph(index, e.target.value)}
                    placeholder={`Paragraph ${index + 1}`}
                  />
                  <Button
                    onClick={() => removeAcademicParagraph(index)}
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Research Philosophy</CardTitle>
            <CardDescription>Manage the research philosophy section content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="philosophyTitle">Section Title</Label>
              <Input
                id="philosophyTitle"
                value={aboutContent.researchPhilosophyTitle}
                onChange={(e) => setAboutContent({ ...aboutContent, researchPhilosophyTitle: e.target.value })}
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Paragraphs</Label>
                <Button onClick={addPhilosophyParagraph} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Paragraph
                </Button>
              </div>
              {aboutContent.researchPhilosophyContent.map((paragraph, index) => (
                <div key={index} className="flex gap-2">
                  <Textarea
                    rows={3}
                    value={paragraph}
                    onChange={(e) => updatePhilosophyParagraph(index, e.target.value)}
                    placeholder={`Paragraph ${index + 1}`}
                  />
                  <Button
                    onClick={() => removePhilosophyParagraph(index)}
                    size="sm"
                    variant="outline"
                    className="shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
