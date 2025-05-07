import Link from 'next/link';
import RecipeCard from '../components/RecipeCard';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    } else {
      fetchRecipes();
    }
  }, []);

  const fetchRecipes = async () => {
    try {
      const res = await fetch('/api/recipes');
      const data = await res.json();
      setRecipes(data.data || []);
    } catch (err) {
      console.error('โหลดสูตรอาหารล้มเหลว', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

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
        <div className="mb-6 p-4 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
          <input
            type="text"
            placeholder="ค้นหาสูตรอาหารที่คุณชื่นชอบ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-300 mb-4 border-b-2 border-orange-400 pb-2">สูตรอาหารแนะนำ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="text-center col-span-full p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
              <p className="text-gray-400">ไม่พบสูตรอาหารที่ตรงกับการค้นหาของคุณ</p>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-gray-800 py-4 text-center text-gray-500 text-sm mt-8 border-t border-gray-700">
        <p>&copy; 2025 เว็บไซต์สูตรอาหาร. สงวนลิขสิทธิ์.</p>
      </footer>
    </div>
  );
}