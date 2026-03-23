import Link from "next/link"
import { getRecipes } from "../lib/notion/queries"
import { mapRecipeCard } from "../lib/notion/recipe-data"

function normalize(id: string) {
  return id.replace(/-/g, "")
}

export default async function HomePage() {
  const recipes = await getRecipes()
  const mapped = recipes.map(mapRecipeCard)

  return (
    <main style={{ padding: 40 }}>
      <h1>Vegan Side Project</h1>

      <p>
        <Link href="/recipes">View all recipes</Link>
      </p>

      {mapped.map((recipe) => (
        <div key={recipe.id}>
          <Link href={`/recipes/${normalize(recipe.id)}`}>
            {recipe.title}
          </Link>
        </div>
      ))}
    </main>
  )
}
