type NotionProperty = any

type NotionPage = {
  id: string
  properties: Record<string, NotionProperty>
}

function getTitle(property?: NotionProperty): string {
  return property?.title?.map((item: any) => item.plain_text).join("") || "Untitled"
}

function getRichText(property?: NotionProperty): string {
  return property?.rich_text?.map((item: any) => item.plain_text).join("") || ""
}

function getCheckbox(property?: NotionProperty): boolean {
  return Boolean(property?.checkbox)
}

function getMultiValue(property?: NotionProperty): string[] {
  if (property?.multi_select) {
    return property.multi_select.map((item: any) => item.name)
  }

  const raw = getRichText(property)
  if (!raw) return []

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
}

function getTextList(property?: NotionProperty): string[] {
  const raw = getRichText(property)
  if (!raw) return []

  return raw
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean)
}

function getFileUrl(property?: NotionProperty): string | null {
  const file = property?.files?.[0]
  if (!file) return null

  if (file.type === "external") return file.external?.url || null
  if (file.type === "file") return file.file?.url || null
  return null
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function mapRecipeCard(page: NotionPage) {
  const title = getTitle(page.properties["Recipe Name"])

  return {
    id: page.id,
    title,
    slug: slugify(title),
    excerpt: getRichText(page.properties["Description"]),
    coverImage: getFileUrl(page.properties["Title Image"]),
    cuisine: getMultiValue(page.properties["Cuisine"]),
    course: getMultiValue(page.properties["Course"]),
    prepTime: getRichText(page.properties["Prep Time"]),
    cookTime: getRichText(page.properties["Cook Time"]),
    servings: getRichText(page.properties["Serves"]),
    featured: getCheckbox(page.properties["favourites"]),
  }
}

export function mapRecipeDetail(page: NotionPage) {
  const card = mapRecipeCard(page)

  return {
    ...card,
    ingredients: getTextList(page.properties["Ingredients"]),
    instructions: getTextList(page.properties["Instructions"]),
    tips: getTextList(page.properties["Tips & Notes"]),
  }
}
