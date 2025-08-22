export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  status: "completed" | "in-progress" | "planned"
  startDate: string
  endDate?: string
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  publishedAt: string
  tags: string[]
  status: "published" | "draft"
  readTime: number
  imageUrl?: string
}

export interface Publication {
  id: string
  title: string
  authors: string[]
  journal: string
  year: number
  volume?: string
  pages?: string
  doi?: string
  url?: string
  type: "journal" | "conference" | "book-chapter"
  status: "published" | "accepted" | "under-review"
}

export interface Award {
  id: string
  title: string
  organization: string
  year: number
  description?: string
  type: "fellowship" | "award" | "recognition" | "competition"
}

export interface Network {
  id: string
  role: string
  organization: string
  description?: string
  startYear?: number
  endYear?: number
  type: "editorial" | "membership" | "advisory" | "mentorship"
}

export interface Grant {
  id: string
  title: string
  role: string
  fundingAgency: string
  location: string
  startYear?: number
  endYear?: number
  amount?: string
  status: "active" | "completed" | "pending"
}

export const demoProjects: Project[] = [
  {
    id: "1",
    title: "Birth Asphyxia Detection Using Hybrid CNN",
    description:
      "A machine learning approach using Mel Frequency Cepstral Coefficients (MFCCs) and deep learning models to detect birth asphyxia in newborns through infant cry analysis. This research achieved 99.16% accuracy using Logistic Regression and demonstrated the potential for early detection systems in clinical settings.",
    technologies: ["Python", "TensorFlow", "CNN", "Signal Processing", "Healthcare AI", "MFCC", "Keras"],
    status: "completed",
    startDate: "2023-01-15",
    endDate: "2023-12-20",
    githubUrl: "https://github.com/samrat-dey/birth-asphyxia-detection",
    imageUrl: "/medical-ai-birth-asphyxia.png",
  },
  {
    id: "2",
    title: "Flow-Based Anomaly Detection in SDN",
    description:
      "Deep learning approach with feature selection method for anomaly detection in Software Defined Networking environments. Implemented custom artificial neural networks (ANN) and convolutional neural networks (CNN) with hidden layers for improved performance in network security applications.",
    technologies: ["Python", "Deep Learning", "Network Security", "SDN", "Feature Engineering", "OpenFlow", "Mininet"],
    status: "completed",
    startDate: "2022-06-01",
    endDate: "2023-05-30",
    githubUrl: "https://github.com/samrat-dey/sdn-anomaly-detection",
    liveUrl: "https://sdn-anomaly-demo.vercel.app",
    imageUrl: "/sdn-anomaly-detection.png",
  },
  {
    id: "3",
    title: "Healthcare Data Analytics Platform",
    description:
      "Comprehensive platform for analyzing healthcare data with machine learning insights and visualization tools. Features real-time data processing, predictive analytics, and interactive dashboards for medical professionals to make data-driven decisions.",
    technologies: ["React", "Node.js", "Python", "MongoDB", "D3.js", "FastAPI", "Docker"],
    status: "in-progress",
    startDate: "2024-01-10",
    githubUrl: "https://github.com/samrat-dey/healthcare-analytics",
    imageUrl: "/healthcare-analytics-dashboard.png",
  },
  {
    id: "4",
    title: "Medical Image Classification System",
    description:
      "Advanced deep learning system for classifying medical images using transfer learning and ensemble methods. Focuses on chest X-ray analysis for pneumonia detection with high accuracy and clinical validation.",
    technologies: ["Python", "PyTorch", "Computer Vision", "Transfer Learning", "Medical Imaging", "ResNet"],
    status: "planned",
    startDate: "2024-06-01",
    imageUrl: "/chest-xray-analysis.png",
  },
  {
    id: "5",
    title: "IoT-Based Patient Monitoring System",
    description:
      "Internet of Things solution for continuous patient monitoring in healthcare facilities. Integrates wearable sensors, real-time data transmission, and alert systems for critical patient care scenarios.",
    technologies: ["Arduino", "Raspberry Pi", "IoT", "Node.js", "MQTT", "InfluxDB", "Grafana"],
    status: "completed",
    startDate: "2023-08-01",
    endDate: "2024-01-15",
    githubUrl: "https://github.com/samrat-dey/iot-patient-monitoring",
    imageUrl: "/iot-patient-monitoring.png",
  },
]

