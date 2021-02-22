const axios = require('axios').default;
const nodemailer = require('nodemailer');
const User = require('../Models/user');
const Order = require('../Models/order');


exports.mailController = {

    // newGame(req, res)

    async sendMail(req,res) {
        console.log("im in mailer!!!, mail list: ", req.body.mailList)
        let content = "";
        if (req.body.winningRest == null) {
            content = "<h2>It was so close!🍿</h2><h3>but it's a tie, see you in 5 minutes for the break-even quiz</h3><br><a href='https://www.ynet.co.il'>Click To Play</a><br><h2>cheers🍻,</h2>BiteMe"
        } else {
            content = `<h2>The restaurant for today is ${req.body.winningRest}🌶</h2><br><h3>Bon Appetit🍕,</h3>BiteMe`
        }
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    
        req.body.mailList.forEach(function (to, i, array) {
            let msg = {
                from: process.env.EMAIL,
                subject: 'BiteMe🍔',
                html: content
            };
            msg.to = to;
            
            transporter.sendMail(msg, function (err) {
                if (err) {
                    console.log('Error Occurs',err.message);
                } else {
                    console.log('Email sent')
                }
            })
        });   
        res.send(`"${content}" \n\nwas send to ${req.body.mailList}`);
    }
}