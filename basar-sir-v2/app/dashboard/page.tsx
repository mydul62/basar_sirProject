"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, FileText, Settings, Plus } from "lucide-react"
import { Project, BlogPost } from "@/src/lib/demo-data"
import { GetAllProjects } from "@/src/services/projects"
import { GetAllBlog } from "@/src/services/blogs"
import { GetAllPublicatons } from "@/src/services/Publications"


export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [publications, setPublications] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsRes = await GetAllProjects()
        const blogsRes = await GetAllBlog()
        const publicationsRes = await GetAllPublicatons()

        setProjects(projectsRes?.data || [])
        setBlogs(blogsRes?.data || [])
        setPublications(publicationsRes?.data?.length || 0)
      } catch (error) {
        console.error("Failed to fetch data:", error)
      }
    }
    fetchData()
  }, [])

  const completedProjects = projects.filter(project => project.status === "completed")
  const publishedPosts = blogs.filter(blog => blog.status === "published")

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans">Dashboard</h1>
          <p className="text-muted-foreground font-serif">
            Welcome back! Here's a quick overview of your content.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground">{completedProjects.length} completed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogs.length}</div>
            <p className="text-xs text-muted-foreground">{publishedPosts.length} published</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <Settings className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publications}</div>
            <p className="text-xs text-muted-foreground">Academic publications</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
            <CardDescription>Manage your content efficiently</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/dashboard/projects">
              <Button className="w-full justify-start">
                <Plus className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </Link>
            <Link href="/dashboard/blog">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Write New Blog Post
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Dashboard Settings
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card border-border hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription>Your latest content updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.slice(0, 3).map((proj) => (
              <div key={proj._id} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Updated "{proj.title}" project</p>
                  {/* <p className="text-xs text-muted-foreground">{proj.updatedAt}</p> */}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
