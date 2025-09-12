export interface HeroContent {
  id: string
  name: string
  title: string
  description: string
  contactButtonText: string
  researchButtonText: string
  currentPosition: string
  currentOrganization: string
  researchInterests: string[]
}

export interface AboutContent {
  id: string
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

// Initial hero data
const heroData: HeroContent = {
  id: "1",
  name: "Samrat Kumar Dey",
  title: "Teaching Professional | Researcher | Explorer",
  description:
    "PhD in Informatics with specialization in Medical Informatics at the University of Missouri-Columbia. Graduate Research Assistant at MU Institute for Data Science and Informatics, passionate about machine learning in healthcare and artificial intelligence applications.",
  contactButtonText: "Contact Me",
  researchButtonText: "View Research",
  currentPosition: "Graduate Research Assistant",
  currentOrganization: "MU Institute for Data Science and Informatics",
  researchInterests: ["Machine Learning", "Healthcare AI", "Data Analytics", "Medical Informatics", "Agentic AI"],
}

// Initial about data
const aboutData: AboutContent = {
  id: "1",
  title: "About Me",
  subtitle:
    "I am a dedicated researcher and educator with a passion for applying machine learning and artificial intelligence to solve real-world healthcare challenges.",
  academicJourneyTitle: "Academic Journey",
  academicJourneyContent: [
    "Currently pursuing my PhD in Informatics with a specialization in Medical Informatics at the University of Missouri-Columbia. My research focuses on applying machine learning techniques to healthcare challenges, particularly in medical signal processing and diagnostic systems.",
    "I hold a Master's degree in Computer Science and Engineering from the Military Institute of Science and Technology (MIST), Bangladesh, where I developed expertise in deep learning and software-defined networking.",
  ],
  researchPhilosophyTitle: "Research Philosophy",
  researchPhilosophyContent: [
    "I believe in the transformative power of artificial intelligence to improve healthcare outcomes. My work bridges the gap between cutting-edge technology and practical medical applications, always keeping patient care at the center of innovation.",
    'As Babe Ruth said, "It\'s hard to beat a person who never gives up." This philosophy drives my approach to research, teaching, and continuous learning in the rapidly evolving field of AI.',
  ],
  stats: {
    education: "PhD in Informatics (Medical Informatics)",
    experience: "Teaching Professional & Research Assistant",
    research: "Machine Learning in Healthcare",
    collaboration: "International Research Networks",
  },
}

export const contentStore = {
  // Hero content methods
  getHero: (): HeroContent => heroData,

  updateHero: (updates: Partial<Omit<HeroContent, "id">>): HeroContent => {
    Object.assign(heroData, updates)
    return heroData
  },

  // About content methods
  getAbout: (): AboutContent => aboutData,

  updateAbout: (updates: Partial<Omit<AboutContent, "id">>): AboutContent => {
    Object.assign(aboutData, updates)
    return aboutData
  },
}
