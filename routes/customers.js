require('dotenv').config();
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers from db
 *    summary: API to retrive all customers data.
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
        const result = await client.query('SELECT * FROM customers;');
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
 * /customers/new:
 *    post:
 *      description: Use to add new customer
 *      summary: API to add a customer data.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: Product
 *        in: body
 *        description: Product details
 *        required: true 
 *        schema:
 *          name: Example
 *          type: object
 *          format: application/json
 *          example: {"user_id": 1, "address1": "test 1","address2": "test 2","city": "Oulu","postalCode": "90100","country": "Finland","phone": "123456","credit_card": "981291623","credit_card_xp_mo": "01","credit_card_xp_yr": "26","billing_address":"Test Appartment 1","billing_city":"Oulu","billing_region":"Oulu","billing_postal_code":"90100","billing_country":"Finland","shipping_address":"Test Appartment 1","shipping_city":"Oulu","shipping_region":"Oulu","shipping_postal_code":"90100","membership_status":"member"}
 *    responses:
 *      '200':
 *        description: Successfully added a product
 */
router.post("/new", async (req, res) => {
    const query = `INSERT INTO customers(user_id, address1, address2, city, state, "postalCode", country, phone, credit_card, credit_card_xp_mo, credit_card_xp_yr, billing_address, billing_city, billing_region, billing_postal_code, billing_country, shipping_address, shipping_city, shipping_region, shipping_postal_code, membership_status)
        VALUES (${req.body.user_id}, \'${req.body.address1}\', \'${req.body.address2}\', \'${req.body.city}\',
        \'${req.body.state}\', \'${req.body.postalCode}\', \'${req.body.country}\', ${req.body.phone},
        ${req.body.credit_card}, \'${req.body.credit_card_xp_mo}\',\'${req.body.credit_card_xp_yr}\', 
        \'${req.body.billing_address}\', \'${req.body.billing_city}\', \'${req.body.billing_region}\', 
        \'${req.body.billing_postal_code}\', \'${req.body.billing_country}\', \'${req.body.shipping_address}\', 
        \'${req.body.shipping_city}\', \'${req.body.shipping_region}\', \'${req.body.shipping_postal_code}\', 
        \'${req.body.membership_status}\');`

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
        res.status(200).send("successfuly added customer");
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})


/**
* @swagger
* /customers/{id}:
*   get:
*     summary: API to retrieve a single customer record.
*     description: Retrieve a single customer record base on id provided.
*     responses:
*       200:
*         description: A single customer data.
*     parameters:
*      - name: id
*        in: path
*        description: customer id
*        schema:
*          type: integer
*        required: true 
*        example: 1  
*/
router.get("/:id", async (req, res) => {
    customer_id = req.params.id
    const query = `select * from customers where customer_id = ${customer_id};`
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
