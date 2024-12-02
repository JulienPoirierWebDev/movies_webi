// create router for user routes

import express from 'express';
import UsersController from '../controllers/usersController.js';
import ListsController from '../controllers/listsController.js';

const usersRouter = express.Router();

usersRouter.get('/:id', UsersController.getOneById);
usersRouter.post('/', UsersController.createOne);
usersRouter.patch('/:id', UsersController.updateOneById);
usersRouter.delete('/:id', UsersController.deleteOneById);
usersRouter.get('/:id/lists', ListsController.getAllListsByUserId);

export default usersRouter;
