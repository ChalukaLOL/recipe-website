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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-yellow-50 flex justify-center items-start py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center">เพิ่มสูตรอาหารใหม่ 🍳</h2>
        
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField id="title" label="ชื่อสูตรอาหาร" value={title} onChange={setTitle} required />
            <TextAreaField id="ingredients" label="ส่วนผสม" value={ingredients} onChange={setIngredients} required rows={4} />
            <TextAreaField id="instructions" label="วิธีทำ" value={instructions} onChange={setInstructions} required rows={6} />
            <InputField id="category" label="หมวดหมู่" value={category} onChange={setCategory} />
            <InputField id="image_url" label="URL รูปภาพ" type="url" value={image_url} onChange={setImageUrl} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-white bg-orange-500 hover:bg-orange-600 font-semibold rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 transition"
          >
            {loading ? 'กำลังเพิ่ม...' : 'เพิ่มสูตรอาหาร'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ✅ Reusable InputField component
function InputField({ id, label, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="appearance-none rounded-xl relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition sm:text-sm"
      />
    </div>
  );
}

// ✅ Reusable TextAreaField component
function TextAreaField({ id, label, value, onChange, required = false, rows = 4 }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="appearance-none rounded-xl relative block w-full px-4 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-orange-400 focus:border-orange-400 transition sm:text-sm"
      ></textarea>
    </div>
  );
}
