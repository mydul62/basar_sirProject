import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Medal } from "lucide-react"
import { demoAwards } from "@/src/lib/demo-data"

const getAwardIcon = (type: string) => {
  switch (type) {
    case "fellowship":
      return <Star className="h-5 w-5 text-yellow-500" />
    case "award":
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case "recognition":
      return <Medal className="h-5 w-5 text-yellow-500" />
    case "competition":
      return <Award className="h-5 w-5 text-yellow-500" />
    default:
      return <Trophy className="h-5 w-5 text-yellow-500" />
  }
}

export function AwardsSection() {
  return (
    <section id="awards" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Awards & Honours</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Recognition for contributions to research, innovation, and academic excellence
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {demoAwards.map((award) => (
            <Card key={award.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  {getAwardIcon(award.type)}
                  <div className="flex-1">
                    <CardTitle className="text-lg leading-tight mb-2">{award.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{award.organization}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {award.year}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {award.type}
                  </Badge>
                </div>
                {award.description && <p className="text-sm text-muted-foreground mt-3">{award.description}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
