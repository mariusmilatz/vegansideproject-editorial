import Link from "next/link"
import { getRecipes } from "@/lib/notion/queries"
import { mapRecipeCard } from "@/lib/notion/recipe-data"

export default async function RecipesPage() {
  const recipes = await getRecipes()
  const mapped = recipes.map((recipe: any) => mapRecipeCard(recipe))

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Recipes</h1>

      <div style={{ display: "grid", gap: "16px" }}>
        {mapped.map((recipe: any) => (
          <Link
            key={recipe.id}
            href={`/recipes/${recipe.slug}`}
            style={{ padding: "16px", border: "1px solid #ddd", color: "inherit", textDecoration: "none" }}
          >
            <h2>{recipe.title}</h2>
            {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
          </Link>
        ))}
      </div>
    </main>
  )
}
