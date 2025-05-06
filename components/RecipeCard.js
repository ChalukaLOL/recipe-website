// components/RecipeCard.js
import Link from 'next/link';

export default function RecipeCard({ recipe }) {
    console.log("Props recipe in RecipeCard:", recipe);
  return (
    <div className="border rounded-md shadow-md p-4">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-md mb-2"
      />
      <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
      <Link href={`/recipes/${recipe.id}`}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          ดูรายละเอียด
        </button>
      </Link>
    </div>
  );
}
