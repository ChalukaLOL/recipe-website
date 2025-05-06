import mysql from 'mysql2/promise';
 
const pool = mysql.createPool(process.env.DATABASE_URL);

export async function query(sql, params) {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
}