import Image from 'next/image';
import Link from 'next/link';


export default function RecipeCard({ recipe }) {
  return (
    <div className="bg-gray-800 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-700">
      {/* รูปภาพเมนู */}
      {recipe.image && (
        <div className="relative w-full h-48">
          <Image
            src={recipe.image}
            alt={recipe.title}
            fill
            className="object-cover rounded-t-2xl"
          />
        </div>
      )}

      {/* เนื้อหาด้านล่าง */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-orange-500 mb-2">
          {recipe.title}
        </h2>

        <Link
          href={`/recipes/${recipe.id}`}
          className="inline-block px-4 py-2 bg-orange-500 text-white text-sm rounded-md hover:bg-orange-600 transition-colors shadow-sm"
        >
          ดูสูตรอาหาร
        </Link>
      </div>
    </div>
  );
}