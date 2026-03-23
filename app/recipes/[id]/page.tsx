import { getRecipes } from "../../../lib/notion/queries"
import { mapRecipeDetail } from "../../../lib/notion/recipe-data"

export default async function RecipePage({ params }: { params: { id: string } }) {
  const recipes = await getRecipes()
  const mapped = recipes.map(mapRecipeDetail)
  const recipe = mapped.find((r) => r.id === params.id)

  if (!recipe) return <div>Recipe not found</div>

  return (
    <main style={{ padding: 40 }}>
      <h1>{recipe.title}</h1>
      {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>
      <h2>Instructions</h2>
      <ol>
        {recipe.instructions.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ol>
    </main>
  )
}
