// api/insights.js
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();
  const sql = neon(process.env.DATABASE_URL);
  const type = new URL(req.url, 'http://localhost').searchParams.get('type');

  try {
    if (type === 'workout') {
      const acts = await sql`SELECT date, activity_type, duration_minutes FROM activity_logs WHERE date >= NOW() - INTERVAL '30 days' ORDER BY date DESC`;
      const topExercises = await sql`SELECT exercise as exercise_name, COUNT(*) as sets_done, MAX(weight) as max_weight FROM workout_logs WHERE date >= NOW() - INTERVAL '30 days' GROUP BY exercise ORDER BY sets_done DESC LIMIT 10`;
      const weights = await sql`SELECT date, weight_lb FROM body_weight_logs WHERE date >= NOW() - INTERVAL '30 days' ORDER BY date DESC`;
      return res.json({ activities: acts, topExercises, weights });
    }
    
    if (type === 'diet') {
      const rows = await sql`SELECT date, SUM(calories) AS total_calories, SUM(protein) AS total_protein, SUM(carbs) AS total_carbs, SUM(fats) AS total_fats FROM food_logs WHERE date >= NOW() - INTERVAL '30 days' GROUP BY date ORDER BY date DESC`;
      const topFoods = await sql`SELECT food_item, MAX(meal_timing) as meal_timing, COUNT(*) as times_logged FROM food_logs WHERE date >= NOW() - INTERVAL '30 days' GROUP BY food_item ORDER BY times_logged DESC LIMIT 10`;
      return res.json({ history: rows, topFoods });
    }
    
    if (type === 'routine') {
      const rows = await sql`SELECT * FROM routine_logs WHERE date >= NOW() - INTERVAL '30 days' ORDER BY date DESC`;
      let totalDays = rows.length || 1;
      let missed = { piano: 0, reading: 0, wakeup: 0, walk: 0, study: 0, supps: 0 };
      rows.forEach(r => {
        if ((r.piano_mins || 0) === 0) missed.piano++;
        if ((r.reading_mins || 0) === 0) missed.reading++;
        if (!r.early_wakeup) missed.wakeup++;
        if (!r.morning_walk) missed.walk++;
        if ((parseFloat(r.study_hours) || 0) === 0) missed.study++;
        if (!r.supplements) missed.supps++;
      });
      return res.json({ history: rows, missed, totalDays });
    }

    return res.status(400).json({ error: 'Invalid type' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
