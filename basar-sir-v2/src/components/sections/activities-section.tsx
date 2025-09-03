import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Award, Calendar } from "lucide-react"

// Demo data for activities - will be replaced with shared data later
const demoActivities = [
  {
    id: "1",
    title: "Community Health Awareness Program",
    organization: "Local Health Department",
    type: "volunteering",
    role: "Health Education Volunteer",
    startDate: "2023-06-01",
    endDate: "2024-05-31",
    description:
      "Organized health awareness campaigns in rural communities, educating families about preventive healthcare and nutrition.",
    skills: ["Community Outreach", "Health Education", "Public Speaking"],
    location: "Rural Bangladesh",
  },
  {
    id: "2",
    title: "Student Mentorship Program",
    organization: "Bangladesh Open University",
    type: "leadership",
    role: "Senior Mentor",
    startDate: "2022-01-01",
    endDate: "2024-12-31",
    description:
      "Leading a team of mentors to guide undergraduate students in research methodology and career development.",
    skills: ["Leadership", "Mentoring", "Team Management"],
    location: "Gazipur, Bangladesh",
  },
  {
    id: "3",
    title: "Digital Literacy Initiative",
    organization: "Tech for Good Foundation",
    type: "volunteering",
    role: "Technical Trainer",
    startDate: "2023-01-15",
    endDate: "2023-12-20",
    description:
      "Conducted free computer literacy workshops for underprivileged youth, teaching basic computer skills and programming fundamentals.",
    skills: ["Teaching", "Computer Training", "Community Service"],
    location: "Dhaka, Bangladesh",
  },
  {
    id: "4",
    title: "Research Ethics Committee",
    organization: "University Research Board",
    type: "leadership",
    role: "Committee Chair",
    startDate: "2023-03-01",
    description:
      "Leading the institutional research ethics review process, ensuring compliance with ethical standards in academic research.",
    skills: ["Ethics Review", "Policy Development", "Academic Leadership"],
    location: "University Campus",
  },
  {
    id: "5",
    title: "Blood Donation Drive Coordinator",
    organization: "Red Crescent Society",
    type: "volunteering",
    role: "Event Coordinator",
    startDate: "2022-06-01",
    endDate: "2024-06-01",
    description:
      "Organized quarterly blood donation camps, coordinating with medical teams and managing volunteer schedules.",
    skills: ["Event Management", "Volunteer Coordination", "Healthcare Support"],
    location: "Multiple Locations",
  },
  {
    id: "6",
    title: "Youth Leadership Council",
    organization: "National Youth Development Program",
    type: "leadership",
    role: "Council Member",
    startDate: "2021-09-01",
    endDate: "2023-08-31",
    description:
      "Represented academic community in policy discussions and youth development initiatives at national level.",
    skills: ["Policy Advocacy", "Youth Development", "Strategic Planning"],
    location: "Dhaka, Bangladesh",
  },
]

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

export function ActivitiesSection() {
  // Group activities by type
  const volunteeringActivities = demoActivities.filter((activity) => activity.type === "volunteering")
  const leadershipActivities = demoActivities.filter((activity) => activity.type === "leadership")

  const ActivityCard = ({ activity }: { activity: (typeof demoActivities)[0] }) => (
    <Card key={activity.id}  className="hover:shadow-md transition-shadow">
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
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
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
            Community engagement through volunteering and leadership experiences that create positive impact
          </p>
        </div>

        <div className="space-y-12">
          {/* Volunteering Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-6 w-6 text-rose-600" />
              <h3 className="text-2xl font-bold text-foreground">Volunteering Experience</h3>
              <Badge variant="secondary" className="ml-2">
                {volunteeringActivities.length} activities
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {volunteeringActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>

          {/* Leadership Experience */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Users className="h-6 w-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-foreground">Leadership Experience</h3>
              <Badge variant="secondary" className="ml-2">
                {leadershipActivities.length} activities
              </Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {leadershipActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
