import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, MapPin, Calendar, User } from "lucide-react"
import { demoGrants } from "@/src/lib/demo-data"

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "completed":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function GrantsSection() {
  return (
    <section id="grants" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Grants and Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Research funding and project leadership in healthcare informatics and machine learning
          </p>
        </div>

        <div className="space-y-6">
          {demoGrants.map((grant) => (
            <Card key={grant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-xl text-emerald-700 leading-tight mb-3">{grant.title}</CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">{grant.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{grant.location}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">{grant.fundingAgency}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {(grant.startYear || grant.endYear) && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {grant.startYear}
                          {grant.endYear && ` - ${grant.endYear}`}
                        </span>
                      </div>
                    )}
                    {grant.amount && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{grant.amount}</span>
                      </div>
                    )}
                  </div>
                  <Badge className={`${getStatusColor(grant.status)} capitalize`}>{grant.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
