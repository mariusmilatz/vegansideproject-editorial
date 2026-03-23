import { getRecipes } from "@/lib/notion/queries"
import { mapRecipeDetail } from "@/lib/notion/recipe-data"

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const recipes = await getRecipes()
  const mapped = recipes.map((recipe: any) => mapRecipeDetail(recipe))
  const recipe = mapped.find((item: any) => item.slug === slug)

  if (!recipe) {
    return <main style={{ padding: 32 }}>Recipe not found.</main>
  }

  return (
    <main className="recipe-detail-page">
      <article className="recipe-detail">
        <div className="recipe-detail-media">
          {recipe.coverImage ? (
            <img src={recipe.coverImage} alt={recipe.title} className="recipe-detail-image" />
          ) : (
            <div className="recipe-card-placeholder">Vegan Side Project</div>
          )}
        </div>

        <div className="recipe-detail-body">
          <p className="eyebrow">Recipe</p>
          <h1>{recipe.title}</h1>
          {recipe.excerpt ? <p className="recipe-detail-excerpt">{recipe.excerpt}</p> : null}

          <section className="recipe-detail-section">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="recipe-detail-section">
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ol>
          </section>

          {recipe.tips.length ? (
            <section className="recipe-detail-section">
              <h2>Notes</h2>
              <ul>
                {recipe.tips.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </article>
    </main>
  )
}
