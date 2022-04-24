require('dotenv').config();
const express = require("express")
const router = express.Router()
router.get("/", async (req, res) => {
    const { Pool } = require('pg');
    const pool = (() => {
        if (process.env.NODE_ENV !== 'production') {
            return new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: false
            });
        } else {
            return new Pool({
                connectionString: process.env.DATABASE_URL,
                ssl: {
                    rejectUnauthorized: false
                }
            });
        }
    })();
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM public.users;');
        const results = { 'results': (result) ? result.rows : null };
        res.json(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }

})

router.post("/new", (req, res) => {
    const body=req.body
    res.json(body)
    res.json("adding a new user")
})

router.post('/api', function(req, res) {
    const user_id = req.body.id;
    const token = req.body.token;
    const geo = req.body.geo;
  
    res.send({
      'user_id': user_id,
      'token': token,
      'geo': geo
    });
  });

router.get("/:name", (req, res) => {
    res.json("look for product with name " + req.params.name)
})

module.exports = router