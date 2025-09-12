export interface Activity {
  id: string
  title: string
  organization: string
  type: "volunteering" | "leadership" | "other"
  role: string
  startDate: string
  endDate?: string
  description: string
  skills: string[]
  location?: string
}

// Initial demo data
const activitiesData: Activity[] = [
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

export const activitiesStore = {
  getAll: (): Activity[] => activitiesData,

  getById: (id: string): Activity | undefined => activitiesData.find((activity) => activity.id === id),

  create: (activity: Omit<Activity, "id">): Activity => {
    const newActivity: Activity = {
      ...activity,
      id: Date.now().toString(),
    }
    activitiesData.push(newActivity)
    return newActivity
  },

  update: (id: string, updates: Partial<Omit<Activity, "id">>): Activity | null => {
    const index = activitiesData.findIndex((activity) => activity.id === id)
    if (index === -1) return null

    activitiesData[index] = { ...activitiesData[index], ...updates }
    return activitiesData[index]
  },

  delete: (id: string): boolean => {
    const index = activitiesData.findIndex((activity) => activity.id === id)
    if (index === -1) return false

    activitiesData.splice(index, 1)
    return true
  },
}
