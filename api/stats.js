// api/stats.js — aggregated stats for the Progress tab
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const sql = neon(process.env.DATABASE_URL);

  try {
    const [weights, recentActivity] = await Promise.all([
      // Last 60 body weight entries
      sql`
        SELECT date, weight_lb FROM body_weight_logs
        ORDER BY date DESC LIMIT 60
      `,
      // Last 20 activity entries (for the Recent Activity card)
      sql`
        SELECT date, activity_type, duration_minutes FROM activity_logs
        ORDER BY date DESC, created_at DESC LIMIT 20
      `,
    ]);

    return res.json({
      weights: weights.map(w => ({ ...w, weight_lb: parseFloat(w.weight_lb) })),
      recentActivity,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
