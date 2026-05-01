// api/analysis_gym.js
const { neon } = require('@neondatabase/serverless');
const fmt = d => new Date(d).toISOString().split('T')[0];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Activities last 30 days
    const acts = await sql`
      SELECT date, activity_type, duration_minutes 
      FROM activity_logs 
      WHERE date >= NOW() - INTERVAL '30 days'
      ORDER BY date DESC`;

    // Workout volumes (total weight * reps) per exercise
    const topExercises = await sql`
      SELECT exercise, COUNT(*) as sets, MAX(weight) as max_weight 
      FROM workout_logs 
      WHERE date >= NOW() - INTERVAL '30 days'
      GROUP BY exercise ORDER BY sets DESC LIMIT 10`;

    // Weight history
    const weights = await sql`
      SELECT date, weight_lb FROM body_weight_logs
      WHERE date >= NOW() - INTERVAL '30 days'
      ORDER BY date DESC`;

    return res.json({ activities: acts, topExercises, weights });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
