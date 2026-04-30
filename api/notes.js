// api/notes.js — daily journal notes (one per day, upserted)
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date required' });
    const rows = await sql`SELECT notes FROM daily_notes WHERE date = ${date} LIMIT 1`;
    return res.json({ notes: rows[0]?.notes || '' });
  }

  if (req.method === 'POST') {
    const { date, notes } = req.body || {};
    if (!date) return res.status(400).json({ error: 'date required' });

    // Upsert — one notes entry per day
    const existing = await sql`SELECT id FROM daily_notes WHERE date = ${date} LIMIT 1`;
    let row;
    if (existing.length > 0) {
      row = await sql`
        UPDATE daily_notes SET notes = ${notes ?? ''}, updated_at = NOW()
        WHERE id = ${existing[0].id} RETURNING *
      `;
    } else {
      row = await sql`
        INSERT INTO daily_notes (date, notes) VALUES (${date}, ${notes ?? ''}) RETURNING *
      `;
    }
    return res.json(row[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
