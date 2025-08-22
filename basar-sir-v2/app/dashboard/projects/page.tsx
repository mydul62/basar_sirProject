"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react"
import { demoProjects, type Project } from "@/src/lib/demo-data"
import { ProjectModal, DeleteProjectModal } from "@/src/components/dashboard/project-modals"

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(demoProjects)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | undefined>()
  const [deletingProject, setDeletingProject] = useState<Project | undefined>()

  const handleAddProject = (projectData: Omit<Project, "id">) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(), // Simple ID generation for demo
    }
    setProjects((prev) => [...prev, newProject])
  }

  const handleEditProject = (projectData: Omit<Project, "id"> & { id?: string }) => {
    if (!projectData.id) return

    setProjects((prev) =>
      prev.map((project) => (project.id === projectData.id ? { ...(projectData as Project) } : project)),
    )
    setEditingProject(undefined)
  }

  const handleDeleteProject = () => {
    if (!deletingProject) return

    setProjects((prev) => prev.filter((project) => project.id !== deletingProject.id))
    setDeletingProject(undefined)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans">Projects</h1>
          <p className="text-muted-foreground font-serif">Manage your research projects and publications.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold font-sans">{project.title}</CardTitle>
                  <CardDescription className="font-serif">{project.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.status === "completed" ? "default" : "secondary"}>{project.status}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    {project.githubUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button variant="ghost" size="sm" asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingProject(project)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium">Timeline:</span> {new Date(project.startDate).toLocaleDateString()}
                  {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString()}`}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Project Modal */}
      <ProjectModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddProject} />

      {/* Edit Project Modal */}
      <ProjectModal
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(undefined)}
        project={editingProject}
        onSubmit={handleEditProject}
      />

      {/* Delete Project Modal */}
      <DeleteProjectModal
        open={!!deletingProject}
        onOpenChange={(open) => !open && setDeletingProject(undefined)}
        project={deletingProject}
        onConfirm={handleDeleteProject}
      />
    </div>
  )
}
