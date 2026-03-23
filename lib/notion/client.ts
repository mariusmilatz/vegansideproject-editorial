import { Client } from "@notionhq/client"

const notionKey = process.env.NOTION_KEY

export function getNotionClient() {
  if (!notionKey) {
    throw new Error("Missing NOTION_KEY environment variable")
  }

  return new Client({ auth: notionKey })
}
