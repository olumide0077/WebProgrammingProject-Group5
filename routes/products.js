require('dotenv').config();
const express = require("express")
const router = express.Router()
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

/**
 * @swagger
 * /products:
 *  get:
 *    description: Use to request all products from db
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
        const result = await client.query('SELECT * FROM public.products ORDER BY product_id ASC;');
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
 * /products/new:
 *    post:
 *      description: Use to add new product
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: brand name
 *        in: body
 *        description: Name of product
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
    const query = `INSERT INTO products(
        brand_id, product_name, product_description, size, color, available_product, price, weight, picture, note)
        VALUES (${req.body.brand_id}, \'${req.body.product_name}\', \'${req.body.product_description}\', \'${req.body.size}\',
        \'${req.body.color}\', \'${req.body.available_product}\', \'${req.body.price}\', \'${req.body.weight}\',
        \'${req.body.picture}\', \'${req.body.note}\');`
        console.log(query)
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

router.get("/:name", (req, res) => {
    res.json("look for product with id " + req.params.name)
})

module.exports = router