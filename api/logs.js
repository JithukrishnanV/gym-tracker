// api/logs.js — workout set logs: GET (history) + POST (save set)
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  // GET — fetch previous sessions for a specific exercise (for progress chart)
  if (req.method === 'GET') {
    const { exercise, date } = req.query;

    if (exercise) {
      // Progressive overload history for one exercise
      const rows = await sql`
        SELECT date, set_number, reps, weight
        FROM workout_logs
        WHERE exercise = ${exercise}
        ORDER BY date DESC, set_number ASC
        LIMIT 100
      `;
      return res.json(rows.map(r => ({ ...r, weight: parseFloat(r.weight) || 0 })));
    }

    if (date) {
      const rows = await sql`
        SELECT * FROM workout_logs WHERE date = ${date} ORDER BY exercise, set_number ASC
      `;
      return res.json(rows);
    }

    return res.status(400).json({ error: 'Provide ?exercise=name or ?date=YYYY-MM-DD' });
  }

  // POST — upsert a single set log
  if (req.method === 'POST') {
    const { date, day_type, set_type, exercise, set_number, reps, weight, notes } = req.body || {};

    if (!date || !exercise || set_number == null) {
      return res.status(400).json({ error: 'date, exercise, set_number are required' });
    }

    // Upsert: if the same (date, exercise, set_number) already exists, update it
    const existing = await sql`
      SELECT id FROM workout_logs WHERE date = ${date} AND exercise = ${exercise} AND set_number = ${set_number} LIMIT 1
    `;

    let row;
    if (existing.length > 0) {
      row = await sql`
        UPDATE workout_logs SET reps = ${reps ?? null}, weight = ${weight ?? null}, notes = ${notes ?? null},
          day_type = ${day_type ?? null}, set_type = ${set_type ?? null}, created_at = NOW()
        WHERE id = ${existing[0].id}
        RETURNING *
      `;
    } else {
      row = await sql`
        INSERT INTO workout_logs (date, day_type, set_type, exercise, set_number, reps, weight, notes)
        VALUES (${date}, ${day_type ?? null}, ${set_type ?? null}, ${exercise}, ${set_number}, ${reps ?? null}, ${weight ?? null}, ${notes ?? null})
        RETURNING *
      `;
    }

    const r = row[0];
    return res.json({ ...r, weight: parseFloat(r.weight) || 0 });
  }

  // DELETE
  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id required' });
    await sql`DELETE FROM workout_logs WHERE id = ${id}`;
    return res.json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
