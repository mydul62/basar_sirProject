import { Navigation } from "@/src/components/navigation"
import { HeroSection } from "@/src/components/sections/hero-section"
import { AboutSection } from "@/src/components/sections/about-section"
import { ProjectsSection } from "@/src/components/sections/projects-section"
import { PublicationsSection } from "@/src/components/sections/publications-section"
import { AwardsSection } from "@/src/components/sections/awards-section"
import { NetworksSection } from "@/src/components/sections/networks-section"
import { GrantsSection } from "@/src/components/sections/grants-section"
import { BlogSection } from "@/src/components/sections/blog-section"
import { ContactSection } from "@/src/components/sections/contact-section"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="md:ml-64">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <PublicationsSection />
        <AwardsSection />
        <NetworksSection />
        <GrantsSection />
        <BlogSection />
        <ContactSection />
      </main>
      <ScrollToTop />

      <footer className="bg-muted/30 border-t border-border py-12 md:ml-64">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground font-sans">Md. Abul Basary</h3>
            <p className="text-muted-foreground font-serif">Teaching Professional | Researcher | Explorer</p>
            <p className="text-sm text-muted-foreground">© 2024 Md. Abul Basar. </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
