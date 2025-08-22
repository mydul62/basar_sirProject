import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { networks } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Network, Users, Building, Calendar } from "lucide-react"

export default function NetworksPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Network className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 font-serif">Professional Networks</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Active participation in professional organizations, editorial boards, and academic communities that
              advance research and education in computer science and healthcare.
            </p>
          </div>

          {/* Networks by Category */}
          {Object.entries(
            networks.reduce(
              (acc, network) => {
                if (!acc[network.category]) acc[network.category] = []
                acc[network.category].push(network)
                return acc
              },
              {} as Record<string, typeof networks>,
            ),
          ).map(([category, categoryNetworks]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {category === "Editorial" && <Users className="w-5 h-5 text-primary" />}
                  {category === "Professional" && <Building className="w-5 h-5 text-primary" />}
                  {category === "Advisory" && <Network className="w-5 h-5 text-primary" />}
                  {category === "Membership" && <Users className="w-5 h-5 text-primary" />}
                </div>
                {category} Roles
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryNetworks.map((network, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-foreground mb-2">{network.role}</CardTitle>
                          <p className="text-primary font-medium mb-1">{network.organization}</p>
                          {network.details && <p className="text-sm text-muted-foreground">{network.details}</p>}
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {network.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {network.period || "Current"}
                        </div>
                        {network.location && (
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {network.location}
                          </div>
                        )}
                      </div>

                      {network.description && (
                        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">{network.description}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}

          {/* Network Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{networks.length}</div>
                <p className="text-muted-foreground">Total Networks</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {networks.filter((n) => n.category === "Editorial").length}
                </div>
                <p className="text-muted-foreground">Editorial Roles</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {networks.filter((n) => n.category === "Professional").length}
                </div>
                <p className="text-muted-foreground">Professional Bodies</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {networks.filter((n) => n.category === "Advisory").length}
                </div>
                <p className="text-muted-foreground">Advisory Positions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
