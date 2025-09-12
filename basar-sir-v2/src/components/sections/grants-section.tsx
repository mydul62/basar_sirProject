"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, MapPin, Calendar, User } from "lucide-react"
import { Grant } from "@/src/lib/demo-data"
import { useEffect, useState } from "react"
import { GetAllGrants } from "@/src/services/grants"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
  const [grants, setGrants] = useState<Grant[]>([])

  useEffect(() => {
    const fetchGrants = async () => {
      try {
        const res = await GetAllGrants()
        setGrants(res?.data || [])
      } catch (error) {
        console.error("Failed to fetch grants:", error)
      }
    }

    fetchGrants()
  }, [])

  const displayedGrants = grants.slice(0, 3)

  return (
    <section id="grants" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Grants and Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Research funding and project leadership in healthcare informatics and machine learning
          </p>
        </div>

        <div className="space-y-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedGrants.map((grant) => (
            <Card key={grant._id} className="hover:shadow-lg transition-shadow">
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

        {grants.length > 3 && (
          <div className="mt-8 text-center">
            <Link href="/grants" className="">
                <Button
                variant="outline"
                size="lg"
                className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
              >
                {" "}
                View More →
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
