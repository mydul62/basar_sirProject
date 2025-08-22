import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { publications } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Calendar, Users } from "lucide-react"

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">Research Publications</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive collection of peer-reviewed research publications in machine learning, healthcare
              informatics, and artificial intelligence applications.
            </p>
            <div className="flex justify-center gap-4 mt-8">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                {publications.length} Publications
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Calendar className="w-4 h-4 mr-2" />
                2021 - 2025
              </Badge>
            </div>
          </div>

          {/* Publications Grid */}
          <div className="space-y-8">
            {publications.map((publication, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-3 leading-tight">
                        {publication.title}
                      </CardTitle>
                      <p className="text-muted-foreground mb-4">
                        <span className="font-medium text-primary">{publication.authors.split(",")[0]}</span>
                        {publication.authors.includes(",") && (
                          <span>, {publication.authors.split(",").slice(1).join(",")}</span>
                        )}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {publication.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">{publication.journal}</p>
                      {publication.volume && (
                        <p className="text-sm text-muted-foreground">
                          Volume {publication.volume}
                          {publication.pages && `, Pages ${publication.pages}`}
                        </p>
                      )}
                    </div>

                    {publication.abstract && (
                      <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {publication.keywords?.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {publication.link && (
                      <div className="pt-4">
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Publication
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{publications.length}</div>
                <p className="text-muted-foreground">Total Publications</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(publications.map((p) => p.journal)).size}
                </div>
                <p className="text-muted-foreground">Journals</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {new Set(publications.map((p) => p.year)).size}
                </div>
                <p className="text-muted-foreground">Years Active</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
