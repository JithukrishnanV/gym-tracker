// api/init.js
// Run this ONCE after deploying: visit https://your-app.vercel.app/api/init
const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'GET') return res.status(405).end();

  const sql = neon(process.env.DATABASE_URL);

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS body_weight_logs (
        id          SERIAL PRIMARY KEY,
        date        DATE NOT NULL,
        weight_lb   NUMERIC(5,1) NOT NULL,
        notes       TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS activity_logs (
        id               SERIAL PRIMARY KEY,
        date             DATE NOT NULL,
        activity_type    VARCHAR(50) NOT NULL,
        duration_minutes INTEGER,
        notes            TEXT,
        created_at       TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS workout_logs (
        id          SERIAL PRIMARY KEY,
        date        DATE NOT NULL,
        day_type    VARCHAR(10),
        set_type    CHAR(1),
        exercise    VARCHAR(200) NOT NULL,
        set_number  INTEGER NOT NULL,
        reps        INTEGER,
        weight      NUMERIC(6,2),
        notes       TEXT,
        created_at  TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS meal_logs (
        id             SERIAL PRIMARY KEY,
        date           DATE NOT NULL,
        meal_type      VARCHAR(50) NOT NULL,
        option_chosen  CHAR(1),
        notes          TEXT,
        created_at     TIMESTAMPTZ DEFAULT NOW()
      )`;

    await sql`
      CREATE TABLE IF NOT EXISTS daily_notes (
        id         SERIAL PRIMARY KEY,
        date       DATE NOT NULL UNIQUE,
        notes      TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`;

    // Useful index for exercise history queries
    await sql`CREATE INDEX IF NOT EXISTS idx_workout_exercise ON workout_logs(exercise, date DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_workout_date    ON workout_logs(date)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_weight_date     ON body_weight_logs(date DESC)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_activity_date   ON activity_logs(date DESC)`;

    return res.json({
      success: true,
      message: '✅ Database initialised! All 5 tables + indexes created. You can now use the app.'
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
