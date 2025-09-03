"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Calendar, MapPin } from "lucide-react"
import { demoActivities, type Activity } from "@/src/lib/demo-data"
import { ActivityModal, DeleteActivityModal } from "@/src/components/dashboard/activity-modals"

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case "volunteering":
      return "bg-rose-100 text-rose-800 border-rose-200"
    case "leadership":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "community":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(demoActivities)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>()
  const [deletingActivity, setDeletingActivity] = useState<Activity | undefined>()

  const handleAddActivity = (activityData: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
    }
    setActivities((prev) => [...prev, newActivity])
  }

  const handleEditActivity = (activityData: Omit<Activity, "id"> & { id?: string }) => {
    if (!activityData.id) return

    setActivities((prev) =>
      prev.map((activity) => (activity.id === activityData.id ? { ...(activityData as Activity) } : activity)),
    )
    setEditingActivity(undefined)
  }

  const handleDeleteActivity = () => {
    if (!deletingActivity) return

    setActivities((prev) => prev.filter((activity) => activity.id !== deletingActivity.id))
    setDeletingActivity(undefined)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-sans">Activities</h1>
          <p className="text-muted-foreground font-serif">
            Manage your extracurricular activities and community involvement.
          </p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Activity
        </Button>
      </div>

      <div className="grid gap-6">
        {activities.map((activity) => (
          <Card key={activity.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-semibold font-sans">{activity.title}</CardTitle>
                  <CardDescription className="font-serif">{activity.organization}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`text-xs ${getActivityTypeColor(activity.type)}`}>{activity.type}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => setEditingActivity(activity)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => setDeletingActivity(activity)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {activity.role}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(activity.startDate).toLocaleDateString()}
                    {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {activity.location}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>

                <div className="flex flex-wrap gap-2">
                  {activity.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Activity Modal */}
      <ActivityModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} onSubmit={handleAddActivity} />

      {/* Edit Activity Modal */}
      <ActivityModal
        open={!!editingActivity}
        onOpenChange={(open) => !open && setEditingActivity(undefined)}
        activity={editingActivity}
        onSubmit={handleEditActivity}
      />

      {/* Delete Activity Modal */}
      <DeleteActivityModal
        open={!!deletingActivity}
        onOpenChange={(open) => !open && setDeletingActivity(undefined)}
        activity={deletingActivity}
        onConfirm={handleDeleteActivity}
      />
    </div>
  )
}
