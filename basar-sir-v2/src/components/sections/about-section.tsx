import { Card } from "@/components/ui/card"
import { GraduationCap, Briefcase, Award, Users } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">
            I am a dedicated researcher and educator with a passion for applying machine learning and artificial
            intelligence to solve real-world healthcare challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-card border-border">
            <GraduationCap className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Education</h3>
            <p className="text-sm text-muted-foreground">PhD in Informatics (Medical Informatics)</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Briefcase className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Experience</h3>
            <p className="text-sm text-muted-foreground">Teaching Professional & Research Assistant</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Award className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Research</h3>
            <p className="text-sm text-muted-foreground">Machine Learning in Healthcare</p>
          </Card>

          <Card className="p-6 text-center bg-card border-border">
            <Users className="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Collaboration</h3>
            <p className="text-sm text-muted-foreground">International Research Networks</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Academic Journey</h3>
            <div className="space-y-4 font-serif">
              <p className="text-muted-foreground leading-relaxed">
                Currently pursuing my PhD in Informatics with a specialization in Medical Informatics at the University
                of Missouri-Columbia. My research focuses on applying machine learning techniques to healthcare
                challenges, particularly in medical signal processing and diagnostic systems.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I hold a Master's degree in Computer Science and Engineering from the Military Institute of Science and
                Technology (MIST), Bangladesh, where I developed expertise in deep learning and software-defined
                networking.
              </p>
            </div>
          </Card>

          <Card className="p-8 bg-card border-border">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Research Philosophy</h3>
            <div className="space-y-4 font-serif">
              <p className="text-muted-foreground leading-relaxed">
                I believe in the transformative power of artificial intelligence to improve healthcare outcomes. My work
                bridges the gap between cutting-edge technology and practical medical applications, always keeping
                patient care at the center of innovation.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                As Babe Ruth said, "It's hard to beat a person who never gives up." This philosophy drives my approach
                to research, teaching, and continuous learning in the rapidly evolving field of AI.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
