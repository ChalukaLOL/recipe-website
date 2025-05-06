import Head from 'next/head';
import RecipeCard from '../components/RecipeCard';

export default function Home({ recipes }) {
  console.log("Props recipes in Home:", recipes);
  return (
    <div>
      <Head>
        <title>เว็บไซต์สูตรอาหาร</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">สูตรอาหารยอดนิยม</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(recipes) ? (
            recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <p className="text-center col-span-full">ไม่พบข้อมูลสูตรอาหาร</p>
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

