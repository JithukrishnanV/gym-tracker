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
    
    if (type === 'home') {
      const [weights, activities, foodRows, sleepRows] = await Promise.all([
        sql`SELECT date, weight_lb FROM body_weight_logs WHERE date >= NOW() - INTERVAL '90 days' ORDER BY date DESC LIMIT 90`,
        sql`SELECT date, activity_type, duration_minutes FROM activity_logs WHERE date >= NOW() - INTERVAL '90 days' ORDER BY date DESC`,
        sql`SELECT date, SUM(calories) AS total_calories, SUM(protein) AS total_protein FROM food_logs WHERE date >= NOW() - INTERVAL '90 days' GROUP BY date ORDER BY date DESC`,
        sql`SELECT date, hours_slept, bedtime, waketime FROM sleep_logs WHERE date >= NOW() - INTERVAL '90 days' ORDER BY date DESC`,
      ]);
      const fmt = d => new Date(d).toISOString().split('T')[0];
      const activitiesByDate = {};
      activities.forEach(a => { const d = fmt(a.date); if (!activitiesByDate[d]) activitiesByDate[d] = []; activitiesByDate[d].push({ type: a.activity_type, duration: a.duration_minutes }); });
      const foodByDate = {};
      foodRows.forEach(r => { foodByDate[fmt(r.date)] = { calories: Math.round(parseFloat(r.total_calories) || 0), protein: Math.round(parseFloat(r.total_protein) || 0) }; });
      const sleepByDate = {};
      sleepRows.forEach(r => { sleepByDate[fmt(r.date)] = { hours: parseFloat(r.hours_slept) || null, bedtime: r.bedtime, waketime: r.waketime }; });
      const weightList = weights.map(w => ({ date: fmt(w.date), weight_lb: parseFloat(w.weight_lb) }));
      const today = fmt(new Date());
      const actDateSet = new Set(Object.keys(activitiesByDate));
      let streak = 0;
      let check = new Date();
      check.setHours(0, 0, 0, 0);
      for (let i = 0; i < 365; i++) {
        const ds = fmt(check);
        if (actDateSet.has(ds)) { streak++; check.setDate(check.getDate() - 1); }
        else {
          if (ds === today && streak === 0) { check.setDate(check.getDate() - 1); continue; }
          break;
        }
      }
      return res.json({ activitiesByDate, foodByDate, sleepByDate, weights: weightList, streak });
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
