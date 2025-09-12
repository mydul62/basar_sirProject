"use client"

import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { publications } from "@/src/lib/demo-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, BookOpen } from "lucide-react"

export default function PublicationsPage() {
  const {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData: filteredPublications,
  } = useSearchFilter({
    data: publications,
    searchFields: ["title", "authors", "journal", "keywords"],
    filterFields: {
      year: "year",
      journal: "journal",
      keywords: "keywords",
    },
  })

  const filterOptions = [
    {
      key: "year",
      label: "Year",
      options: Array.from(new Set(publications.map((p) => p.year)))
        .sort((a, b) => b - a)
        .map((year) => ({
          value: year.toString(),
          label: year.toString(),
          count: publications.filter((p) => p.year === year).length,
        })),
    },
    {
      key: "journal",
      label: "Journal",
      options: Array.from(new Set(publications.map((p) => p.journal)))
        .map((journal) => ({
          value: journal,
          label: journal,
          count: publications.filter((p) => p.journal === journal).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 8), // Show top 8 journals
    },
    {
      key: "keywords",
      label: "Keywords",
      options: Array.from(new Set(publications.flatMap((p) => p.keywords || [])))
        .map((keyword) => ({
          value: keyword,
          label: keyword,
          count: publications.filter((p) => p.keywords?.includes(keyword)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10), // Show top 10 keywords
    },
  ]

  return (
    <div className="min-h-screen container mx-auto px-4 bg-background">
      <PageHeader
        title="Research Publications"
        description="Peer-reviewed research publications in machine learning, healthcare informatics, and AI applications"
      />

      <main className="">
        <div className=" py-8">
          <div className="mb-8">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search publications by title, authors, journal, or keywords..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredPublications.length} of {publications.length} publications
            </p>
          </div>

          {/* Publications List */}
          <div className="space-y-8">
            {filteredPublications.map((publication, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-semibold text-foreground mb-3 leading-tight">
                        {publication.title}
                      </CardTitle>
                      <p className="text-muted-foreground mb-4">
                        <span className="font-medium text-primary">{publication.authors.split(",")[0]}</span>
                        {publication.authors.includes(",") && (
                          <span>, {publication.authors.split(",").slice(1).join(",")}</span>
                        )}
                      </p>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      {publication.year}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-1">{publication.journal}</p>
                      {publication.volume && (
                        <p className="text-sm text-muted-foreground">
                          Volume {publication.volume}
                          {publication.pages && `, Pages ${publication.pages}`}
                        </p>
                      )}
                    </div>

                    {publication.abstract && (
                      <p className="text-muted-foreground leading-relaxed">{publication.abstract}</p>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {publication.keywords?.map((keyword, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>

                    {publication.link && (
                      <div className="pt-4">
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={publication.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Publication
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredPublications.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No publications found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Stats Section */}
          {filteredPublications.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{filteredPublications.length}</div>
                  <p className="text-muted-foreground">Total Publications</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(filteredPublications.map((p) => p.journal)).size}
                  </div>
                  <p className="text-muted-foreground">Journals</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(filteredPublications.map((p) => p.year)).size}
                  </div>
                  <p className="text-muted-foreground">Years Active</p>
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