export const demoBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Machine Learning in Healthcare: Current Trends and Future Prospects",
    excerpt:
      "Exploring the latest developments in machine learning applications for healthcare, from diagnostic tools to personalized treatment plans. This comprehensive analysis covers current implementations and future possibilities.",
    content: `Machine learning has revolutionized healthcare in unprecedented ways, transforming how we diagnose diseases, develop treatments, and manage patient care. From early detection systems to personalized medicine, AI is reshaping the medical landscape.

## Current Applications

The integration of machine learning in healthcare has led to breakthrough applications in medical imaging, drug discovery, and predictive analytics. Deep learning models now assist radiologists in detecting cancers with accuracy rates that often exceed human performance.

## Diagnostic Tools

Modern diagnostic tools powered by AI can analyze medical images, laboratory results, and patient histories to provide rapid and accurate diagnoses. These systems are particularly valuable in resource-limited settings where specialist expertise may not be readily available.

## Future Prospects

Looking ahead, we can expect to see even more sophisticated applications of machine learning in healthcare, including real-time patient monitoring, automated treatment recommendations, and precision medicine approaches tailored to individual genetic profiles.

The future of healthcare lies in the seamless integration of human expertise with artificial intelligence, creating a more efficient, accurate, and accessible healthcare system for all.`,
    publishedAt: "2024-01-15",
    tags: ["Machine Learning", "Healthcare", "AI", "Medical Informatics", "Digital Health"],
    status: "published",
    readTime: 8,
    imageUrl: "/healthcare-ai.png",
  },
  {
    id: "2",
    title: "Deep Learning for Signal Processing in Medical Applications",
    excerpt:
      "A comprehensive look at how deep learning techniques are transforming signal processing in medical diagnostics, with focus on ECG analysis, brain signal processing, and audio-based medical diagnostics.",
    content: `Signal processing has always been crucial in medical diagnostics, from analyzing electrocardiograms to processing brain signals. With the advent of deep learning, we're witnessing a paradigm shift in how medical signals are processed and interpreted.

## Traditional vs. Modern Approaches

Traditional signal processing relied heavily on handcrafted features and domain expertise. Modern deep learning approaches can automatically learn relevant features from raw signals, often discovering patterns that human experts might miss.

## ECG Analysis

Deep learning models have shown remarkable success in analyzing electrocardiogram signals, detecting arrhythmias, and predicting cardiac events with high accuracy. These systems can process continuous monitoring data and alert healthcare providers to potential issues.

## Brain Signal Processing

In neurology, deep learning is being applied to EEG and fMRI data analysis, helping in the diagnosis of epilepsy, depression, and other neurological conditions. The ability to process complex, multi-dimensional brain signals opens new possibilities for understanding brain function.

## Audio-Based Diagnostics

Recent research, including our work on birth asphyxia detection through infant cry analysis, demonstrates the potential of audio signal processing in medical diagnostics. These non-invasive methods could revolutionize early detection systems.`,
    publishedAt: "2024-02-20",
    tags: ["Deep Learning", "Signal Processing", "Medical Diagnostics", "ECG", "EEG"],
    status: "published",
    readTime: 12,
    imageUrl: "/medical-signal-processing-deep-learning.png",
  },
  {
    id: "3",
    title: "The Future of Academic Research in the Digital Age",
    excerpt:
      "How digital tools and AI are reshaping academic research methodologies and collaboration, with insights into emerging trends and best practices for modern researchers.",
    content: `The landscape of academic research is rapidly evolving, driven by digital transformation and artificial intelligence. Modern researchers have access to unprecedented computational power, vast datasets, and collaborative tools that are reshaping how research is conducted.

## Digital Research Tools

From cloud computing platforms to AI-powered literature review tools, digital technologies are streamlining the research process. Researchers can now process larger datasets, run more complex analyses, and collaborate across geographical boundaries more effectively than ever before.

## Open Science Movement

The push toward open science is making research more transparent and accessible. Open-access publications, shared datasets, and reproducible research practices are becoming the norm, fostering greater collaboration and accelerating scientific progress.

## AI in Research

Artificial intelligence is not just a subject of research but also a tool for conducting research. AI can help with literature reviews, hypothesis generation, data analysis, and even writing assistance, allowing researchers to focus on higher-level thinking and creativity.

## Challenges and Opportunities

While digital transformation brings many benefits, it also presents challenges such as data privacy, digital divide, and the need for new skills. Researchers must adapt to these changes while maintaining the rigor and integrity that define quality academic work.`,
    publishedAt: "2024-03-10",
    tags: ["Academic Research", "Digital Transformation", "Research Methods", "Open Science", "AI Tools"],
    status: "published",
    readTime: 6,
    imageUrl: "/academic-research-digital-transformation.png",
  },
  {
    id: "4",
    title: "Ethical Considerations in AI-Powered Healthcare Systems",
    excerpt:
      "Examining the ethical implications of artificial intelligence in healthcare, including privacy concerns, algorithmic bias, and the importance of maintaining human oversight in medical decision-making.",
    content: `As artificial intelligence becomes increasingly prevalent in healthcare, we must carefully consider the ethical implications of these powerful technologies. The potential benefits are enormous, but so are the responsibilities that come with deploying AI in life-critical situations.

## Privacy and Data Protection

Healthcare data is among the most sensitive information we possess. AI systems require vast amounts of data to function effectively, raising important questions about patient privacy, data ownership, and consent. We must ensure that the benefits of AI don't come at the cost of patient privacy.

## Algorithmic Bias and Fairness

AI systems can perpetuate or even amplify existing biases present in training data. In healthcare, this could lead to disparities in care quality across different demographic groups. It's crucial to develop fair and unbiased AI systems that serve all patients equally.

## Human Oversight and Accountability

While AI can augment human capabilities, it should not replace human judgment entirely. Maintaining appropriate human oversight ensures that AI recommendations are critically evaluated and that healthcare providers remain accountable for patient care decisions.

## Transparency and Explainability

Healthcare providers and patients have the right to understand how AI systems make their recommendations. Developing explainable AI systems that can provide clear reasoning for their decisions is essential for building trust and ensuring appropriate use.`,
    publishedAt: "2024-04-05",
    tags: ["AI Ethics", "Healthcare", "Privacy", "Algorithmic Bias", "Medical AI"],
    status: "draft",
    readTime: 10,
    imageUrl: "/ai-ethics-healthcare.png",
  },
]

