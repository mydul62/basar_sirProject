"use client"

import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { demoProjects, Project } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, Code } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { GetAllProjects } from "@/src/services/projects"

export default function ProjectsPage() {
 const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllProjects()
        setProjects(res?.data) 
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])
  const {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData: filteredProjects,
  } = useSearchFilter({
    data: projects,
    searchFields: ["title", "description", "technologies"],
    filterFields: {
      status: "status",
      technologies: "technologies",
    },
  })

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: [
        { value: "completed", label: "Completed", count: demoProjects.filter((p) => p.status === "completed").length },
        {
          value: "in-progress",
          label: "In Progress",
          count: demoProjects.filter((p) => p.status === "in-progress").length,
        },
        { value: "planned", label: "Planned", count: demoProjects.filter((p) => p.status === "planned").length },
      ],
    },
    {
      key: "technologies",
      label: "Technologies",
      options: Array.from(new Set(demoProjects.flatMap((p) => p.technologies)))
        .map((tech) => ({
          value: tech,
          label: tech,
          count: demoProjects.filter((p) => p.technologies.includes(tech)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10), // Show top 10 technologies
    },
  ]

  return (
    <div className="min-h-screen container mx-auto px-4 py- bg-background">
      <PageHeader
        title="Research Projects"
        description="Innovative research projects in machine learning, healthcare informatics, and AI applications"
      />

      <main className="">
        <div className="8">
          <div className="mb-8 my-12">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search projects by title, description, or technology..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {demoProjects.length} projects
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <Card key={project._id} className="hover:shadow-lg transition-shadow duration-300 overflow-hidden">
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
                        {new Date(project.startDate).getFullYear()}
                        {project.endDate && ` - ${new Date(project.endDate).getFullYear()}`}
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

          {/* No results message */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <Code className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Project Stats */}
          {filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{filteredProjects.length}</div>
                  <p className="text-muted-foreground">Total Projects</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredProjects.filter((p) => p.status === "completed").length}
                  </div>
                  <p className="text-muted-foreground">Completed</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(filteredProjects.flatMap((p) => p.technologies)).size}
                  </div>
                  <p className="text-muted-foreground">Technologies Used</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
