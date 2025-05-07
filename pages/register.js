import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert('สมัครสมาชิกสำเร็จ');
        router.push('/login');
      } else {
        alert(data.message || 'สมัครสมาชิกล้มเหลว');
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาด');
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto mt-20 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">สมัครสมาชิก</h2>
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="block w-full p-2 mb-3 border rounded"
        required
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full p-2 mb-3 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
        สมัครสมาชิก
      </button>
      <p className="mt-4 text-sm">
        มีบัญชีอยู่แล้ว? <a href="/login" className="text-blue-500 underline">เข้าสู่ระบบ</a>
      </p>
    </form>
  );
}
