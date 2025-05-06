import { query } from '../../lib/db';
 
export default async function handler(req, res) {
  try {
    const recipes = await query('SELECT id, title, ingredients, instructions, category, image_url FROM recipes');
    res.status(200).json({ data: recipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
}