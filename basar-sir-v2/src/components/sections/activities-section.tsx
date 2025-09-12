"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Calendar } from "lucide-react"
import { useEffect, useState } from "react"
import { Activity } from "@/src/lib/demo-data"
import { GetAllActivities } from "@/src/services/activities"
import Link from "next/link"

const getActivityIcon = (type: string) => {
  switch (type) {
    case "volunteering":
      return <Heart className="h-5 w-5 text-rose-600" />
    case "leadership":
      return <Users className="h-5 w-5 text-blue-600" />
    default:
      return <Award className="h-5 w-5 text-purple-600" />
  }
}

const getActivityTypeColor = (type: string) => {
  switch (type) {
    case "volunteering":
      return "bg-rose-100 text-rose-800 border-rose-200"
    case "leadership":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-purple-100 text-purple-800 border-purple-200"
  }
}

const roles = [
  "Lead Guest Editor",
  "Technical Trainer",
  "Volunteer Coordinator",
  "Lead Guest Editor Lead Guest Editor",
]

export function ActivitiesSection() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await GetAllActivities()
        setActivities(res?.data || [])
      } catch (error) {
        console.error("Failed to fetch Activities:", error)
      }
    }
    fetchActivities()
  }, [])

  const ActivityCard = ({ activity }: { activity: Activity }) => (
    <Card key={activity._id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          {getActivityIcon(activity.type)}
          <div className="flex-1">
            <CardTitle className="text-lg leading-tight mb-2">{activity.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{activity.organization}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${getActivityTypeColor(activity.type)}`}>{activity.role}</Badge>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {activity.startDate.split("-")[0]}
              {activity.endDate && ` - ${activity.endDate.split("-")[0]}`}
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{activity.description}</p>

          <div className="flex flex-wrap gap-1">
            {activity.skills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
            ))}
          </div>

          {activity.location && <p className="text-xs text-muted-foreground">📍 {activity.location}</p>}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <section id="activities" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Extracurricular Activities</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Community engagement through volunteering and leadership experiences
          </p>
        </div>

        <div className="space-y-12">
          {roles.map((role) => {
            const roleActivities = activities.filter(a => a.role === role)
            if (!roleActivities.length) return null // skip roles with no data

            const showActivities = roleActivities.slice(0, 3) // show only first 3

            return (
              <div key={role}>
                <div className="flex items-center gap-3 mb-8">
                  <Award className="h-6 w-6 text-purple-600" />
                  <h3 className="text-2xl font-bold text-foreground">{role}</h3>
                  <Badge variant="secondary" className="ml-2">
                    {roleActivities.length} activities
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {showActivities.map(activity => (
                    <ActivityCard key={activity._id} activity={activity} />
                  ))}
                </div>

                {roleActivities.length > 3 && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/activities/${role.replace(/\s+/g, "-").toLowerCase()}`}
                      className="inline-block px-6 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700 transition"
                    >
                      See More
                    </Link>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
