// api/weight.js — body weight log: GET history + POST new entry
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  if (req.method === 'GET') {
    const rows = await sql`
      SELECT date, weight_lb FROM body_weight_logs
      ORDER BY date DESC LIMIT 60
    `;
    return res.json(rows.map(r => ({ ...r, weight_lb: parseFloat(r.weight_lb) })));
  }

  if (req.method === 'POST') {
    const { date, weight_lb, notes } = req.body || {};
    if (!date || !weight_lb) return res.status(400).json({ error: 'date and weight_lb required' });

    // Upsert: one entry per day
    const existing = await sql`SELECT id FROM body_weight_logs WHERE date = ${date} LIMIT 1`;
    let row;
    if (existing.length > 0) {
      row = await sql`UPDATE body_weight_logs SET weight_lb = ${weight_lb}, notes = ${notes ?? null} WHERE id = ${existing[0].id} RETURNING *`;
    } else {
      row = await sql`INSERT INTO body_weight_logs (date, weight_lb, notes) VALUES (${date}, ${weight_lb}, ${notes ?? null}) RETURNING *`;
    }
    return res.json({ ...row[0], weight_lb: parseFloat(row[0].weight_lb) });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
