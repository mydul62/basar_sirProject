import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { demoBlogPosts } from "@/src/lib/demo-data"
import Image from "next/image"
import Link from "next/link"

export default function BlogPage() {
  const publishedPosts = demoBlogPosts.filter((post) => post.status === "published")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 to-secondary/5 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 font-sans">Blog</h1>
          <p className="text-lg text-muted-foreground font-serif">
            Insights and thoughts on machine learning, healthcare AI, and academic research
          </p>
        </div>
      </div>

      {/* Blog posts grid */}
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedPosts.map((post) => (
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

        {/* Empty state if no posts */}
        {publishedPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-foreground mb-2">No posts yet</h3>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: "Blog - Samrat Kumar Dey",
  description: "Insights and thoughts on machine learning, healthcare AI, and academic research",
}
