import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Edit, Shield, GraduationCap, CheckCircle } from "lucide-react"
import { demoNetworks } from "@/src/lib/demo-data"

const getNetworkIcon = (type: string) => {
  switch (type) {
    case "editorial":
      return <Edit className="h-5 w-5 text-emerald-600" />
    case "membership":
      return <Users className="h-5 w-5 text-emerald-600" />
    case "advisory":
      return <Shield className="h-5 w-5 text-emerald-600" />
    case "mentorship":
      return <GraduationCap className="h-5 w-5 text-emerald-600" />
    default:
      return <CheckCircle className="h-5 w-5 text-emerald-600" />
  }
}

export function NetworksSection() {
  return (
    <section id="networks" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Networks</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional affiliations and collaborative networks in academia and industry
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {demoNetworks.map((network) => (
            <Card key={network.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  {getNetworkIcon(network.type)}
                  <div className="flex-1">
                    <h3 className="font-semibold text-emerald-700 mb-1">{network.role}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{network.organization}</p>
                    {network.description && <p className="text-xs text-muted-foreground mt-2">{network.description}</p>}
                    <div className="flex items-center gap-2 mt-3">
                      <Badge variant="outline" className="text-xs capitalize">
                        {network.type}
                      </Badge>
                      {network.startYear && (
                        <Badge variant="secondary" className="text-xs">
                          {network.startYear}
                          {network.endYear && ` - ${network.endYear}`}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
