// api/today.js — returns all data for a given date in one round-trip
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const { date } = req.query;
  if (!date) return res.status(400).json({ error: 'date param required (YYYY-MM-DD)' });

  const sql = neon(process.env.DATABASE_URL);

  try {
    const [weights, activities, wLogs, mLogs, notes] = await Promise.all([
      sql`SELECT weight_lb FROM body_weight_logs WHERE date = ${date} ORDER BY created_at DESC LIMIT 1`,
      sql`SELECT activity_type, duration_minutes FROM activity_logs WHERE date = ${date} ORDER BY created_at ASC`,
      sql`SELECT exercise, set_number, reps, weight FROM workout_logs WHERE date = ${date} ORDER BY exercise, set_number ASC`,
      sql`SELECT DISTINCT ON (meal_type) meal_type, option_chosen FROM meal_logs WHERE date = ${date} ORDER BY meal_type, created_at DESC`,
      sql`SELECT notes FROM daily_notes WHERE date = ${date} LIMIT 1`,
    ]);

    // Group workout logs by exercise name → array indexed by set_number-1
    const workoutLogs = {};
    wLogs.forEach(row => {
      if (!workoutLogs[row.exercise]) workoutLogs[row.exercise] = [];
      workoutLogs[row.exercise][row.set_number - 1] = {
        weight: parseFloat(row.weight) || 0,
        reps: row.reps
      };
    });

    // Meals keyed by meal_type
    const meals = {};
    mLogs.forEach(row => { meals[row.meal_type] = { option_chosen: row.option_chosen }; });

    return res.json({
      weight: weights[0]?.weight_lb ? parseFloat(weights[0].weight_lb) : null,
      activities: activities || [],
      workoutLogs,
      meals,
      notes: notes[0]?.notes || '',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
