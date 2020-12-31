const { Router } = require('express');
const { maxCountController } = require('../Controllers/maxCount.ctrl');

const maxCount = new Router();

/* http://localhost:3000/api/maxCount */
maxCount.get('/', maxCountController.findMaxCount);


module.exports = { maxCount };