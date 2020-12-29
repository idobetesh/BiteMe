const { Router } = require('express');
const { googleAPIController } = require('../controllers/googleAPI.ctrl');

const googleAPI = new Router();

/* http://localhost:3000/api/game */
googleAPI.get('/', googleAPIController.getRestFromAPI);

module.exports = { googleAPI };
