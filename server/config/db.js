import 'core-js/stable';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import queries from '../queries/queries';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', () => {
  console.log('Error connecting to the database');
});

const users = `CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password VARCHAR(200),
  is_admin BOOLEAN DEFAULT false,
  registered TIMESTAMP DEFAULT CURRENT_DATE NOT NULL
);`;

const products = `CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    description VARCHAR(300),
    category TEXT NOT NULL,
    price FLOAT NOT NULL,
    image_url TEXT NOT NULL,
    in_stock BOOLEAN DEFAULT false
);`;

const carts = `CREATE TABLE IF NOT EXISTS carts (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT NOT NULL,
    products_id TEXT [] DEFAULT ARRAY[]::TEXT[],
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);`;

const checkUsers = 'SELECT * FROM users WHERE is_admin = true';


(async function init() {
  try {
    await pool.query(users);
    const { rowCount } = await pool.query(checkUsers);
    if (rowCount < 1) {
      const pass = 'qwerty';
      const hashedPassword = await bcrypt.hash(pass, 10);
      await pool.query(queries.regUser('Abuchi', 'Kingsley', 'abuchikings@mockshop.com', hashedPassword, true));
    }
    await pool.query(products);
    await pool.query(carts);
  } catch (error) {
    console.log(error);
  }
}());
