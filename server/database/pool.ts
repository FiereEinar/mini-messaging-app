import dotenv from 'dotenv';
import { Client, Pool } from 'pg';

dotenv.config();

const databaseName = process.env.PG_DB;
const client = new Client({
	host: 'localhost',
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	port: 5432,
});

// DEPRICATED, ALREADY USING PRISMA
async function setupDatabase() {
	try {
		await client.connect();

		// Check if the database exists
		const result = await client.query(
			`SELECT 1 FROM pg_database WHERE datname = $1`,
			[databaseName]
		);

		if (result.rowCount === 0) {
			// If the database does not exist, create it
			await client.query(`CREATE DATABASE ${databaseName}`);
			console.log(`Database "${databaseName}" created successfully.`);

			// Close the initial connection
			await client.end();

			// Reconnect to the new database to create tables
			const dbClient = new Client({
				host: 'localhost',
				user: process.env.PG_USER,
				password: process.env.PG_PASSWORD,
				database: databaseName,
				port: 5432,
			});

			await dbClient.connect();

			await dbClient.query(`
        CREATE TABLE messages (
          id SERIAL PRIMARY KEY,
          message TEXT NOT NULL,
          sender VARCHAR(255) NOT NULL,
          date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
			console.log('Table "messages" created successfully.');

			await dbClient.end();
		} else {
			console.log(`Database "${databaseName}" already exists.`);
		}
	} catch (err) {
		console.error('Error setting up the database', err);
	} finally {
		await client.end();
	}
}

// setupDatabase();

const pool = new Pool({
	host: 'localhost',
	user: process.env.PG_USER,
	database: process.env.PG_DB,
	password: process.env.PG_PASSWORD,
	port: 5432,
});

export default pool;
