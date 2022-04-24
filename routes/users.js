require('dotenv').config();
const express = require("express")
const router = express.Router()

/**
 * @swagger
 * /users:
 *  get:
 *    description: Use to request all users from db
 *    summary: API to GET all users data.
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
        const result = await client.query('SELECT * FROM users;');
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
 * /users/new:
 *    post:
 *      description: Use to add new user
 *      summary: API to add a new user.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - name: User
 *        in: body
 *        description: user details
 *        required: true 
 *        schema:
 *          name: Example
 *          type: object
 *          format: application/json
 *          example: {"reg_date": "2-03-2022", "first_name": "harim","last_name": "muzamil","email": "harim@example.com","user_role": "customer"}
 *    responses:
 *      '200':
 *        description: Successfully added a user
 */
router.post("/new", async (req, res) => {
    const query = `INSERT INTO users(reg_date, first_name, last_name, email, password, user_role)
        VALUES (\'${req.body.reg_date}\', \'${req.body.first_name}\', \'${req.body.last_name}\', \'${req.body.email}\',
        \'${req.body.password}\', \'${req.body.user_role}\');`

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
* /users/{id}:
*   get:
*     summary: API to retrieve a single user record.
*     description: Retrieve a single user record base on id provided.
*     responses:
*       200:
*         description: A single user data.
*     parameters:
*      - name: id
*        in: path
*        description: user id
*        schema:
*          type: integer
*        required: true 
*        example: 1  
*/
router.get("/:id", async (req, res) => {
    user_id = req.params.id
    const query = `select * from users where user_id = ${user_id};`
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