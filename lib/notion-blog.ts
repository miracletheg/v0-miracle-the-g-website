export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  publishedAt: string | null
  coverImageUrl: string | null
  category: string | null
  readTime: string | null
  featured: boolean
}

async function queryNotionDatabase(databaseId: string, filter?: any, sorts?: any) {
  const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NOTION_SECRET}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      filter,
      sorts,
    }),
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

async function getNotionPageContent(pageId: string) {
  const response = await fetch(`https://api.notion.com/v1/blocks/${pageId}/children`, {
    headers: {
      Authorization: `Bearer ${process.env.NOTION_SECRET}`,
      "Notion-Version": "2022-06-28",
    },
  })

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

function blocksToMarkdown(blocks: any[]): string {
  return blocks
    .map((block) => {
      const type = block.type
      const content = block[type]

      switch (type) {
        case "paragraph":
          return content.rich_text?.map((t: any) => t.plain_text).join("") || ""
        case "heading_1":
          return `# ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "heading_2":
          return `## ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "heading_3":
          return `### ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "bulleted_list_item":
          return `- ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "numbered_list_item":
          return `1. ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "quote":
          return `> ${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}`
        case "code":
          return `\`\`\`${content.language || ""}\n${content.rich_text?.map((t: any) => t.plain_text).join("") || ""}\n\`\`\``
        default:
          return ""
      }
    })
    .filter((line) => line)
    .join("\n\n")
}

function extractDatabaseId(urlOrId: string): string {
  // If it's already just an ID (32 chars, alphanumeric), return it
  if (/^[a-f0-9]{32}$/i.test(urlOrId.replace(/-/g, ""))) {
    return urlOrId.replace(/-/g, "")
  }

  // Extract from full Notion URL
  // URL format: https://www.notion.so/{database-id}?v={view-id}
  const match = urlOrId.match(/([a-f0-9]{32})/i)
  if (match) {
    return match[1]
  }

  // If no match, return as-is and let it fail with better error
  return urlOrId
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const databaseId = process.env.NOTION_BLOG_DB_ID

  if (!databaseId) {
    console.error("[v0] NOTION_BLOG_DB_ID is not set")
    return []
  }

  const cleanDatabaseId = extractDatabaseId(databaseId)
  console.log("[v0] Using database ID:", cleanDatabaseId)

  try {
    const data = await queryNotionDatabase(
      cleanDatabaseId,
      {
        property: "Status",
        status: {
          equals: "Published",
        },
      },
      [
        {
          property: "Publish Date",
          direction: "descending",
        },
      ],
    )

    console.log("[v0] Found", data.results.length, "published blog posts")

    return data.results.map((page: any) => {
      const properties = page.properties

      const title = properties.Title?.title?.[0]?.plain_text || "Untitled"

      const slug =
        properties.Slug?.rich_text?.[0]?.plain_text ||
        title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "")

      const excerpt = properties["Content Brief"]?.rich_text?.[0]?.plain_text || null

      const publishedAt = properties["Publish Date"]?.date?.start || page.created_time || null

      let coverImageUrl = null
      if (properties.Cover?.files?.[0]) {
        const file = properties.Cover.files[0]
        coverImageUrl = file.type === "external" ? file.external.url : file.file.url
      } else if (page.cover) {
        coverImageUrl = page.cover.type === "external" ? page.cover.external.url : page.cover.file.url
      }

      const category = properties.Category?.select?.name || null
      const readTime = properties["Read Time"]?.rich_text?.[0]?.plain_text || null
      const featured = properties.Featured?.checkbox || false

      return {
        id: page.id,
        title,
        slug,
        excerpt,
        publishedAt,
        coverImageUrl,
        category,
        readTime,
        featured,
      }
    })
  } catch (error) {
    console.error("[v0] Error fetching blog posts from Notion:", error)
    return []
  }
}

export async function getBlogPostBySlug(slug: string): Promise<(BlogPost & { content: string }) | null> {
  const databaseId = process.env.NOTION_BLOG_DB_ID

  if (!databaseId) {
    console.error("[v0] NOTION_BLOG_DB_ID is not set")
    return null
  }

  const cleanDatabaseId = extractDatabaseId(databaseId)

  try {
    const data = await queryNotionDatabase(cleanDatabaseId, {
      property: "Status",
      status: {
        equals: "Published",
      },
    })

    // Find the post that matches the slug
    const matchingPage = data.results.find((page: any) => {
      const title = page.properties.Title?.title?.[0]?.plain_text || "Untitled"
      const generatedSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "")
      return generatedSlug === slug
    })

    if (!matchingPage) {
      return null
    }

    const page: any = matchingPage
    const properties = page.properties

    const title = properties.Title?.title?.[0]?.plain_text || "Untitled"
    const excerpt = properties["Content Brief"]?.rich_text?.[0]?.plain_text || null
    const publishedAt = properties["Publish Date"]?.date?.start || page.created_time || null

    const category = properties.Category?.select?.name || null
    const readTime = properties["Read Time"]?.rich_text?.[0]?.plain_text || null
    const featured = properties.Featured?.checkbox || false

    let coverImageUrl = null
    if (properties.Cover?.files?.[0]) {
      const file = properties.Cover.files[0]
      coverImageUrl = file.type === "external" ? file.external.url : file.file.url
    } else if (page.cover) {
      coverImageUrl = page.cover.type === "external" ? page.cover.external.url : page.cover.file.url
    }

    // Fetch the page content
    const blocksData = await getNotionPageContent(page.id)
    const content = blocksToMarkdown(blocksData.results)

    return {
      id: page.id,
      title,
      slug,
      excerpt,
      publishedAt,
      coverImageUrl,
      category,
      readTime,
      featured,
      content,
    }
  } catch (error) {
    console.error("[v0] Error fetching blog post by slug:", error)
    return null
  }
}
