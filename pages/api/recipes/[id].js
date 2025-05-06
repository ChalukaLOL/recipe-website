// pages/api/recipes/[id].js
import { query } from '../../lib/db';
 
export default async function handler(req, res) {
  const { id } = req.query;
 
  try {
    const recipe = await query('SELECT * FROM recipes WHERE id = ?', [id]);
 
    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
 
    res.status(200).json(recipe[0]);
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    res.status(500).json({ error: `Failed to fetch recipe with ID ${id}` });
  }
}