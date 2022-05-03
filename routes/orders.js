require('dotenv').config();
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /orders:
 *  get:
 *    description: Use to request all orders from db
 *    summary: API to retrive all orders data.
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
        const result = await client.query('SELECT * FROM orders;');
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
 * /orders/new:
 *    post:
 *      description: Use to add new order
 *      summary: POST API to add order data.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: Orders
 *        in: body
 *        description: order details
 *        required: true 
 *        schema:
 *          name: Example
 *          type: object
 *          format: application/json
 *          example: {"product_id": 2, "customer_id": "1","order_date": "23-04-2022","quantity": "100","total_price": "10000","billing_address": "Test Appartment 1","shipping_address": "Test Appartment 2","color": "silver","weight": "100","price": "10"}
 *    responses:
 *      '200':
 *        description: Successfully added a product
 */
router.post("/new", async (req, res) => {
    const query = `INSERT INTO orders(product_id, customer_id, order_date, quantity, total_price, billing_address, shipping_address, color, weight, price)
        VALUES (${req.body.product_id}, ${req.body.customer_id}, \'${req.body.order_date}\', ${req.body.quantity},
        ${req.body.total_price}, \'${req.body.billing_address}\', \'${req.body.shipping_address}\', \'${req.body.color}\',
        ${req.body.weight}, ${req.body.price});`

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
        res.status(200).send("successfuly added order");
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})

/**
* @swagger
* /orders/{id}:
*   get:
*     summary: API to retrieve a single order record.
*     description: Retrieve a single order record base on id provided.
*     responses:
*       200:
*         description: A single order data.
*     parameters:
*      - name: id
*        in: path
*        description: order id
*        schema:
*          type: integer
*        required: true 
*        example: 1  
*/
router.get("/:id", async (req, res) => {
    order_id = req.params.id
    const query = `select * from orders where order_id = ${order_id};`
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
