import Link from "next/link"
import { getRecipes } from "@/lib/notion/queries"
import { mapRecipeCard } from "@/lib/notion/recipe-data"

export default async function RecipesPage() {
  const recipes = await getRecipes()
  const mapped = recipes.map((recipe: any) => mapRecipeCard(recipe))

  return (
    <main className="recipes-page">
      <section className="recipes-hero">
        <p className="eyebrow">Recipe archive</p>
        <h1>Recipes</h1>
        <p className="recipes-intro">
          A growing collection of plant-based dishes, kitchen staples, and comfort meals.
        </p>
      </section>

      <section className="recipe-grid">
        {mapped.map((recipe: any) => (
          <Link key={recipe.id} href={`/recipes/${recipe.slug}`} className="recipe-card">
            <div className="recipe-card-media">
              {recipe.coverImage ? (
                <img src={recipe.coverImage} alt={recipe.title} className="recipe-card-image" />
              ) : (
                <div className="recipe-card-placeholder">Vegan Side Project</div>
              )}
            </div>

            <div className="recipe-card-body">
              <div className="recipe-card-meta">
                {recipe.course?.[0] ? <span>{recipe.course[0]}</span> : null}
                {recipe.prepTime ? <span>{recipe.prepTime}</span> : null}
              </div>
              <h2>{recipe.title}</h2>
              {recipe.excerpt ? <p>{recipe.excerpt}</p> : null}
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
