const { Router } = require('express');
const { googleAPIController } = require('../Controllers/googleAPI.ctrl');

const googleAPI = new Router();

/* http://localhost:3000/api/restaurantAPI */
googleAPI.get('/', googleAPIController.getRestFromAPI);

module.exports = { googleAPI };
