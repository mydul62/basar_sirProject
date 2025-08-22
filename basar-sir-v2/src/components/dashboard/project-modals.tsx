"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { ProjectForm } from "./project-form"
import type { Project } from "@/src/lib/demo-data"

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project
  onSubmit: (project: Omit<Project, "id"> & { id?: string }) => void
}

export function ProjectModal({ open, onOpenChange, project, onSubmit }: ProjectModalProps) {
  const handleSubmit = (projectData: Omit<Project, "id"> & { id?: string }) => {
    onSubmit(projectData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{project ? "Edit Project" : "Add New Project"}</DialogTitle>
          <DialogDescription>
            {project ? "Update your project details below." : "Create a new project by filling out the form below."}
          </DialogDescription>
        </DialogHeader>
        <ProjectForm project={project} onSubmit={handleSubmit} onCancel={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  )
}

interface DeleteProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project?: Project
  onConfirm: () => void
}

export function DeleteProjectModal({ open, onOpenChange, project, onConfirm }: DeleteProjectModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Project</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{project?.title}"? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