export const demoPublications: Publication[] = [
  {
    id: "1",
    title: "Analyzing Infant Cry to Detect Birth Asphyxia Using a Hybrid CNN and Feature Extraction Approach",
    authors: [
      "Dey, S.K.",
      "Uddin, K.M.M.",
      "Howlader, A.",
      "Rahman, M.M.",
      "Babu, H.M.H.",
      "Biswas, N.",
      "Mazumder, B.",
    ],
    journal: "Neuroscience Informatics",
    year: 2025,
    type: "journal",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/pii/S2772528621000061",
  },
  {
    id: "2",
    title: "A comprehensive strategy for identifying plagiarism in academic submissions",
    authors: ["Setu, D.M.", "Islam, T.", "Erfan, Md.", "Dey, S.K.", "Asif, Md. R.A.", "Samsuddoha, Md."],
    journal: "J. Umm Al-Qura Univ. Eng. Archit.",
    year: 2025,
    type: "journal",
    status: "published",
    url: "https://link.springer.com/article/10.1007/s43995-024-00065-4",
  },
  {
    id: "3",
    title: "Recurrent neural network based multiclass cyber bullying classification",
    authors: ["Sifath, S.", "Islam, T.", "Erfan, M.", "Dey, S. K.", "Islam, M. M. U.", "Samsuddoha, M.", "Rahman, T."],
    journal: "Natural Language Processing Journal",
    year: 2024,
    volume: "100111",
    type: "journal",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/pii/S2949719124000111",
  },
  {
    id: "4",
    title: "Machine Learning-Based Opinion Spam Detection: A Systematic Literature Review",
    authors: ["Qazi, A.", "Hasan, N.", "Mao, R.", "Abo, M. E. M.", "Dey, S. K.", "Hardaker, G."],
    journal: "IEEE Access",
    year: 2024,
    type: "journal",
    status: "published",
    url: "https://ieeexplore.ieee.org/document/10234567",
  },
  {
    id: "5",
    title: "Federated deep learning for monkeypox disease detection on gan-augmented dataset",
    authors: [
      "TKundu, D.",
      "Rahman, M. M.",
      "Dey, S. K.",
      "Rahman, A.",
      "Das, D.",
      "Siddiqi, U. R.",
      "Alam, M. G. R.",
      "Ali, Z.",
    ],
    journal: "IEEE Access",
    year: 2024,
    type: "journal",
    status: "published",
    url: "https://ieeexplore.ieee.org/document/10345678",
  },
  {
    id: "6",
    title:
      "A hybrid approach with customized machine learning classifiers and multiple feature extractors for enhancing diabetic retinopathy detection",
    authors: ["Taifa, I. A.", "Setu, D. M.", "Islam, T.", "Dey, S. K.", "Rahman, T."],
    journal: "Healthcare Analytics",
    year: 2024,
    volume: "100346",
    type: "journal",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/pii/S2772442524000346",
  },
  {
    id: "7",
    title: "Machine Learning-Based Chronic Kidney Cancer Prediction Application: A Predictive Analytics Approach",
    authors: ["Uddin, K. M. M.", "Nahid, M. N. H.", "Ullah, M. M. H.", "Mazumder, B.", "Khan, M. S. I.", "Dey, S. K."],
    journal: "Biomedical Materials & Devices",
    year: 2024,
    volume: "2(2)",
    pages: "1028-1048",
    type: "journal",
    status: "published",
    url: "https://link.springer.com/article/10.1007/s44174-024-00234-5",
  },
  {
    id: "8",
    title: "A Voice assistive mobile application tool to detect cardiovascular disease using machine learning approach",
    authors: ["Uddin, K. M. M.", "Dey, S. K.", "Babu, H. M. H."],
    journal: "Biomedical Materials & Devices",
    year: 2024,
    volume: "2(2)",
    pages: "1246-1257",
    type: "journal",
    status: "published",
    url: "https://link.springer.com/article/10.1007/s44174-024-00189-7",
  },
  {
    id: "9",
    title: "An ensemble machine learning-based approach to predict cervical cancer using hybrid feature selection",
    authors: ["Uddin, K. M. M.", "Al Mamun, A.", "Chakrabarti, A.", "Mostafiz, R.", "Dey, S. K."],
    journal: "Neuroscience Informatics",
    year: 2024,
    volume: "4(3)",
    pages: "100169",
    type: "journal",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/pii/S2772528624000169",
  },
  {
    id: "10",
    title: "Machine learning-based diagnosis of breast cancer utilizing feature optimization technique",
    authors: ["Uddin, K. M. M.", "Biswas, N.", "Rikta, S. T.", "Dey, S. K."],
    journal: "Computer Methods and Programs in Biomedicine Update",
    year: 2023,
    type: "journal",
    status: "published",
    url: "https://www.sciencedirect.com/science/article/pii/S2666990023000234",
  },
]

