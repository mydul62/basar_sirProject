import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground font-sans">Md. Abul Basar</h1>
              <p className="text-xl text-primary font-medium">Teaching Professional | Researcher | Explorer</p>
              <p className="text-lg text-muted-foreground font-serif leading-relaxed max-w-2xl">
              Aspiring academic in computer science and data science, seeking a fully funded PhD to advance research in health informatics and machine learning while contributing to academic excellence.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="https://wa.me/8801758443472" target="_blank">
      <Button size="lg" className="font-medium">
        <Mail className="w-4 h-4 mr-2" />
        Contact Me
      </Button>
    </Link>
              <Button variant="outline" size="lg" className="font-medium bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Research
              </Button>
            </div>

            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="flex-1 max-w-md">
            <Card className="p-6 bg-card border-border">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl font-bold text-primary">
                         <div>
      <Image
      alt="basr"
        src="/basar.png" 
        width={500}
        height={300}
      />
    </div>
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg">Current Position</h3>
                  <p className="text-sm text-muted-foreground">Lecturer</p>
                  <p className="text-sm text-primary font-medium">Dept. of Computer Science and
Engineering (CSE)
NITER</p>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Research Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Machine Learning", "Healthcare AI", "Data Analytics", "Medical Informatics", "Agentic AI"].map(
                      (interest) => (
                        <span key={interest} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md">
                          {interest}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
