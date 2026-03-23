export function mapRecipeCard(page:any){
 const title = page.properties['Recipe Name']?.title?.[0]?.plain_text || 'Untitled'
 return {
  id: page.id,
  title,
  slug: title.toLowerCase().replace(/[^a-z0-9]+/g,'-'),
  excerpt: page.properties['Description']?.rich_text?.[0]?.plain_text || '',
  coverImage: page.properties['Title Image']?.files?.[0]?.external?.url || null
 }
}

export function mapRecipeDetail(page:any){
 const card = mapRecipeCard(page)
 return {
  ...card,
  ingredients: (page.properties['Ingredients']?.rich_text?.[0]?.plain_text || '').split('\n').filter(Boolean),
  instructions: (page.properties['Instructions']?.rich_text?.[0]?.plain_text || '').split('\n').filter(Boolean),
  tips: (page.properties['Tips & Notes']?.rich_text?.[0]?.plain_text || '').split('\n').filter(Boolean)
 }
}