export const demoAwards: Award[] = [
  {
    id: "1",
    title: "Nominated to India Science and Research Fellowship 2024-25",
    organization: "Bangladesh Academy of Science (BAS)",
    year: 2024,
    type: "fellowship",
  },
  {
    id: "2",
    title: "AI for Good-Innovate for Impact Award",
    organization: "AI for Good Global Summit, ITU, WAIC 2024",
    year: 2024,
    type: "award",
  },
  {
    id: "3",
    title: "Most Accurate Deep Model Creator",
    organization: "AI in Public Health Workshop 2024",
    year: 2024,
    type: "recognition",
  },
  {
    id: "4",
    title: "Group Lead, Innovation Fair Award 2024",
    organization: "BOU Innovation Unit",
    year: 2024,
    type: "award",
  },
  {
    id: "5",
    title: "Judge",
    organization: "Bangladesh Robot Olympiad 2024, 2023, 2022, 2021",
    year: 2024,
    type: "competition",
  },
  {
    id: "6",
    title: "Regional Judge & Mentor",
    organization: "NASA Space Apps Challenge 2023, 2022, 2021, 2020",
    year: 2023,
    type: "competition",
  },
  {
    id: "7",
    title: "Judge",
    organization: "BASIS National ICT Award 2022",
    year: 2022,
    type: "competition",
  },
  {
    id: "8",
    title: "Final Round Judge",
    organization: "BDApps National Hackathon 2022",
    year: 2022,
    type: "competition",
  },
  {
    id: "9",
    title: "Convener",
    organization: "Mujib Borsho IT Carnival 2020",
    year: 2020,
    type: "recognition",
  },
  {
    id: "10",
    title: "Best Project Supervisor Award",
    organization: "Department of CSE, Dhaka International University",
    year: 2019,
    type: "award",
  },
  {
    id: "11",
    title: "Best Mobile App Developer Award",
    organization: "National Mobile Application Awareness Development and Training Program 2015",
    year: 2015,
    type: "award",
  },
]

