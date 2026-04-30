// api/food.js — food checkbox log per day
// GET  ?date=YYYY-MM-DD  → returns all checked food items for that date
// POST {date, meal_timing, food_item, calories, protein, carbs, fats, checked}
//       checked=true  → upsert (add)
//       checked=false → delete the entry

const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const sql = neon(process.env.DATABASE_URL);

  // GET — fetch all checked items for a date
  if (req.method === 'GET') {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: 'date required' });

    const rows = await sql`
      SELECT meal_timing, food_item, calories, protein, carbs, fats
      FROM food_logs
      WHERE date = ${date}
      ORDER BY meal_timing, created_at ASC
    `;
    return res.json(rows);
  }

  // POST — toggle a food item on or off
  if (req.method === 'POST') {
    const { date, meal_timing, food_item, calories, protein, carbs, fats, checked } = req.body || {};

    if (!date || !meal_timing || !food_item) {
      return res.status(400).json({ error: 'date, meal_timing, food_item required' });
    }

    if (checked === false || checked === 'false') {
      // Remove the entry
      await sql`
        DELETE FROM food_logs
        WHERE date = ${date} AND meal_timing = ${meal_timing} AND food_item = ${food_item}
      `;
      return res.json({ success: true, action: 'deleted' });
    } else {
      // Upsert — insert or update if already exists
      const existing = await sql`
        SELECT id FROM food_logs
        WHERE date = ${date} AND meal_timing = ${meal_timing} AND food_item = ${food_item}
        LIMIT 1
      `;

      let row;
      if (existing.length > 0) {
        row = await sql`
          UPDATE food_logs
          SET calories = ${calories ?? 0}, protein = ${protein ?? 0},
              carbs = ${carbs ?? 0}, fats = ${fats ?? 0}
          WHERE id = ${existing[0].id}
          RETURNING *
        `;
      } else {
        row = await sql`
          INSERT INTO food_logs (date, meal_timing, food_item, calories, protein, carbs, fats)
          VALUES (${date}, ${meal_timing}, ${food_item},
                  ${calories ?? 0}, ${protein ?? 0}, ${carbs ?? 0}, ${fats ?? 0})
          RETURNING *
        `;
      }
      return res.json(row[0]);
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
};
