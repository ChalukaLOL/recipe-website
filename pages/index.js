import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('/api/recipes');
        const data = await res.json();
        setRecipes(data.data || []);
      } catch (err) {
        console.error('โหลดสูตรอาหารล้มเหลว', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return (
    <div>
      <Head>
        <title>เว็บไซต์สูตรอาหาร</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-orange-600">สูตรอาหารยอดนิยม</h1>
          <div className="flex gap-3">
            <Link href="/add-recipe">
              <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
                ➕ เพิ่มสูตรอาหาร
              </button>
            </Link>
          </div>
        </div>

        {/* ช่องค้นหา */}
        <input
          type="text"
          placeholder="ค้นหาสูตรอาหาร..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded mb-6"
        />

        {/* รายการสูตรอาหาร */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full">ไม่พบสูตรอาหาร</p>
          )}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes`);
    const contentType = res.headers.get('content-type');
    if (!res.ok || !contentType?.includes('application/json')) {
      const errorText = await res.text();
      console.error('API error response:', errorText);
      throw new Error('Invalid API response');
    }

    const data = await res.json();

    return {
      props: {
        recipes: data.data ?? [],
      },
    };
  } catch (error) {
    console.error('getServerSideProps error:', error);
    return {
      props: {
        recipes: [],
      },
    };
  }
}
