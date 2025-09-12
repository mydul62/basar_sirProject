"use client"

import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { IAward as OriginalIAward } from "@/src/lib/demo-data"

// Extend IAward to ensure it has a category property
interface IAward extends OriginalIAward {
  category: string
  // Add other properties if needed
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, MapPin, Award, Star, Medal } from "lucide-react"
import { useEffect, useState } from "react"
import { GetAllAward } from "@/src/services/award"

const getAwardIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case "fellowship":
      return <Star className="w-6 h-6 text-primary" />
    case "innovation":
      return <Trophy className="w-6 h-6 text-primary" />
    case "recognition":
      return <Medal className="w-6 h-6 text-primary" />
    case "competition":
      return <Award className="w-6 h-6 text-primary" />
    default:
      return <Trophy className="w-6 h-6 text-primary" />
  }
}

export default function AwardsPage() {
 const [awards, setAwards] = useState<IAward[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await GetAllAward()
        setAwards(res?.data)
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
    filteredData: filteredAwards,
  } = useSearchFilter({
    data: awards,
    searchFields: ["title", "organization", "description"],
    filterFields: {
      category: "category" as keyof IAward, // Ensure "category" is a key in IAward (case-sensitive)
      year: "year" as keyof IAward,         // Ensure "year" is a key in IAward (case-sensitive)
    },
  })

  const filterOptions = [
    {
      key: "category",
      label: "Category",
      options: Array.from(new Set(awards.map((a) => a.category)))
        .map((category) => ({
          value: category,
          label: category,
          count: awards.filter((a) => a.category === category).length,
        }))
        .sort((a, b) => b.count - a.count),
    },
    {
      key: "year",
      label: "Year",
      options: Array.from(new Set(awards.map((a) => a.year)))
        .sort((a, b) => b - a)
        .map((year) => ({
          value: year.toString(),
          label: year.toString(),
          count: awards.filter((a) => a.year === year).length,
        })),
    },
  ]

  return (
    <div className="min-h-screen container mx-auto px-4  bg-background">

      <PageHeader
        title="Awards & Honours"
        description="Recognition for excellence in research, innovation, and contributions to the academic community"
      />

      <main className="">
        <div className="py-8">
          <div className="mb-8">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search awards by title, organization, or description..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredAwards.length} of {awards.length} awards
            </p>
          </div>

          {/* Awards Timeline */}
          <div className="space-y-8">
            {filteredAwards.map((award, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {getAwardIcon(award.category)}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-2">{award.title}</CardTitle>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {award.year}
                        </div>
                        {award.organization && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {award.organization}
                          </div>
                        )}
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {award.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {award.description && (
                    <p className="text-muted-foreground leading-relaxed mb-4">{award.description}</p>
                  )}

                  {/* {award.details && (
                    <div className="bg-muted/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">{award.details}</p>
                    </div>
                  )} */}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredAwards.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No awards found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button onClick={clearFilters} className="text-primary hover:text-primary/80">
                Clear all filters
              </button>
            </div>
          )}

          {/* Achievement Stats */}
          {filteredAwards.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{filteredAwards.length}</div>
                  <p className="text-muted-foreground">Total Awards</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredAwards.filter((a) => a.category === "Fellowship").length}
                  </div>
                  <p className="text-muted-foreground">Fellowships</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredAwards.filter((a) => a.category === "Innovation").length}
                  </div>
                  <p className="text-muted-foreground">Innovation Awards</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredAwards.filter((a) => a.category === "Competition").length}
                  </div>
                  <p className="text-muted-foreground">Competition Awards</p>
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
