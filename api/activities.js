// api/activities.js — log daily activity (gym, soccer, run, rest)
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
    const rows = await sql`SELECT * FROM activity_logs WHERE date = ${date} ORDER BY created_at ASC`;
    return res.json(rows);
  }

  if (req.method === 'POST') {
    const { date, activity_type, duration_minutes, notes } = req.body || {};
    if (!date || !activity_type) return res.status(400).json({ error: 'date and activity_type required' });

    const row = await sql`
      INSERT INTO activity_logs (date, activity_type, duration_minutes, notes)
      VALUES (${date}, ${activity_type}, ${duration_minutes ?? null}, ${notes ?? null})
      RETURNING *
    `;
    return res.json(row[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