export const demoNetworks: Network[] = [
  {
    id: "1",
    role: "Lead Guest Editor",
    organization: "Special Issue on Data-Driven Decision Making in Healthcare Informatics",
    type: "editorial",
  },
  {
    id: "2",
    role: "Academic Editor",
    organization: "PLoS ONE, Public Library of Science",
    type: "editorial",
  },
  {
    id: "3",
    role: "Academic Editor",
    organization: "Journal of Computational and Mathematical Methods, Wiley",
    type: "editorial",
  },
  {
    id: "4",
    role: "Professional Member",
    organization: "Institute of Electrical and Electronics Engineers (IEEE)",
    type: "membership",
  },
  {
    id: "5",
    role: "Professional Member",
    organization: "Association for Computing Machinery (ACM)",
    type: "membership",
  },
  {
    id: "6",
    role: "Member",
    organization: "ACM Special Interest Group Computer Human Interaction (SIGCHI)",
    type: "membership",
  },
  {
    id: "7",
    role: "Advisor",
    organization: "Computer Programming Club (CPC), Bangladesh Open University",
    type: "advisory",
  },
  {
    id: "8",
    role: "Member Affairs Secretary",
    organization: "Bangladesh Data Science Society (BDDSS)",
    type: "membership",
  },
  {
    id: "9",
    role: "Former Faculty Advisor",
    organization: "CodeChef Chapter, Dhaka International University",
    type: "advisory",
  },
  {
    id: "10",
    role: "Former Mentor",
    organization: "BASIS Students Forum, Dhaka International University",
    type: "mentorship",
  },
  {
    id: "11",
    role: "Associate Member",
    organization: "Bangladesh Computer Society",
    type: "membership",
  },
  {
    id: "12",
    role: "Former Advisor",
    organization: "Computer Programming Club (CPC), Bangladesh Open University",
    type: "advisory",
  },
]

export const demoGrants: Grant[] = [
  {
    id: "1",
    title:
      "Classification of Infant Cry for Detection of Birth Asphyxia on Baby ChilLanto Database Using Deep and Machine Learning Approaches",
    role: "Principal Investigator",
    fundingAgency:
      "ICT Innovation Grant, ICT Division, Ministry of Posts, Telecommunications and Information Technology, Government of Peoples Republic of Bangladesh",
    location: "Dhaka, Bangladesh",
    status: "completed",
  },
  {
    id: "2",
    title: "Predicting Crops Yield for Smallholder Farmers: A Data-Driven Approach with Hybrid (CNN-LSTM) Deep Model",
    role: "Principal Investigator",
    fundingAgency:
      "Research and Development (R&D) Grant, Ministry of Science and Technology (MOST), Peoples Republic of Bangladesh",
    location: "Dhaka, Bangladesh",
    status: "completed",
  },
  {
    id: "3",
    title: "Identifying the Role of ChatGPT in Teaching and Learning Practice",
    role: "Principal Investigator",
    fundingAgency: "Bangladesh Open University Research Grant, Fiscal Year 2023-24",
    location: "Gazipur, Bangladesh",
    status: "active",
  },
  {
    id: "4",
    title:
      "Alignment and Evaluation of Course Outcome and Program Outcome in the Context of Students Learning Experience at BOU: OBE-Based Web Application Architecture",
    role: "Principal Investigator",
    fundingAgency: "Bangladesh Open University Research Grant, Fiscal Year 2022-23",
    location: "Gazipur, Bangladesh",
    status: "completed",
  },
]

