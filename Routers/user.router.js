const { Router } = require('express');
const { userController } = require('../Controllers/user.ctrl');

const userRouter = new Router();

/* http://localhost:3000/api/user */
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.addUser);
userRouter.put('/:id', userController.updateUser);
userRouter.delete('/:id', userController.deleteUser);

module.exports = { userRouter };
