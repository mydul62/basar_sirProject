"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetAllProjects } from "@/src/services/projects"
import { Project } from "@/src/lib/demo-data"
import Link from "next/link"

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GetAllProjects();
        // Show only first 3 projects
        setProjects(data?.data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">Research Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">
            Explore my latest research projects in machine learning, healthcare AI, and medical informatics.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="bg-card border-border overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
              {project.imageUrl && (
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg font-semibold text-foreground font-sans leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <Badge
                    variant={
                      project.status === "completed"
                        ? "default"
                        : project.status === "in-progress"
                          ? "secondary"
                          : "outline"
                    }
                    className="shrink-0 font-medium"
                  >
                    {project.status.replace("-", " ")}
                  </Badge>
                </div>
                <CardDescription className="font-serif text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary/70" />
                  <span className="font-medium">
                    {new Date(project.startDate).getFullYear()}
                    {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech}
                      variant="outline"
                      className="text-xs px-2 py-1 bg-muted/50 hover:bg-muted transition-colors"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs px-2 py-1 bg-muted/50">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  {project.githubUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Link href={'/projects'}><Button
            variant="outline"
            size="lg"
            className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
          >
            View All Projects
          </Button></Link>
        </div>
      </div>
    </section>
  )
}