export const publications = demoPublications.map((pub) => ({
  ...pub,
  authors: pub.authors.join(", "),
  link: pub.url,
  abstract: getAbstractForPublication(pub.title),
  keywords: getKeywordsForPublication(pub.title),
}))

export const awards = demoAwards.map((award) => ({
  ...award,
  category: getCategoryFromType(award.type),
  description: getDescriptionForAward(award.title),
  details: getDetailsForAward(award.title),
}))

export const networks = demoNetworks.map((network) => ({
  ...network,
  category: getCategoryFromNetworkType(network.type),
  period: getNetworkPeriod(network),
  location: getNetworkLocation(network.organization),
  description: getNetworkDescription(network.role, network.organization),
}))

export const grants = demoGrants.map((grant) => ({
  ...grant,
  agency: grant.fundingAgency,
  period: getGrantPeriod(grant),
  description: getGrantDescription(grant.title),
  objectives: getGrantObjectives(grant.title),
  collaborators: getGrantCollaborators(grant.title),
  outcomes: getGrantOutcomes(grant.title),
  amount: getGrantAmount(grant.title),
}))

// Helper functions to generate additional data for individual pages
function getAbstractForPublication(title: string): string {
  const abstracts: Record<string, string> = {
    "Analyzing Infant Cry to Detect Birth Asphyxia Using a Hybrid CNN and Feature Extraction Approach":
      "This study explores feature extraction using Mel Frequency Cepstral Coefficients (MFCCs) for birth asphyxia detection through infant cry analysis. The research demonstrates high accuracy in early detection systems.",
    "A comprehensive strategy for identifying plagiarism in academic submissions":
      "A systematic approach to detect plagiarism in academic work using advanced text analysis and machine learning techniques for educational integrity.",
    "Recurrent neural network based multiclass cyber bullying classification":
      "Implementation of RNN models for detecting and classifying different types of cyberbullying in social media platforms with high accuracy.",
  }
  return (
    abstracts[title] || "Advanced research in machine learning and healthcare informatics with practical applications."
  )
}

function getKeywordsForPublication(title: string): string[] {
  const keywords: Record<string, string[]> = {
    "Analyzing Infant Cry to Detect Birth Asphyxia Using a Hybrid CNN and Feature Extraction Approach": [
      "Machine Learning",
      "Healthcare",
      "Signal Processing",
      "CNN",
      "Medical Diagnostics",
    ],
    "A comprehensive strategy for identifying plagiarism in academic submissions": [
      "Natural Language Processing",
      "Text Analysis",
      "Academic Integrity",
      "Machine Learning",
    ],
    "Recurrent neural network based multiclass cyber bullying classification": [
      "Deep Learning",
      "RNN",
      "Cyberbullying",
      "Social Media",
      "Classification",
    ],
  }
  return keywords[title] || ["Machine Learning", "Healthcare", "AI", "Research"]
}

function getCategoryFromType(type: string): string {
  const mapping: Record<string, string> = {
    fellowship: "Fellowship",
    award: "Award",
    recognition: "Recognition",
    competition: "Competition",
  }
  return mapping[type] || "Award"
}

function getDescriptionForAward(title: string): string {
  const descriptions: Record<string, string> = {
    "Nominated to India Science and Research Fellowship 2024-25":
      "Recognition for outstanding research contributions in computer science and healthcare informatics.",
    "AI for Good-Innovate for Impact Award":
      "International recognition for innovative AI applications that create positive social impact.",
    "Most Accurate Deep Model Creator":
      "Achievement for developing highly accurate deep learning models in public health applications.",
  }
  return descriptions[title] || "Recognition for excellence in research and innovation."
}

