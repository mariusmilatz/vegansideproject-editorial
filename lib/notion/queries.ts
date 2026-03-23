import { getNotionClient } from "./client"

export async function getRecipes(): Promise<any[]> {
  const notion = getNotionClient()

  const databaseId = process.env.NOTION_RECIPES_DATABASE_ID

  if (!databaseId) {
    throw new Error("Missing NOTION_RECIPES_DATABASE_ID")
  }

  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Published",
      checkbox: {
        equals: true,
      },
    },
  })

  return response.results as any[]
}
