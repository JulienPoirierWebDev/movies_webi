import express from 'express';
import authenticationMiddleware from '../middlewares/authenticationMiddleware.js';
import {
	createOne,
	deleteOneById,
	getAllMovies,
	getOneById,
	patchOneById,
} from '../controllers/moviesController.js';
import adminAuthMiddleware from '../middlewares/authorization/adminAuthMiddleware.js';

const router = express.Router();

router.get('/', authenticationMiddleware, getAllMovies);

router.get('/:id/', getOneById);

router.post('/', authenticationMiddleware, createOne);

router.patch('/', patchOneById);

router.delete('/', deleteOneById);

export default router;