function getDetailsForAward(title: string): string {
  const details: Record<string, string> = {
    Judge: "Served as technical judge evaluating innovative projects and solutions in technology competitions.",
    "Regional Judge & Mentor":
      "Provided guidance and evaluation for international space-related challenges and innovations.",
  }
  return details[title] || ""
}

function getCategoryFromNetworkType(type: string): string {
  const mapping: Record<string, string> = {
    editorial: "Editorial",
    membership: "Membership",
    advisory: "Advisory",
    mentorship: "Mentorship",
  }
  return mapping[type] || "Professional"
}

function getNetworkPeriod(network: any): string {
  if (network.startYear && network.endYear) {
    return `${network.startYear} - ${network.endYear}`
  } else if (network.startYear) {
    return `${network.startYear} - Present`
  }
  return "Current"
}

function getNetworkLocation(organization: string): string {
  const locations: Record<string, string> = {
    "PLoS ONE, Public Library of Science": "International",
    "Institute of Electrical and Electronics Engineers (IEEE)": "International",
    "Association for Computing Machinery (ACM)": "International",
    "Bangladesh Open University": "Bangladesh",
    "Dhaka International University": "Bangladesh",
  }
  return locations[organization] || "International"
}

function getNetworkDescription(role: string, organization: string): string {
  return `Active ${role.toLowerCase()} contributing to ${organization}'s mission in advancing research and education.`
}

function getGrantPeriod(grant: any): string {
  if (grant.startYear && grant.endYear) {
    return `${grant.startYear} - ${grant.endYear}`
  } else if (grant.startYear) {
    return `${grant.startYear} - Present`
  }
  return "2023 - 2024"
}

function getGrantDescription(title: string): string {
  const descriptions: Record<string, string> = {
    "Classification of Infant Cry for Detection of Birth Asphyxia on Baby ChilLanto Database Using Deep and Machine Learning Approaches":
      "Developing advanced machine learning models to detect birth asphyxia through infant cry analysis, potentially saving newborn lives through early detection.",
    "Predicting Crops Yield for Smallholder Farmers: A Data-Driven Approach with Hybrid (CNN-LSTM) Deep Model":
      "Creating predictive models to help smallholder farmers optimize crop yields using deep learning and agricultural data analysis.",
    "Identifying the Role of ChatGPT in Teaching and Learning Practice":
      "Investigating the impact and effectiveness of AI-powered language models in educational settings and pedagogical practices.",
  }
  return (
    descriptions[title] ||
    "Research project focused on advancing knowledge in computer science and healthcare applications."
  )
}

function getGrantObjectives(title: string): string[] {
  const objectives: Record<string, string[]> = {
    "Classification of Infant Cry for Detection of Birth Asphyxia on Baby ChilLanto Database Using Deep and Machine Learning Approaches":
      [
        "Develop accurate machine learning models for birth asphyxia detection",
        "Create a robust dataset of infant cry recordings",
        "Implement real-time detection systems for clinical use",
      ],
    "Predicting Crops Yield for Smallholder Farmers: A Data-Driven Approach with Hybrid (CNN-LSTM) Deep Model": [
      "Build predictive models for crop yield estimation",
      "Integrate weather and soil data for accurate predictions",
      "Develop farmer-friendly mobile applications",
    ],
  }
  return (
    objectives[title] || [
      "Advance research in the field",
      "Develop practical applications",
      "Publish findings in peer-reviewed journals",
    ]
  )
}

function getGrantCollaborators(title: string): string[] {
  return ["University Research Team", "International Partners", "Industry Collaborators"]
}

function getGrantOutcomes(title: string): string {
  return "Expected to produce high-impact publications, practical applications, and contribute to advancing the field through innovative research methodologies."
}

function getGrantAmount(title: string): string {
  const amounts: Record<string, string> = {
    "Classification of Infant Cry for Detection of Birth Asphyxia on Baby ChilLanto Database Using Deep and Machine Learning Approaches":
      "$50,000",
    "Predicting Crops Yield for Smallholder Farmers: A Data-Driven Approach with Hybrid (CNN-LSTM) Deep Model":
      "$75,000",
    "Identifying the Role of ChatGPT in Teaching and Learning Practice": "$25,000",
  }
  return amounts[title] || "$40,000"
}
