// lib/db.js
import mysql from 'mysql2/promise';
import { parse } from 'url';

let pool;

export function getPool() {
  if (!pool) {
    const dbUrl = new URL(process.env.DATABASE_URL);
    pool = mysql.createPool({
      host: dbUrl.hostname,
      user: dbUrl.username,
      password: dbUrl.password,
      database: dbUrl.pathname.replace('/', ''),
      port: parseInt(dbUrl.port || '3306'),
      ssl: {
        rejectUnauthorized: true,
      },
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
