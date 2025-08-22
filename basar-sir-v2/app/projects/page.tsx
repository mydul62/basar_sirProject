import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { demoProjects } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Code } from "lucide-react"
import Image from "next/image"

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Code className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">Research Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Innovative research projects in machine learning, healthcare informatics, and artificial intelligence
              applications with real-world impact and practical implementations.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {demoProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                {project.imageUrl && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={project.imageUrl || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-xl font-semibold text-foreground leading-tight">
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
                    >
                      {project.status.replace("-", " ")}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {project.startDate} {project.endDate && `- ${project.endDate}`}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      {project.githubUrl && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button asChild variant="outline" size="sm">
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{demoProjects.length}</div>
                <p className="text-muted-foreground">Total Projects</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {demoProjects.filter((p) => p.status === "completed").length}
                </div>
                <p className="text-muted-foreground">Completed</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(demoProjects.flatMap((p) => p.technologies)).size}
                </div>
                <p className="text-muted-foreground">Technologies Used</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
