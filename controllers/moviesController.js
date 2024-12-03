import MoviesModel from '../models/moviesModel.js';
import mongoose from 'mongoose';

const getAllMovies = async (req, res) => {
	try {
		const data = await MoviesModel.getAllMovies();
		res.status(200).json({ movies: data });
	} catch (error) {
		console.log(error);
	}
};

const getOneById = async (req, res) => {
	const targetId = Number(req.params.id);
	if (!mongoose.isValidObjectId(targetId)) {
		res.json({
			error: true,
			message: "Cet id n'est pas valide",
		});
	} else {
		const movie = await MoviesModel.getOneById(targetId);

		if (!movie) {
			res.status(404).json({
				error: true,
				message: 'Pas de film avec cet ID',
			});
		} else {
			res.status(200).json({ movie });
		}
	}
};

const createOne = async (req, res) => {
	try {
		const newMovie = req.body;

		const data = await MoviesModel.createOne(newMovie);
		res.status(201).json({ message: 'Film ajouté', data });
	} catch (error) {
		res.status(500).json({ error: true, message: error.message });
	}
};

const patchOneById = async (req, res) => {
	try {
		const update = req.body.update;
		const _id = req.body._id;

		const data = await MoviesModel.updateOneById(update, _id);

		res.status(200).json({ message: 'Modification réussie', data });
	} catch (error) {
		res.status(500).json({ error: true, message: error.message });
	}
};

const deleteOneById = async (req, res) => {
	try {
		const _id = req.body._id;
		const data = await MoviesModel.deleteOneById(_id);

		res.status(200).json({ message: 'Suppression réussie', data });
	} catch (error) {
		res.status(500).json({ error: true, message: error.message });
	}
};

export { getAllMovies, getOneById, createOne, patchOneById, deleteOneById };
