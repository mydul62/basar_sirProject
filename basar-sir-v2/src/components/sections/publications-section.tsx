"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText } from "lucide-react"
import { Publication } from "@/src/lib/demo-data"
import { useEffect, useState } from "react"
import { GetAllPublicatons } from "@/src/services/Publications"
import Link from "next/link"

export function PublicationsSection() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
console.log(publications)
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await GetAllPublicatons()
        setPublications(data?.data)
      } catch (error) {
        console.error("Failed to fetch publications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPublications()
  }, [])

  if (loading) return <p>Loading...</p>

  // Show only first 3 publications
  const displayedPublications = publications.slice(0, 3)

  return (
    <section id="publications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Research Publications</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-serif">
            Peer-reviewed publications in machine learning, healthcare informatics, and artificial intelligence
          </p>
        </div>

        <div className="space-y-6">
          {displayedPublications.map((publication, index) => (
            <Card key={publication._id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">[{index + 1}]</Badge>
                      <Badge variant={publication.status === "published" ? "default" : "outline"} className="text-xs">
                        {publication.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">{publication.type}</Badge>
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground leading-tight font-sans">
                      {publication.title}
                    </CardTitle>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={publication?.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      <span className="sr-only">View publication</span>
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="text-sm text-muted-foreground font-serif">
                    <span className="font-medium">Authors:</span> {publication.authors}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-serif">
                    <div><span className="font-medium">Journal:</span> {publication.journal}</div>
                    <div><span className="font-medium">Year:</span> {publication.year}</div>
                    {publication.volume && <div><span className="font-medium">Volume:</span> {publication.volume}</div>}
                    {publication.pages && <div><span className="font-medium">Pages:</span> {publication.pages}</div>}
                  </div>

                  {publication.url && (
                    <div className="pt-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={publication.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Available at{" "}
                          {publication.url.includes("springer") ? "Springer" :
                           publication.url.includes("ieee") ? "IEEE Access" :
                           publication.url.includes("sciencedirect") ? "Elsevier" : "Publisher"}
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Show All button if more than 3 */}
        {publications.length > 2 && (
          <div className="text-center mt-8">
            <Link href="/publications">
              <Button variant="outline">Show All Publications</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
