import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import {
	createOne,
	deleteOneById,
	getAllMovies,
	getOneById,
	patchOneById,
} from '../controllers/moviesController.js';

const router = express.Router();

//   route /movies


//  route /movies/
router.get('/', getAllMovies);

//  route /movies/:id
router.get('/:id/', getOneById);

//  route /movies/
router.post('/', authMiddleware, createOne);

router.patch('/', patchOneById);

router.delete('/', deleteOneById);

export default router;
