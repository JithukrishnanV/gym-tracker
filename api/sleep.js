// api/sleep.js
// GET  ?date=YYYY-MM-DD  → returns sleep record for that date (or null)
// POST {date, hours_slept, bedtime, waketime} → upsert

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
    const rows = await sql`SELECT * FROM sleep_logs WHERE date = ${date} LIMIT 1`;
    return res.json(rows[0] || null);
  }

  if (req.method === 'POST') {
    const { date, hours_slept, bedtime, waketime } = req.body || {};
    if (!date) return res.status(400).json({ error: 'date required' });

    const existing = await sql`SELECT id FROM sleep_logs WHERE date = ${date} LIMIT 1`;
    let row;
    if (existing.length > 0) {
      row = await sql`
        UPDATE sleep_logs
        SET hours_slept = ${hours_slept ?? null},
            bedtime     = ${bedtime ?? null},
            waketime    = ${waketime ?? null},
            updated_at  = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `;
    } else {
      row = await sql`
        INSERT INTO sleep_logs (date, hours_slept, bedtime, waketime)
        VALUES (${date}, ${hours_slept ?? null}, ${bedtime ?? null}, ${waketime ?? null})
        RETURNING *
      `;
    }
    return res.json(row[0]);
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
