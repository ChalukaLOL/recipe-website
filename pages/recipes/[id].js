// pages/recipes/[id].js
import Head from 'next/head';
import Link from 'next/link'; // Import Link component for navigation
import RecipeDetail from '../../components/RecipeDetail';

export default function RecipePage({ recipe }) {
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{recipe.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{recipe.title}</h1>
          <Link href={`/recipes/EditRecipeButton/${recipe.id}`} legacyBehavior>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              แก้ไข
            </button>
          </Link>
        </div>
        <RecipeDetail recipe={recipe} />
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recipes/${id}`);
  const recipe = await res.json();

  return {
    props: {
      recipe,
    },
  };
}