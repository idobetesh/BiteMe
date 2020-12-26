const { Router } = require('express');
const { scheduleDbcontroller } = require('../Controllers/schedule.ctrl');

const scheduleRouter= new Router;

restaurantRouter.get('/', restaurantsDbcontroller.getSchedules);
restaurantRouter.get('/:id', restaurantsDbcontroller.getSchedule);
//restaurantRouter.post('/', restaurantsDbcontroller.addSchedule);
//restaurantRouter.put('/:id', restaurantsDbcontroller.updateSchedule);
//restaurantRouter.delete('/:id', restaurantsDbcontroller.deleteSchedule);

exports.restaurantsRouter = restaurantsRouter;
