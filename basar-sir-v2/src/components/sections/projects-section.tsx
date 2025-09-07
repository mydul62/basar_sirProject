"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Calendar } from "lucide-react"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useEffect, useState } from "react"
import { GetAllProjects } from "@/src/services/projects"
import { Project } from "@/src/lib/demo-data"

export function ProjectsSection() {
  const [projects, setProjects] =  useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await GetAllProjects();
        setProjects(data?.data);
      } catch (error) {
        console.error("Failed to fetch publications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

console.log(projects)

  if (loading) return <p>Loading...</p>;



  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">Research Projects</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">
            Explore my latest research projects in machine learning, healthcare AI, and medical informatics.
          </p>
        </div>

        <div className="relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {projects.map((project) => (
                <CarouselItem key={project._id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                  <Card className="bg-card border-border overflow-hidden h-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
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
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-12 top-1/2 -translate-y-1/2 bg-background border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-lg" />
            <CarouselNext className="absolute -right-12 top-1/2 -translate-y-1/2 bg-background border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-lg" />
          </Carousel>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  )
}
