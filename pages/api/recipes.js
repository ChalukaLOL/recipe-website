import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, ingredients, instructions, category, image_url } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
    }

    try {
      const filePath = path.join(process.cwd(), 'data', 'recipes.json');
      let recipes = [];

      if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
        fs.mkdirSync(path.join(process.cwd(), 'data'));
      }

      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        recipes = JSON.parse(fileContent);
      }

      const newRecipe = {
        id: Date.now(),
        title,
        ingredients,
        instructions,
        category: category || 'อื่นๆ',
        image_url: image_url || '',
        createdAt: new Date().toISOString()
      };
      recipes.push(newRecipe);

      fs.writeFileSync(filePath, JSON.stringify(recipes, null, 2));

      return res.status(200).json({ message: 'บันทึกสำเร็จ' });
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเขียนไฟล์:', error);
      return res.status(500).json({ error: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
