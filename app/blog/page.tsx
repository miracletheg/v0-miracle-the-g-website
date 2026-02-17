import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { CosmicBackground } from "@/components/cosmic-background"
import { BlogHero } from "@/components/blog/blog-hero"
import { BlogGrid } from "@/components/blog/blog-grid"
import { getBlogPosts } from "@/lib/notion-blog"

export const metadata = {
  title: "Blog | Miracle The G",
  description:
    "Explore articles on spiritual healing, Reiki practices, intuitive development, and transformative wisdom.",
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <main className="min-h-screen">
      <CosmicBackground />
      <Navigation />
      <BlogHero />
      <BlogGrid posts={posts} />
      <Footer />
    </main>
  )
}
