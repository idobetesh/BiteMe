const axios = require('axios').default;
const nodemailer = require('nodemailer');
const User = require('../Models/user');
const Order = require('../Models/order');
const Axios = require ('axios');

exports.mailController = {

    async sendMail(req,res) {

        let content = "";
        if(req.body.finalRes) {
            content = `<h2>Well Done, It was a close game,</h2><h2>but there is only one winner!🥇🏆</h2><br><h3>Bon Appetit🍕,</h3>BiteMe`;
        } else {
            if (req.body.winningRest === "") {
                content = `<h2>It was so close!🍿</h2><h3>But it's a tie, see you in 5 minutes for the <a href='localhost:3000/game'> Break-even quiz</a></h3><br><br><h2>cheers🍻,</h2>BiteMe`
            } else {
                content = `<h2>The restaurant for today is ${req.body.winningRest}🌶</h2><br><h3>Bon Appetit🍕,</h3>BiteMe`
            }
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
    }
}