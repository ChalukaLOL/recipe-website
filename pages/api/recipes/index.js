let recipes = []; // ชั่วคราวในหน่วยความจำ (in-memory)

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { title, ingredients, instructions, category, image_url } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
    }

    const newRecipe = {
      id: Date.now().toString(),
      title,
      ingredients,
      instructions,
      category,
      image_url,
    };

    recipes.push(newRecipe);

    return res.status(201).json({ message: 'เพิ่มสูตรอาหารสำเร็จ', recipe: newRecipe });
  }

  if (req.method === 'GET') {
    return res.status(200).json({ data: recipes });
  }

  res.setHeader('Allow', ['POST', 'GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
