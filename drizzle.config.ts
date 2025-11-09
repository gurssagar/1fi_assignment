import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL environment variable is not set. Please check your .env file.');
}

export default defineConfig({
  out: './db',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: databaseUrl,
  },
});