require('dotenv').config();
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /payments:
 *  get:
 *    description: Use to request all payments from db
 *    summary: API to retrive all payments data.
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
        const result = await client.query('SELECT * FROM payments;');
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
 * /payments/new:
 *    post:
 *      description: Use to add new payment
 *      summary: API to add payment data.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: payment
 *        in: body
 *        description: payment details
 *        required: true 
 *        schema:
 *          name: Example
 *          type: object
 *          format: application/json
 *          example: {"payment_type": "credit card", "payment_date": "23-04-2022","payment_status": "confirmed"}
 *    responses:
 *      '200':
 *        description: Successfully added a payment
 */
router.post("/new", async (req, res) => {
    const query = `INSERT INTO payments(payment_type, payment_date, payment_status)
        VALUES (\'${req.body.payment_type}\', \'${req.body.payment_date}\', \'${req.body.payment_status}\');`

    console.log('query is = ' + query)
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
        res.status(200).send("successfuly added payment");
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})


/**
* @swagger
* /payments/{id}:
*   get:
*     summary: API to retrieve a single payment record.
*     description: Retrieve a single customer record base on id provided.
*     responses:
*       200:
*         description: A single payment data.
*     parameters:
*      - name: id
*        in: path
*        description: payment id
*        schema:
*          type: integer
*        required: true 
*        example: 1  
*/
router.get("/:id", async (req, res) => {
    payment_id = req.params.id
    const query = `select * from payments where payment_id = ${payment_id};`
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
