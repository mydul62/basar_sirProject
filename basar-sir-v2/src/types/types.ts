export interface IPublications {
  _id: string
  title: string
  authors: string
  journal: string
  year: number
  link: string
  doi: string
  abstract: string
  createdAt: string
  updatedAt: string
  __v: number
}
export interface IHeroContent {
  _id: string
  name: string
  title: string
  description: string
  contactButtonText: string
  researchButtonText: string
  currentPosition: string
  currentOrganization: string
  researchInterests: string[]
}

export interface IAboutContent {
  _id: string
  title: string
  subtitle: string
  academicJourneyTitle: string
  academicJourneyContent: string[]
  researchPhilosophyTitle: string
  researchPhilosophyContent: string[]
  stats: {
    education: string
    experience: string
    research: string
    collaboration: string
  }
}
export interface IUser {
  email: string
  password: string
  fullName: string
  contactNo: string
  designation: string
  image?: string
  role: "user" | "admin"
  status: "active" | "in-progress" | "blocked"
}