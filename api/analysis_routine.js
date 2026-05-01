// api/analysis_routine.js
const { neon } = require('@neondatabase/serverless');
const fmt = d => new Date(d).toISOString().split('T')[0];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();
  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql`
      SELECT * FROM routine_logs 
      WHERE date >= NOW() - INTERVAL '30 days'
      ORDER BY date DESC`;

    // Calculate missed habits
    let totalDays = rows.length || 1;
    let missed = {
      piano: 0, reading: 0, wakeup: 0, walk: 0, study: 0, supps: 0
    };

    rows.forEach(r => {
      if ((r.piano_mins || 0) === 0) missed.piano++;
      if ((r.reading_mins || 0) === 0) missed.reading++;
      if (!r.early_wakeup) missed.wakeup++;
      if (!r.morning_walk) missed.walk++;
      if ((parseFloat(r.study_hours) || 0) === 0) missed.study++;
      if (!r.supplements) missed.supps++;
    });

    return res.json({ history: rows, missed, totalDays });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
