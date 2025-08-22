import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { grants } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, MapPin, Users } from "lucide-react"

export default function GrantsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">Grants & Projects</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Research funding and project leadership in machine learning, healthcare informatics, and educational
              technology from government agencies and international organizations.
            </p>
          </div>

          {/* Grants Grid */}
          <div className="space-y-8">
            {grants.map((grant, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-3 leading-tight">
                        {grant.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="font-medium text-primary">{grant.role}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {grant.period}
                        </div>
                        {grant.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {grant.location}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <Badge variant="secondary" className="shrink-0">
                        {grant.status}
                      </Badge>
                      {grant.amount && (
                        <Badge variant="outline" className="shrink-0">
                          {grant.amount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-2">Funding Agency</p>
                      <p className="text-muted-foreground">{grant.agency}</p>
                    </div>

                    {grant.description && (
                      <div>
                        <p className="font-medium text-foreground mb-2">Project Description</p>
                        <p className="text-muted-foreground leading-relaxed">{grant.description}</p>
                      </div>
                    )}

                    {grant.objectives && (
                      <div>
                        <p className="font-medium text-foreground mb-2">Key Objectives</p>
                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                          {grant.objectives.map((objective, idx) => (
                            <li key={idx}>{objective}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {grant.collaborators && (
                      <div>
                        <p className="font-medium text-foreground mb-2">Collaborators</p>
                        <div className="flex flex-wrap gap-2">
                          {grant.collaborators.map((collaborator, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {collaborator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {grant.outcomes && (
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="font-medium text-foreground mb-2">Expected Outcomes</p>
                        <p className="text-sm text-muted-foreground">{grant.outcomes}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Grant Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{grants.length}</div>
                <p className="text-muted-foreground">Total Grants</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {grants.filter((g) => g.role === "Principal Investigator").length}
                </div>
                <p className="text-muted-foreground">As PI</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {grants.filter((g) => g.status === "Active").length}
                </div>
                <p className="text-muted-foreground">Active Projects</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{new Set(grants.map((g) => g.agency)).size}</div>
                <p className="text-muted-foreground">Funding Agencies</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
