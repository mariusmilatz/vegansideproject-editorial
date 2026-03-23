export type Recipe = {
  id: string
  title: string
  slug: string
  published: boolean
  featured: boolean
  coverImage: string | null
  excerpt: string | null
  cuisine: string[]
  course: string[]
  prepTime: string | null
  cookTime: string | null
  servings: string | null
  ingredients: string[]
  instructions: string[]
  tips: string[]
  createdAt: string | null
}

export type EditorialSection = {
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  coverImage: string | null
  tags: string[]
  date: string | null
}
