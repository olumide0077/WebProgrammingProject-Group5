const nodemailer = require("nodemailer");
const express = require('express')
const pool = require('./config/db')
const router = express.Router();


router.post('/recoverpassword', async (req, res) => {
    
})

router.post('/sendrecoverypassword', async (req, res) => {

    const { email  } = req.body;

    try
    {
        const db = await pool.connect();

        const existingUser = await db.query("SELECT * FROM siteusers WHERE email=$1",[email]).catch(console.log);

        if(existingUser.rows != 0) {
            const id = existingUser.rows[0].id;
            let mailTransporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hostmail',
                    pass: 'password'
                }
            });
            
            let mailDetails = {
                from: 'amosunolumidejoseph2021@gmail.com',
                to: `${email}`,
                subject: 'Second Authentication',
                html: `<b>Kindly get your reset link : reset <a href='https://webprojectg5.herokuapp.com/homepage/resetpassword.html?resetid=${id}'> Link</a></b>`
            };
            
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                    console.log(err);
                } else {
                    console.log('Email sent successfully');
                    res.send({success})
                }
            });
            }

    }
    catch(err)
    {
        
    }

   
})

module.exports = router;