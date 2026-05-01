// api/analysis_food.js
const { neon } = require('@neondatabase/serverless');
const fmt = d => new Date(d).toISOString().split('T')[0];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();
  const sql = neon(process.env.DATABASE_URL);

  try {
    // Last 30 days of food logs
    const rows = await sql`
      SELECT date, 
             SUM(calories) AS total_calories, 
             SUM(protein) AS total_protein,
             SUM(carbs) AS total_carbs,
             SUM(fats) AS total_fats
      FROM food_logs 
      WHERE date >= NOW() - INTERVAL '30 days'
      GROUP BY date ORDER BY date DESC`;
    
    // Top foods
    const topFoods = await sql`
      SELECT food_item, COUNT(*) as count 
      FROM food_logs 
      WHERE date >= NOW() - INTERVAL '30 days'
      GROUP BY food_item ORDER BY count DESC LIMIT 5`;

    return res.json({ history: rows, topFoods });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
