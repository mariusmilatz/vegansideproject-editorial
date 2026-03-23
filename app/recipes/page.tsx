import { getRecipes } from "@/lib/notion/queries"

export default async function RecipesPage() {
  const recipes = await getRecipes()

  return (
    <main style={{ padding: "40px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Recipes</h1>

      <div style={{ display: "grid", gap: "16px" }}>
        {recipes.map((recipe: any) => {
          const title = recipe.properties["Recipe Name"]?.title?.[0]?.plain_text || "Untitled"

          return (
            <div key={recipe.id} style={{ padding: "16px", border: "1px solid #ddd" }}>
              <h2>{title}</h2>
            </div>
          )
        })}
      </div>
    </main>
  )
}
