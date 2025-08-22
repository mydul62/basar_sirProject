import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { awards } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, MapPin } from "lucide-react"

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">Awards & Honours</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Recognition for excellence in research, innovation, and contributions to the academic and professional
              community in computer science and healthcare informatics.
            </p>
          </div>

          {/* Awards Timeline */}
          <div className="space-y-8">
            {awards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2">{award.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {award.year}
                        </div>
                        {award.organization && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {award.organization}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {award.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {award.description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">{award.description}</p>
                  )}

                  {award.details && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">{award.details}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievement Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{awards.length}</div>
                <p className="text-muted-foreground">Total Awards</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {awards.filter((a) => a.category === "Fellowship").length}
                </div>
                <p className="text-muted-foreground">Fellowships</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {awards.filter((a) => a.category === "Innovation").length}
                </div>
                <p className="text-muted-foreground">Innovation Awards</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {awards.filter((a) => a.category === "Competition").length}
                </div>
                <p className="text-muted-foreground">Competition Awards</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
