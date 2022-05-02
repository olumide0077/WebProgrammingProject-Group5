require('dotenv').config();
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const pool = require('../auth/config/db')

const router = express.Router()


router.post('/signup',  async (req, res) => {

    const { username, email, password } = req.body 

    try {
        const db = await pool.connect();

        const existingUser = await db.query("SELECT * FROM siteusers WHERE email=$1",[email]).catch(console.log);

        if(existingUser.rowCount == 0)
        {
            bcrypt.genSalt(10, async function (err, salt) {
                bcrypt.hash(password, salt, async function (err, hash) {
                    
                     const user = await db.query("INSERT INTO siteusers (username, email, password) VALUES ($1, $2, $3)", [username,email,hash])
                    .catch(console.log);

                    if(user != null) {
                        const addedUser = await db.query("SELECT * FROM siteusers WHERE email=$1",[email]).catch(console.log);
                        const token = jwt.sign({ userId: addedUser.rows[0].id }, 'GroupFive')
                        res.send({ token, id:addedUser.rows[0].id});
                    }
                    else {
                        return  res.status(422).send("unable to signup at this time");
                    }
                });
            });
        }
        else{
             return  res.status(422).send("User already exists")
        }

    } catch (err) {
       return  res.status(422).send("db error")
    }
})

router.post('/signin', async (req, res) => {
    
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(422).send({error: 'Must provide email and password' });
    }

    try
    {
        const db = await pool.connect();

        const existingUser = await db.query("SELECT * FROM siteusers WHERE email=$1",[email]).catch(console.log);
        
        if(existingUser.rows == 0) {
            return res.status(400).send({error: 'Incorrect email or password'})
        }
        else{
            try {
                 bcrypt.compare(password, existingUser.rows[0].password, function (err, result) {
                    if(result) {
                        const token = jwt.sign({ userId: existingUser.rows[0].id }, 'GroupFive')
                        res.send({ token, id:existingUser.rows[0].id});
                    }
                    else {
                        return res.status(400).send({error: 'Incorrect email or password'})
                    }
                }); 
            } catch (error) {
                return res.status(400).send({error: 'Incorrect email or password'})
            }
        }
    }
    catch (err) {
         return res.status(422).send({error: 'Unable to sign in at this time' });
    }
})


module.exports = router;