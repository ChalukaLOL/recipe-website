import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddRecipePage() {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [category, setCategory] = useState('');
  const [image_url, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/add-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, ingredients, instructions, category, image_url }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('เพิ่มสูตรอาหารสำเร็จ!');
        router.push('/');
      } else {
        setError(data.error || 'เกิดข้อผิดพลาดในการเพิ่มสูตรอาหาร');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">เพิ่มสูตรอาหารใหม่</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">ชื่อสูตรอาหาร:</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ingredients" className="block text-gray-700 text-sm font-bold mb-2">ส่วนผสม:</label>
          <textarea
            id="ingredients"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="instructions" className="block text-gray-700 text-sm font-bold mb-2">วิธีทำ:</label>
          <textarea
            id="instructions"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows="6"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">หมวดหมู่:</label>
          <input
            type="text"
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image_url" className="block text-gray-700 text-sm font-bold mb-2">URL รูปภาพ:</label>
          <input
            type="url"
            id="image_url"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'กำลังเพิ่ม...' : 'เพิ่มสูตรอาหาร'}
        </button>
      </form>
    </div>
  );
}
