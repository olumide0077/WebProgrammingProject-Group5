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
 *    summary: API to retrive all products data.
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
 *      summary: API to add a product data.
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
 *          example: {"brand_id": 1, "product_name": "seko watch 1","product_description": "a good watch","size": "100","color": "silver","available_product": "100","price": "600","weight": "10","picture": "/images/seko1.jpeg","note": "call me when ready","product_tag":"watch", "product_in_cart":0}
 *    responses:
 *      '200':
 *        description: Successfully added a product
 */
router.post("/new", async (req, res) => {
    const query = `INSERT INTO products(
        brand_id, product_name, product_description, size, color, available_product, price, weight, picture, note,product_tag,product_in_cart)
        VALUES (${req.body.brand_id}, \'${req.body.product_name}\', \'${req.body.product_description}\', \'${req.body.size}\',
        \'${req.body.color}\', \'${req.body.available_product}\', \'${req.body.price}\', \'${req.body.weight}\',
        \'${req.body.picture}\', \'${req.body.note}\', \'${req.body.product_tag}\', ${req.body.product_in_cart});`
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
        res.status(200).send("successfuly added product");
        client.release();
    } catch (err) {
        console.error(err);
        res.json({ error: err });
    }
})
/**
* @swagger
* /products/{name}:
*   get:
*     summary: Search product based on names.
*     description: API to retrieve product data based on name provided.
*     responses:
*       200:
*         description: Product data matching the name provided.
*     parameters:
*      - name: name
*        in: path
*        description: product name
*        schema:
*          type: integer
*        required: true 
*        example: seko  
*/
router.get("/:name", async (req, res) => {
    const query = `select * from products where product_name LIKE \'\%${req.params.name}\%\';`
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
