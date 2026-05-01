// api/routine.js — daily habit/routine log
// GET  ?date=YYYY-MM-DD        → single day record (or null)
// GET  ?range=N                → last N days array (for charts & insights)
// POST {date, piano_mins, reading_mins, early_wakeup, morning_walk, study_hours, supplements}

const { neon } = require('@neondatabase/serverless');

/* Scoring rules — total max = 100 pts */
function calcScore(d = {}) {
  let s = 0;
  s += Math.min(20, Math.floor((d.piano_mins    || 0) / 3));   // 1pt/3min, max 20
  s += Math.min(20, Math.floor((d.reading_mins  || 0) / 3));   // 1pt/3min, max 20
  s += d.early_wakeup ? 15 : 0;
  s += d.morning_walk ? 15 : 0;
  s += Math.min(20, Math.floor((d.study_hours   || 0) * 4));   // 4pt/hr,  max 20
  s += d.supplements  ? 10 : 0;
  return s;
}

const fmt = d => new Date(d).toISOString().split('T')[0];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  /* ── GET ── */
  if (req.method === 'GET') {
    const { date, range } = req.query;

    if (range) {
      const days = Math.min(parseInt(range) || 30, 365);
      const fromDate = new Date();
      fromDate.setDate(fromDate.getDate() - days);
      const fromStr = fmt(fromDate);
      const rows = await sql`
        SELECT date, piano_mins, reading_mins, early_wakeup,
               morning_walk, study_hours, supplements, total_score
        FROM routine_logs
        WHERE date >= ${fromStr}
        ORDER BY date ASC
      `;
      return res.json(rows.map(r => ({ ...r, date: fmt(r.date) })));
    }

    if (!date) return res.status(400).json({ error: 'date or range required' });
    const rows = await sql`SELECT * FROM routine_logs WHERE date = ${date} LIMIT 1`;
    if (!rows.length) return res.json(null);
    const r = rows[0];
    return res.json({ ...r, date: fmt(r.date) });
  }

  /* ── POST ── */
  if (req.method === 'POST') {
    const {
      date, piano_mins = 0, reading_mins = 0,
      early_wakeup = false, morning_walk = false,
      study_hours = 0, supplements = false
    } = req.body || {};
    if (!date) return res.status(400).json({ error: 'date required' });

    const total_score = calcScore({ piano_mins, reading_mins, early_wakeup, morning_walk, study_hours, supplements });

    const ex = await sql`SELECT id FROM routine_logs WHERE date = ${date} LIMIT 1`;
    let row;
    if (ex.length > 0) {
      row = await sql`
        UPDATE routine_logs SET
          piano_mins   = ${+piano_mins   || 0},
          reading_mins = ${+reading_mins || 0},
          early_wakeup = ${!!early_wakeup},
          morning_walk = ${!!morning_walk},
          study_hours  = ${+study_hours  || 0},
          supplements  = ${!!supplements},
          total_score  = ${total_score},
          updated_at   = NOW()
        WHERE id = ${ex[0].id} RETURNING *`;
    } else {
      row = await sql`
        INSERT INTO routine_logs
          (date, piano_mins, reading_mins, early_wakeup, morning_walk, study_hours, supplements, total_score)
        VALUES
          (${date}, ${+piano_mins||0}, ${+reading_mins||0}, ${!!early_wakeup},
           ${!!morning_walk}, ${+study_hours||0}, ${!!supplements}, ${total_score})
        RETURNING *`;
    }
    const r = row[0];
    return res.json({ ...r, date: fmt(r.date), total_score });
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
