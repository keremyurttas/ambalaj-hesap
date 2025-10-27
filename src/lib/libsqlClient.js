import { createClient } from '@libsql/client';

// Server-only wrapper for @libsql/client
// Prefer Turso-specific env names but fall back to generic ones.
// Usage: import client from '@/lib/libsqlClient';

const client = createClient({
	url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN || process.env.DATABASE_AUTH_TOKEN,
});

export default client;
