import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import { BlogPost, demoBlogPosts } from "@/src/lib/demo-data"
import Image from "next/image"
import Link from "next/link"

export function BlogSection({posts}:{posts:BlogPost[]}) {
console.log(posts)
  const publishedPosts = posts.filter((post) => post.status === "published")
 console.log(publishedPosts)
  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 font-sans">Latest Blog Posts</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-serif">
            Insights and thoughts on machine learning, healthcare AI, and academic research.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {publishedPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                <Card className="bg-card border-border overflow-hidden h-full">
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

                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="p-0 h-auto font-medium text-primary">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 -translate-x-12" />
          <CarouselNext className="right-0 translate-x-12" />
        </Carousel>

        <div className="text-center mt-12">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              View All Posts
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
