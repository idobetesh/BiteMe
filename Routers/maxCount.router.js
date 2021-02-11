const { Router } = require('express');
const { maxCountController } = require('../Controllers/maxCount.ctrl');

const maxCount = new Router();

/* http://localhost:4000/api/maxCount */
maxCount.get('/', maxCountController.findMaxCount);


module.exports = { maxCount };