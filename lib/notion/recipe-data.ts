function getTitle(page: any): string {
  return page.properties["Recipe Name"]?.title?.[0]?.plain_text || "Untitled"
}

function getText(property: any): string {
  return property?.rich_text?.map((item: any) => item.plain_text).join("") || ""
}

function getFileUrl(property: any): string | null {
  const file = property?.files?.[0]
  if (!file) return null
  if (file.type === "external") return file.external?.url || null
  if (file.type === "file") return file.file?.url || null
  return null
}

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}

export function mapRecipeCard(page: any) {
  const title = getTitle(page)

  return {
    id: page.id,
    title,
    slug: slugify(title),
    excerpt: getText(page.properties["Description"]),
    coverImage: getFileUrl(page.properties["Title Image"]),
    course: getText(page.properties["Course"]).split(",").map((item: string) => item.trim()).filter(Boolean),
    prepTime: getText(page.properties["Prep Time"]),
  }
}

export function mapRecipeDetail(page: any) {
  const card = mapRecipeCard(page)

  return {
    ...card,
    ingredients: getText(page.properties["Ingredients"]).split("\n").map((item: string) => item.trim()).filter(Boolean),
    instructions: getText(page.properties["Instructions"]).split("\n").map((item: string) => item.trim()).filter(Boolean),
    tips: getText(page.properties["Tips & Notes"]).split("\n").map((item: string) => item.trim()).filter(Boolean),
  }
}
