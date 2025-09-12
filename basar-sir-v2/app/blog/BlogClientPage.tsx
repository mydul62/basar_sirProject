"use client"

import { Navigation } from "@/src/components/navigation"
import { ScrollToTop } from "@/src/components/ui/scroll-to-top"
import { PageHeader } from "@/components/ui/page-header"
import { SearchFilterBar } from "@/components/ui/search-filter-bar"
import { useSearchFilter } from "@/hooks/use-search-filter"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"
import { demoBlogPosts } from "@/src/lib/demo-data"
import Image from "next/image"
import Link from "next/link"

export default function BlogClientPage() {
  const publishedPosts = demoBlogPosts.filter((post) => post.status === "published")

  // <CHANGE> Added search and filter functionality
  const {
    searchValue,
    setSearchValue,
    activeFilters,
    handleFilterChange,
    clearFilters,
    filteredData: filteredPosts,
  } = useSearchFilter({
    data: publishedPosts,
    searchFields: ["title", "excerpt", "content", "tags"],
    filterFields: {
      tags: "tags",
      readTime: "readTime",
    },
  })

  // <CHANGE> Generate filter options from data
  const filterOptions = [
    {
      key: "tags",
      label: "Tags",
      options: Array.from(new Set(publishedPosts.flatMap((p) => p.tags)))
        .map((tag) => ({
          value: tag,
          label: tag,
          count: publishedPosts.filter((p) => p.tags.includes(tag)).length,
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10), // Show top 10 tags
    },
    {
      key: "readTime",
      label: "Read Time",
      options: [
        { value: "1-5", label: "1-5 min", count: publishedPosts.filter((p) => p.readTime <= 5).length },
        {
          value: "6-10",
          label: "6-10 min",
          count: publishedPosts.filter((p) => p.readTime > 5 && p.readTime <= 10).length,
        },
        { value: "11+", label: "11+ min", count: publishedPosts.filter((p) => p.readTime > 10).length },
      ].filter((option) => option.count > 0),
    },
  ]

  // Filter by read time ranges
  const filteredByReadTime = filteredPosts.filter((post) => {
    const readTimeFilter = activeFilters.readTime
    if (!readTimeFilter || readTimeFilter.length === 0) return true

    return readTimeFilter.some((filter) => {
      if (filter === "1-5") return post.readTime <= 5
      if (filter === "6-10") return post.readTime > 5 && post.readTime <= 10
      if (filter === "11+") return post.readTime > 10
      return true
    })
  })

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* <CHANGE> Added page header with back button */}
      <PageHeader
        title="Blog"
        description="Insights and thoughts on machine learning, healthcare AI, and academic research"
      />

      <main className="ml-0 lg:ml-64">
        <div className="container mx-auto px-4 py-8">
          {/* <CHANGE> Added search and filter bar */}
          <div className="mb-8">
            <SearchFilterBar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              filters={filterOptions}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              placeholder="Search blog posts by title, content, or tags..."
            />
          </div>

          {/* Results count */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {filteredByReadTime.length} of {publishedPosts.length} posts
            </p>
          </div>

          {/* Blog posts grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredByReadTime.map((post) => (
              <Card key={post.id} className="bg-card border-border overflow-hidden hover:shadow-lg transition-shadow">
                {post.imageUrl && (
                  <div className="aspect-video relative">
                    <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                  </div>
                )}

                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-semibold text-foreground font-sans line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="font-serif line-clamp-3">{post.excerpt}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Link href={`/blog/${post.id}`} className="block">
                    <Button variant="ghost" className="p-0 h-auto font-medium text-primary hover:text-primary/80">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No results message */}
          {filteredByReadTime.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Blog Stats */}
          {filteredByReadTime.length > 0 && (
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{filteredByReadTime.length}</div>
                  <p className="text-muted-foreground">Total Posts</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {new Set(filteredByReadTime.flatMap((p) => p.tags)).size}
                  </div>
                  <p className="text-muted-foreground">Topics Covered</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {Math.round(filteredByReadTime.reduce((acc, p) => acc + p.readTime, 0) / filteredByReadTime.length)}
                  </div>
                  <p className="text-muted-foreground">Avg Read Time</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {filteredByReadTime.reduce((acc, p) => acc + p.readTime, 0)}
                  </div>
                  <p className="text-muted-foreground">Total Read Time</p>
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
