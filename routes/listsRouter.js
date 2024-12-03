import express from 'express';
import ListsController from '../controllers/listsController.js';

const router = express.Router();

// La fonction getAllListsOfUser est dans le router User : GET /users/:id/lists

router.get('/:id', ListsController.getOneById);

router.post('/', ListsController.createOne);

router.patch('/:id', ListsController.updateOneById);

router.post('/:id/movies/', ListsController.addMovieToList);

router.delete('/:id/movies/:id_movie', ListsController.removeMovieFromList);

router.delete('/:id/', ListsController.deleteOneById);

export default router;
