"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { GraduationCap, Briefcase, Award, Users, Loader2 } from "lucide-react"
import type { AboutContent } from "@/lib/content-store"
import { GetAllAbout, SingleAbout } from "@/src/services/about"

export function AboutSection() {
  const [aboutContent, setAboutContent] = useState<AboutContent | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await GetAllAbout()

         setAboutContent(response?.data[0])
    
      } catch (error) {
        console.error("Failed to fetch about content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAboutContent()
  }, [])

  if (isLoading) {
    return (
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </section>
    )
  }

  if (!aboutContent) {
    return (
      <section id="about" className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load about content</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto w--[90%]">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">{aboutContent.title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">{aboutContent.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-card border-border">
            <GraduationCap className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">{aboutContent.stats.education}</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Experience</h3>
            <p className="text-sm text-muted-foreground">{aboutContent.stats.experience}</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Award className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">{aboutContent.stats.research}</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Collaboration</h3>
            <p className="text-sm text-muted-foreground">{aboutContent.stats.collaboration}</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{aboutContent.academicJourneyTitle}</h3>
            <div className="space-y-4 font-serif">
              {aboutContent.academicJourneyContent.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>

          <Card className="p-8 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">{aboutContent.researchPhilosophyTitle}</h3>
            <div className="space-y-4 font-serif">
              {aboutContent.researchPhilosophyContent.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
