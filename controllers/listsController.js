import ListsModel from '../models/listsModel.js';
import MoviesModel from '../models/moviesModel.js';
import jwt from 'jsonwebtoken';

class ListsController {
	static async getOneById(req, res) {
		const id = req.params.id;
		const list = await ListsModel.getOneById(id);

		if (list) {
			res.status(200).json({
				list: list,
			});
		} else {
			res.status(404).json({
				error: true,
				message: "La liste n'existe pas",
			});
		}
	}

	static async getAllListsByUserId(req, res) {
		const id = req.params.id;

		const lists = await ListsModel.getAllListsByUserId(id);

		if (lists) {
			res.status(200).json({
				lists: lists,
			});
		} else {
			res.status(404).json({
				error: true,
				message: "Cet utilisateur n'a pas de listes",
			});
		}
	}

	static async createOne(req, res) {
		try {
			const newList = req.body;

			const token = req.headers.authorization.split(' ')[1];
			req.user = jwt.verify(token, process.env.SECRET_JWT);

			const userId = req.user._id;
			newList.owner = userId;

			if (!newList.name) {
				res.status(400).json({
					error: true,
					message: 'Le nom de la liste est obligatoire',
				});
				return;
			}

			const response = await ListsModel.createOne(newList);

			res.status(201).json({
				message: response,
			});
		} catch (error) {
			res.status(500).json({
				error: true,
				message: 'Erreur lors de la création de la liste',
				error,
			});
		}
	}

	static async updateOneById(req, res) {
		const id = req.params.id;
		const update = req.body;
		const listUpdated = await ListsModel.updateOneById(update, id);

		if (listUpdated) {
			res.status(200).json({
				message: 'Liste modifiée avec succès',
			});
		} else {
			res.status(404).json({
				error: true,
				message: "La liste n'existe pas",
			});
		}
	}

	static async addMovieToList(req, res) {
		const idMovie = req.body.id_movie;
		const id = req.params.id;

		const movie = await MoviesModel.getOneById(idMovie);

		if (!movie) {
			res.status(404).json({
				error: true,
				message: "Le film n'existe pas",
			});
			return;
		}

		const list = await ListsModel.addMovieToList(id, idMovie);

		if (!list) {
			res.status(404).json({
				error: true,
				message: "La liste n'existe pas",
			});
			return;
		}

		res.status(200).json({
			message: 'Film ajouté à la liste',
		});
	}

	static async removeMovieFromList(req, res) {
		const idMovie = req.params.id_movie;

		const list = await ListsModel.removeMovieFromList(id, idMovie);

		if (!list) {
			res.status(404).json({
				error: true,
				message: "La liste n'existe pas",
			});
			return;
		}

		const isMovieInList = list.movies.find(
			(movie) => movie._id === idMovie
		);

		if (!isMovieInList) {
			res.status(404).json({
				error: true,
				message: "Le film n'est pas dans la liste",
			});
			return;
		}

		list.movies = list.movies.filter((movie) => movie._id !== idMovie);
		list.save();

		res.status(200).json({
			message: 'Film supprimé de la liste',
		});
	}

	static async deleteOneById(req, res) {
		const id = req.params.id;
		const deletedList = await ListsModel.deleteOneById(id);

		if (deletedList) {
			res.status(200).json({
				message: 'Liste supprimée avec succès',
			});
		} else {
			res.status(404).json({
				error: true,
				message: "La liste n'existe pas",
			});
		}
	}
}

export default ListsController;
