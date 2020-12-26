const { Router } = require('express');
const { restaurantDbcontroller } = require('../Controllers/restuarant.ctrl');

const restaurantRouter= new Router;

restaurantRouter.get('/', restaurantDbcontroller.getRestaurants);
restaurantRouter.get('/:id', restaurantDbcontroller.getRestaurant);
//restaurantRouter.post('/', restaurantDbcontroller.addRestaurant);
//restaurantRouter.put('/:id', restaurantDbcontroller.updateRestaurant);
//restaurantRouter.delete('/:id', restaurantDbcontroller.deleteRestaurant);

exports.restaurantRouter = restaurantRouter;