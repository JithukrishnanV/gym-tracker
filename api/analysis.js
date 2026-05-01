// api/analysis.js
// Returns aggregated data for Analysis tab: last 90 days of activities,
// food calories, sleep, weight history, and streak count.

const { neon } = require('@neondatabase/serverless');

const fmt = d => new Date(d).toISOString().split('T')[0];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).end();

  const sql = neon(process.env.DATABASE_URL);

  try {
    const [weights, activities, foodRows, sleepRows] = await Promise.all([
      sql`SELECT date, weight_lb FROM body_weight_logs
          WHERE date >= NOW() - INTERVAL '90 days'
          ORDER BY date DESC LIMIT 90`,
      sql`SELECT date, activity_type, duration_minutes FROM activity_logs
          WHERE date >= NOW() - INTERVAL '90 days'
          ORDER BY date DESC`,
      sql`SELECT date,
            SUM(calories) AS total_calories,
            SUM(protein)  AS total_protein
          FROM food_logs
          WHERE date >= NOW() - INTERVAL '90 days'
          GROUP BY date ORDER BY date DESC`,
      sql`SELECT date, hours_slept, bedtime, waketime FROM sleep_logs
          WHERE date >= NOW() - INTERVAL '90 days'
          ORDER BY date DESC`,
    ]);

    // Build lookup maps keyed by date string
    const activitiesByDate = {};
    activities.forEach(a => {
      const d = fmt(a.date);
      if (!activitiesByDate[d]) activitiesByDate[d] = [];
      activitiesByDate[d].push({ type: a.activity_type, duration: a.duration_minutes });
    });

    const foodByDate = {};
    foodRows.forEach(r => {
      foodByDate[fmt(r.date)] = {
        calories: Math.round(parseFloat(r.total_calories) || 0),
        protein:  Math.round(parseFloat(r.total_protein)  || 0),
      };
    });

    const sleepByDate = {};
    sleepRows.forEach(r => {
      sleepByDate[fmt(r.date)] = {
        hours:    parseFloat(r.hours_slept) || null,
        bedtime:  r.bedtime,
        waketime: r.waketime,
      };
    });

    const weightList = weights.map(w => ({
      date: fmt(w.date),
      weight_lb: parseFloat(w.weight_lb),
    }));

    // Streak: consecutive days (going back from today) with any activity logged
    const today = fmt(new Date());
    const actDateSet = new Set(Object.keys(activitiesByDate));
    let streak = 0;
    let check = new Date();
    check.setHours(0, 0, 0, 0);
    for (let i = 0; i < 365; i++) {
      const ds = fmt(check);
      if (actDateSet.has(ds)) {
        streak++;
        check.setDate(check.getDate() - 1);
      } else {
        // Allow today to be skipped (day not over yet)
        if (ds === today && streak === 0) {
          check.setDate(check.getDate() - 1);
          continue;
        }
        break;
      }
    }

    return res.json({ activitiesByDate, foodByDate, sleepByDate, weights: weightList, streak });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
