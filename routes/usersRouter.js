// create router for user routes

import express from 'express';
import UsersController from '../controllers/usersController.js';

const usersRouter = express.Router();

usersRouter.get('/:id', UsersController.getOneById);
usersRouter.post('/', UsersController.createOne);
usersRouter.put('/:id', UsersController.updateOneById);
usersRouter.delete('/:id', UsersController.deleteOneById);

export default usersRouter;
