import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const filePath = path.join(process.cwd(), 'users.json');
const SECRET_KEY = 'your-secret-key'; // ควรเก็บใน ENV

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  if (!fs.existsSync(filePath)) {
    return res.status(401).json({ message: 'User not found' });
  }

  const data = fs.readFileSync(filePath);
  const users = JSON.parse(data);

  const user = users.find(u => u.username === username);
  if (!user)
    return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({ message: 'Login successful', token });
}
