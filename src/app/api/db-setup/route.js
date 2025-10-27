import client from '@/lib/libsqlClient';

// WARNING: This route will execute a DDL statement against your database.
// Use only for initial setup or testing. Remove or protect this route in production.

export async function POST(req) {
  // Require a secret header to run DDL. Set DB_SETUP_SECRET in env and pass it via
  // the `x-db-setup-secret` header when calling this route.
  const secretHeader = req.headers.get('x-db-setup-secret');
  const expected = process.env.DB_SETUP_SECRET;
  if (!expected || secretHeader !== expected) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 });
  }
  try {
    // Example: create a simple todos table. Adjust columns/types to your needs.
    const sql = `
      CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        description TEXT
      );
    `;

    const result = await client.execute(sql);

    return new Response(JSON.stringify({ success: true, result: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DB setup error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
