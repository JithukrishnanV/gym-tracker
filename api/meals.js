// api/meals.js — log which meal option was eaten
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
    const rows = await sql`SELECT * FROM meal_logs WHERE date = ${date} ORDER BY created_at ASC`;
    return res.json(rows);
  }

  if (req.method === 'POST') {
    const { date, meal_type, option_chosen, notes } = req.body || {};
    if (!date || !meal_type) return res.status(400).json({ error: 'date and meal_type required' });

    // Insert a new entry (allows multiple logs per meal for correction; frontend picks latest)
    const row = await sql`
      INSERT INTO meal_logs (date, meal_type, option_chosen, notes)
      VALUES (${date}, ${meal_type}, ${option_chosen ?? null}, ${notes ?? null})
      RETURNING *
    `;
    return res.json(row[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
