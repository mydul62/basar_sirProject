"use client"

import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { Grant } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Calendar, MapPin, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { GetAllGrants } from "@/src/services/grants"

export default function GrantsPage() {
  const [grants, setGrants] = useState<Grant[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllGrants()
        setGrants(res?.data || [])
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])

  const {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData: filteredGrants,
  } = useSearchFilter({
    data: grants,
    searchFields: ["title", "fundingAgency", "location", "role"],
    filterFields: {
      status: "status",
      role: "role",
      location: "location",
    },
  })

  const filterOptions = [
    {
      key: "status",
      label: "Status",
      options: Array.from(new Set(grants.map((g) => g.status)))
        .map((status) => ({
          value: status,
          label: status,
          count: grants.filter((g) => g.status === status).length,
        }))
        .sort((a, b) => b.count - a.count),
    },
    {
      key: "role",
      label: "Role",
      options: Array.from(new Set(grants.map((g) => g.role)))
        .map((role) => ({
          value: role,
          label: role,
          count: grants.filter((g) => g.role === role).length,
        }))
        .sort((a, b) => b.count - a.count),
    },
    {
      key: "location",
      label: "Location",
      options: Array.from(new Set(grants.map((g) => g.location).filter(Boolean)))
        .map((location) => ({
          value: location!,
          label: location!,
          count: grants.filter((g) => g.location === location).length,
        }))
        .sort((a, b) => b.count - a.count),
    },
  ]

  return (
    <div className="min-h-screen container mx-auto px-4 bg-background">
      <PageHeader
        title="Grants & Projects"
        description="Research funding and project leadership in machine learning, healthcare informatics, and educational technology"
      />

      <main>
        <div className="py-8">
          {/* Search and filters */}
          <div className="mb-8">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search grants by title, funding agency, role, or location..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredGrants.length} of {grants.length} grants
            </p>
          </div>

          {/* Grants Grid */}
          <div className="space-y-8">
            {filteredGrants.map((grant) => (
              <Card key={grant._id} className="hover:shadow-lg transition-shadow duration-300">
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
                          {grant.startYear} – {grant.endYear || "Ongoing"}
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
                      <Badge variant="secondary" className="shrink-0 capitalize">
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
                      <p className="text-muted-foreground">{grant.fundingAgency}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredGrants.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No grants found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button onClick={clearFilters} className="text-primary hover:text-primary/80">
                Clear all filters
              </button>
            </div>
          )}

          {/* Grant Stats */}
          {filteredGrants.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{filteredGrants.length}</div>
                  <p className="text-muted-foreground">Total Grants</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredGrants.filter((g) => g.role === "Principal Investigator").length}
                  </div>
                  <p className="text-muted-foreground">As PI</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredGrants.filter((g) => g.status === "active").length}
                  </div>
                  <p className="text-muted-foreground">Active Projects</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(filteredGrants.map((g) => g.fundingAgency)).size}
                  </div>
                  <p className="text-muted-foreground">Funding Agencies</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <ScrollToTop />
    </div>
  )
}
