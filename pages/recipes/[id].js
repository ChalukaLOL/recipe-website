import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function RecipeDetails({ recipe }) {
  if (!recipe) {
    return <div className="min-h-screen flex items-center justify-center text-white">ไม่พบสูตรอาหารที่คุณต้องการ</div>;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
        {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="w-full h-64 object-cover rounded-md mb-4" />}
        <p className="text-sm text-gray-400">หมวดหมู่: {recipe.category}</p>

        <h2 className="text-2xl font-semibold mt-4">ส่วนผสม</h2>
        <p className="mt-2 whitespace-pre-line">{recipe.ingredients}</p>

        <h2 className="text-2xl font-semibold mt-4">วิธีทำ</h2>
        <p className="mt-2 whitespace-pre-line">{recipe.instructions}</p>

        <Link href="/" className="inline-block mt-6 text-orange-400 hover:text-orange-300">⬅️ กลับไปที่หน้าหลัก</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  let recipes = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    recipes = JSON.parse(fileContent);
  }

  const recipe = recipes.find((r) => r.id.toString() === params.id) || null;

  return {
    props: {
      recipe,
    },
  };
}