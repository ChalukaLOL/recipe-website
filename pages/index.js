import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';

export default function Home({ recipes }) {
  console.log("Props recipes in Home:", recipes);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 text-gray-800">
      <Head>
        <title>เว็บไซต์สูตรอาหาร</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-white shadow-md py-6">
        <h1 className="text-4xl font-bold text-center text-orange-600 drop-shadow-sm">
          สูตรอาหารยอดนิยม
        </h1>
      </header>

      <main className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(recipes) && recipes.length > 0 ? (
            recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <RecipeCard recipe={recipe} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg text-gray-600">
              ไม่พบข้อมูลสูตรอาหาร
            </p>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        © 2025 เว็บไซต์สูตรอาหาร - พัฒนาโดยคุณ
      </footer>
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

