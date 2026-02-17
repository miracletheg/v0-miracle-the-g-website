"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/notion-blog"

interface BlogGridProps {
  posts: BlogPost[]
}

export function BlogGrid({ posts }: BlogGridProps) {
  const [filter, setFilter] = useState("All")

  const categories = ["All", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))]

  const filteredPosts = filter === "All" ? posts : posts.filter((post) => post.category === filter)

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <section className="py-12 pb-32 relative">
      <div className="container mx-auto px-4">
        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === category
                  ? "bg-gold text-cosmic-deep font-medium"
                  : "bg-card/50 text-muted-foreground hover:text-foreground border border-border hover:border-gold/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-gold/50 transition-all">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={post.coverImageUrl || "/placeholder.svg?height=400&width=600"}
                        alt={`Cover image for blog post: ${post.title}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-gold text-cosmic-deep text-xs font-medium px-3 py-1 rounded-full">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      {post.category && <span className="text-gold text-sm">{post.category}</span>}
                      <h2 className="font-serif text-xl md:text-2xl text-foreground mt-2 mb-3 group-hover:text-gold transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {post.publishedAt && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        )}
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}

        {/* Regular Posts */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-gold/50 transition-all h-full">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={post.coverImageUrl || "/placeholder.svg?height=400&width=600"}
                      alt={`Cover image for blog post: ${post.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    {post.category && <span className="text-gold text-sm">{post.category}</span>}
                    <h3 className="font-serif text-lg text-foreground mt-2 mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    {post.excerpt && <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {post.publishedAt && (
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-gold group-hover:underline">
                        Read More
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
