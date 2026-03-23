import { Client } from "@notionhq/client"

export function getNotionClient() {
  const notionKey = process.env.NOTION_KEY

  if (!notionKey) {
    throw new Error("Missing NOTION_KEY environment variable")
  }

  return new Client({ auth: notionKey })
}
