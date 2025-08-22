import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { demoBlogPosts } from "@/src/lib/demo-data"
import Image from "next/image"

export function BlogSection() {
  const publishedPosts = demoBlogPosts.filter((post) => post.status === "published")

  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">
            Insights and thoughts on machine learning, healthcare AI, and academic research.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {publishedPosts.map((post) => (
            <Card key={post.id} className="bg-card border-border overflow-hidden">
              {post.imageUrl && (
                <div className="aspect-video relative">
                  <Image src={post.imageUrl || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                </div>
              )}

              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                </div>

                <CardTitle className="text-xl font-semibold text-foreground font-sans">{post.title}</CardTitle>
                <CardDescription className="font-serif">{post.excerpt}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <Button variant="ghost" className="p-0 h-auto font-medium text-primary">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  )
}
