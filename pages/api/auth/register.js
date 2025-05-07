import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const filePath = path.join(process.cwd(), 'users.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Username and password are required' });

  let users = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    users = JSON.parse(data);
  }

  const userExists = users.find(user => user.username === username);
  if (userExists)
    return res.status(400).json({ message: 'Username already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'User registered successfully' });
}
