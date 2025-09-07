"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ProjectUpdateForm } from "@/src/components/dashboard/project-update-form"
import { useEffect, useState } from "react"
import { Project } from "@/src/lib/demo-data"
import { SingleProject } from "@/src/services/projects"
import router from "next/router"

export default function EditProjectPage() {
const params = useParams();
const id = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;
const [project, setProject] = useState<Project>();

useEffect(() => {
  const fetchProjects = async () => {
    if (!id) return;
    try {
      const res = await SingleProject(id as string);
      setProject(res?.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  fetchProjects();
}, [id]);
console.log(project);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Not Found</h1>
          <p className="text-muted-foreground">The project you're looking for doesn't exist</p>
        </div>
      </div>
    )
  }


  const handleCancel = () => {
    router.push("/dashboard/projects")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Edit Project</h1>
        <p className="text-muted-foreground">Update your project details below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Update the information about your project</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectUpdateForm onCancel={handleCancel}  project={project}  />
        </CardContent>
      </Card>
    </div>
  )
}
