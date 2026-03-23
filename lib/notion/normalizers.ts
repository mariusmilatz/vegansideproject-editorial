export function normalizeRecipe(row:any){
 return {
  title: row['Recipe Name'],
  slug: row['Recipe Name'].toLowerCase().replace(/[^a-z0-9]+/g,'-'),
  published: row['Published']===true,
  coverImage: row['Title Image']||null,
  excerpt: row['Description']||null,
  ingredients: (row['Ingredients']||'').split('\n').filter(Boolean),
  instructions: (row['Instructions']||'').split('\n').filter(Boolean)
 }
}
