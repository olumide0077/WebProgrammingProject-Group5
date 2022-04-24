require('dotenv').config();
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /brands:
 *  get:
 *    description: Use to request all brands from db
 *    responses:
 *      '200': 
 *        description: A successful response
 */
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
        const result = await client.query('SELECT * FROM brands;');
        const results = { 'results': (result) ? result.rows : null };
        res.json(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})

/**
 * @swagger
 * /brands/new:
 *    post:
 *      description: Use to add new brand
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: brand name
 *        in: body
 *        description: Name of brand
 *        required: true          
 *        properties:
 *          name:
 *              type: string *        
 *        schema:
 *          type: object
 *          format: application/json
 *          example: {"name": "longines"}
 *    responses:
 *      '200':
 *        description: Successfully added a brand
 */
router.post("/new", async (req, res) => {
    const name = req.body.name;
    const query = `INSERT INTO brands (brand_name) VALUES (\'${name}\');`
    console.log ('query is = ' +query)
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
        const result = await client.query(query);
        res.status(200).send("successfuly added brand");
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})

 /**
 * @swagger
 * /brands/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder brand.
 *     description: Retrieve a single brand based on id given.
 *     responses:
 *       200:
 *         description: A single brand data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The brand ID.
 *                       example: 0
 *                     name:
 *                       type: string
 *                       description: The brand's name.
 *                       example: apple
*/
router.get("/:id", async (req, res) => {
    brand_id = req.params.id
    const query = `select * from brands where brand_id = ${brand_id};`
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
        console.log(query)
        const result = await client.query(query);
        const results = { 'results': (result) ? result.rows : null };
        res.json(results);
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})

module.exports = router