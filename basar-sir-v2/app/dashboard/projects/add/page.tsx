"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectAddForm } from "@/src/components/dashboard/project-add-form"

export default function AddProjectPage() {
  const router = useRouter()
  const handleCancel = () => {
    router.push("/dashboard/projects")
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Project</h1>
        <p className="text-muted-foreground">Create a new project by filling out the form below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>Fill in the information about your project</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectAddForm onCancel={handleCancel} />
        </CardContent>
      </Card>
    </div>
  )
}
