import client from '@/lib/libsqlClient';

export async function GET() {
  try {
    // Simple test query — adapt table/columns to your DB
    const result = await client.execute('SELECT 1 as ok');
    return new Response(JSON.stringify({ ok: result.rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('DB test error', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
