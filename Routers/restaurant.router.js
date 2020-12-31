const { Router } = require('express');
const { restaurantController } = require('../Controllers/restaurant.ctrl');

const restaurantRouter = new Router();

/* http://localhost:3000/api/restaurant */
restaurantRouter.get('/', restaurantController.getRestaurants);
restaurantRouter.get('/:id', restaurantController.getRestaurant);
restaurantRouter.post('/', restaurantController.addRestaurant);
restaurantRouter.put('/:id', restaurantController.updateRestaurant);
restaurantRouter.delete('/:id', restaurantController.deleteRestaurant);

module.exports = { restaurantRouter };