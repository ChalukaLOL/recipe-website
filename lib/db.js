// lib/db.js
import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL, // ใช้ URI เดียว เช่น mysql://user:pass@localhost:3306/dbname
      waitForConnections: true,
      connectionLimit: 10,
    });
  }
  return pool;
}

export async function query(sql, params) {
  const pool = getPool();
  const [results] = await pool.execute(sql, params);
  return results;
}
