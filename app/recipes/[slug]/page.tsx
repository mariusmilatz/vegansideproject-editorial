import { getRecipes } from "@/lib/notion/queries"
import { mapRecipeDetail } from "@/lib/notion/recipe-data"

export default async function RecipeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipes = await getRecipes()

  const mapped = recipes.map((recipe: any) => mapRecipeDetail(recipe))

  const recipe = mapped.find((r: any) => r.slug === slug)

  if (!recipe) {
    return <div style={{ padding: 40 }}>Recipe not found</div>
  }

  return (
    <main style={{ padding: "40px", maxWidth: "800px" }}>
      {recipe.coverImage && (
        <img src={recipe.coverImage} alt={recipe.title} style={{ width: "100%", marginBottom: 24 }} />
      )}

      <h1 style={{ fontSize: 36, marginBottom: 16 }}>{recipe.title}</h1>

      {recipe.excerpt && <p style={{ marginBottom: 24 }}>{recipe.excerpt}</p>}

      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ul>

      <h2 style={{ marginTop: 32 }}>Instructions</h2>
      <ol>
        {recipe.instructions.map((item: string, i: number) => (
          <li key={i}>{item}</li>
        ))}
      </ol>

      {recipe.tips.length > 0 && (
        <>
          <h2 style={{ marginTop: 32 }}>Notes</h2>
          <ul>
            {recipe.tips.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
