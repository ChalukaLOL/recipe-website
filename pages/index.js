import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';

export default function Home({ recipes }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Head>
        <title>สุดยอดเว็บไซต์สูตรอาหาร</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-800 shadow-md py-6 border-b border-gray-700">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-orange-500 hover:text-orange-400 transition duration-300">
              ครัวอร่อยเด็ด
            </h1>
          </Link>
          <div className="flex gap-3">
            <Link href="/add-recipe">
              <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 shadow-sm border border-green-600">
                ➕ เพิ่มสูตรใหม่
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <input
          type="text"
          placeholder="ค้นหาสูตรอาหารที่คุณชื่นชอบ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-sm h-48 object-cover mt-3 rounded-md mx-auto"/>

        <h2 className="text-2xl font-semibold text-gray-300 mb-4 border-b-2 border-orange-400 pb-2">สูตรอาหารแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-white text-gray-800 p-4 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold mb-2">{recipe.title}</h2>
                <Link href={`/recipes/${recipe.id}`}>
                  <button className="mt-4 w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300">
                    ดูรายละเอียด
                  </button>
                </Link>
                <p className="text-sm text-gray-600">หมวดหมู่: {recipe.category}</p>
                {recipe.image_url && (
  <img
    src={recipe.image_url}
    alt={recipe.title}
    className="w-full max-w-[300px] h-[200px] object-cover mt-3 rounded-md mx-auto"
  />
)}
               
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">ไม่พบสูตรอาหารที่ตรงกับการค้นหาของคุณ</p>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 py-4 text-center text-gray-500 text-sm mt-8 border-t border-gray-700">
        <p>&copy; 2025 เว็บไซต์สูตรอาหาร. สงวนลิขสิทธิ์.</p>
      </footer>
    </div>
  );
}

export async function getServerSideProps() {
  const filePath = path.join(process.cwd(), 'data', 'recipes.json');
  let recipes = [];

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    recipes = JSON.parse(fileContent);

    recipes.sort((a, b) => a.title.localeCompare(b.title));

    recipes = recipes.map((recipe, index) => ({
      ...recipe,
      id: recipe.id ? recipe.id : index + 1
    }));
  }

  return {
    props: {
      recipes,
    },
  };
}