import fs from 'fs';
import path from 'path';

export default function Home({ recipes }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">สูตรอาหารทั้งหมด 🍳</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {recipes.length > 0 ? (
          recipes.map((recipe, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-sm text-gray-600">หมวดหมู่: {recipe.category}</p>
              {recipe.image_url && <img src={recipe.image_url} alt={recipe.title} className="w-full h-40 object-cover mt-3 rounded-md" />}
              <h2 className="text-2xl font-semibold mb-2">ส่วนผสม</h2>
              <p className="mt-3 text-gray-700">{recipe.ingredients}</p>
              <h2 className="text-2xl font-semibold mb-2">วิธีทำ</h2>
              <p className="mt-2 text-gray-700">{recipe.instructions}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">ไม่มีสูตรอาหารที่จะแสดง</p>
        )}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  let recipes = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    recipes = JSON.parse(fileContent);
  }

  return {
    props: {
      recipes: recipes.reverse(), 
    },
  };
}
