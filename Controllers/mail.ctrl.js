const axios = require('axios').default;
const nodemailer = require('nodemailer');


exports.mailController = {

    sendMail(req, res) {

        const restName = req.query.name;
        let content = "";
    
        if (restName == "") {
            content = "<h2>It was so close!🍿</h2><h3>but it's a tie, see you in 5 minutes for the break-even quiz</h3><br><h2>cheers🍻,</h2>BiteMe"
        } else {
            content = `<h2>The restaurant for today is ${restName}🌶</h2><br><h3>Bon Appetit🍕,</h3>BiteMe`
        }
    
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
    
        /* will be added dynamically from users email */
        let maillist = [
            'yarin1994@gmail.com',
            'idobetesh@gmail.com',
            'yalisofer@gmail.com'
        ];
    
        maillist.forEach(function (to, i, array) {
            let msg = {
                from: process.env.EMAIL,
                subject: 'BiteMe🍔',
                html: content
            };
            msg.to = to;
            
            transporter.sendMail(msg, function (err) {
                if (err) {
                    console.log('Error Occurs');
                } else {
                    console.log('Email sent')
                }
            })
        });   
        res.send(`mails were send to ${maillist}`);
    }
}