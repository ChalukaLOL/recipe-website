// pages/recipes/[id].js
import Head from 'next/head';
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