import Link from "next/link"
import { getRecipes } from "@/lib/notion/queries"
import { mapRecipeCard } from "@/lib/notion/recipe-data"

export default async function HomePage() {
  const recipes = await getRecipes()
  const mapped = recipes.map((recipe: any) => mapRecipeCard(recipe)).slice(0, 4)

  return (
    <main className="home-page">
      <section className="hero-section">
        <p className="eyebrow">Editorial recipe archive</p>
        <h1>Vegan Side Project</h1>
        <p className="hero-copy">
          A calmer, cleaner home for recipes, meal plans, and kitchen notes.
        </p>
        <p className="hero-actions"><Link href="/recipes">View all recipes</Link></p>
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
