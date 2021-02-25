const { Router } = require('express');
const { userController } = require('../Controllers/user.ctrl');
const userRouter = new Router();
const {morganChalk, logger } = require("../Logs/logger");

/* http://localhost:4000/api/user */
userRouter.get('/', userController.getUsers);
userRouter.get('/:id', userController.getUser);
userRouter.post('/', userController.addUser);
userRouter.put('/:id', userController.updateUser);
userRouter.post('/login', userController.userLogin);
userRouter.post('/register', userController.userRegister);
userRouter.get('/logout', userController.userLogout);

module.exports = { userRouter };
