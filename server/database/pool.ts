import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const pool = new Pool({
	host: 'localhost',
	user: process.env.PG_USER,
	database: process.env.PG_DB,
	password: process.env.PG_PASSWORD,
	port: 5432,
});

export default pool;
