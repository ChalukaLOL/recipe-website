import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token); // Store JWT
        router.push('/');
      } else {
        alert(data.message || 'เข้าสู่ระบบล้มเหลว');
      }
    } catch (err) {
      console.error(err);
      alert('เกิดข้อผิดพลาด');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto mt-20 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">เข้าสู่ระบบ</h2>
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
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        เข้าสู่ระบบ
      </button>
      <p className="mt-4 text-sm">
        ยังไม่มีบัญชี? <a href="/register" className="text-blue-500 underline">สมัครสมาชิก</a>
      </p>
    </form>
  );
}
