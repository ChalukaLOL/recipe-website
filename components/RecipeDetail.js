// components/RecipeDetail.js
import React from 'react';
 
export default function RecipeDetail({ recipe }) {
  if (!recipe) {
    return <div>Loading...</div>;
  }
 
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
      <img src={recipe.image_url} alt={recipe.title} className="w-full h-96 object-cover rounded-md mb-4" />
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">ส่วนผสม:</h2>
        <p className="whitespace-pre-line">{recipe.ingredients}</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">วิธีทำ:</h2>
        <p className="whitespace-pre-line">{recipe.instructions}</p>
      </div>
    </div>
  );
}