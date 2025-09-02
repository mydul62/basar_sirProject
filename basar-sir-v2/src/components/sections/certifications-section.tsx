"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, ExternalLink } from "lucide-react"
import Image from "next/image"
import { demoCertificates } from "@/src/lib/demo-data"

export function CertificationsSection() {
  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Certifications</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and credentials demonstrating expertise in various technologies
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {demoCertificates.map((cert) => (
            <Card key={cert.id} className="hover:shadow-lg transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={`${cert.title} certification badge`}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground font-medium">{cert.issuer}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {cert.issueDate} - {cert.expiryDate}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4">{cert.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">ID: {cert.credentialId}</span>
                  </div>
                  {cert.verificationUrl && (
                    <button
                      className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
                      onClick={() => window.open(cert.verificationUrl, "_blank")}
                    >
                      <ExternalLink className="h-3 w-3" />
                      Verify
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
