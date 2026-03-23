import { getRecipes } from "../../lib/notion/queries"
import { mapRecipeCard } from "../../lib/notion/recipe-data"
import Link from "next/link"

export default async function RecipesPage() {
  const recipes = await getRecipes()
  const mapped = recipes.map(mapRecipeCard)

  return (
    <main style={{ padding: 40 }}>
      <h1>All Recipes</h1>
      {mapped.map((recipe) => (
        <div key={recipe.id}>
          <Link href={`/recipes/${recipe.slug}`}>
            {recipe.title}
          </Link>
        </div>
      ))}
    </main>
  )
}
