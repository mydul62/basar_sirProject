"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
import { demoPublications } from "@/src/lib/demo-data"

export function PublicationsSection() {
  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Research Publications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-serif">
            Peer-reviewed publications in machine learning, healthcare informatics, and artificial intelligence
          </p>
        </div>

        <div className="space-y-6">
          {demoPublications.map((publication, index) => (
            <Card key={publication.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        [{index + 1}]
                      </Badge>
                      <Badge variant={publication.status === "published" ? "default" : "outline"} className="text-xs">
                        {publication.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {publication.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground leading-tight font-sans">
                      {publication.title}
                    </CardTitle>
                  </div>
                  {publication.url && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={publication.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="sr-only">View publication</span>
                      </a>
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground font-serif">
                    <span className="font-medium">Authors:</span>{" "}
                    {publication.authors.map((author, idx) => (
                      <span key={idx}>
                        {author === "Dey, S. K." || author === "Dey, S.K." ? (
                          <span className="font-semibold text-primary">{author}</span>
                        ) : (
                          author
                        )}
                        {idx < publication.authors.length - 1 && ", "}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-serif">
                    <div>
                      <span className="font-medium">Journal:</span> {publication.journal}
                    </div>
                    <div>
                      <span className="font-medium">Year:</span> {publication.year}
                    </div>
                    {publication.volume && (
                      <div>
                        <span className="font-medium">Volume:</span> {publication.volume}
                      </div>
                    )}
                    {publication.pages && (
                      <div>
                        <span className="font-medium">Pages:</span> {publication.pages}
                      </div>
                    )}
                  </div>

                  {publication.url && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={publication.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Available at{" "}
                          {publication.url.includes("springer")
                            ? "Springer"
                            : publication.url.includes("ieee")
                              ? "IEEE Access"
                              : publication.url.includes("sciencedirect")
                                ? "Elsevier"
                                : "Publisher"}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground font-serif">
            For a complete list of publications and citations, visit my{" "}
            <a
              href="https://scholar.google.com/citations?user=example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Google Scholar profile
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
