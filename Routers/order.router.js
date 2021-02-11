const { Router } = require('express');
const { orderController } = require('../Controllers/order.ctrl');

const orderRouter = new Router();

/* http://localhost:4000/api/order */
orderRouter.get('/:id', orderController.getOrder);
orderRouter.post('/', orderController.addOrder);
orderRouter.delete('/:id', orderController.deleteOrder);

module.exports = { orderRouter };