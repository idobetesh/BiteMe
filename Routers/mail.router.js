const { Router } = require('express');
const { mailController } = require('../Controllers/mail.ctrl');

const mailRouter = new Router();

/* http://localhost:4000/api/send */
mailRouter.post('/', mailController.sendMail);

module.exports = { mailRouter };
