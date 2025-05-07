import Link from 'next/link';

export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-300">
      <img
        src={recipe.image || '/default.jpg'}
        alt={recipe.title}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{recipe.description || 'ไม่มีคำอธิบาย'}</p>
        <Link href={`/recipes/${recipe.id}`}>
          <span className="text-blue-600 font-medium hover:underline">ดูเพิ่มเติม</span>
        </Link>
      </div>
    </div>
  );
}
