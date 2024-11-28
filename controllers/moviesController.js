import MoviesModel from '../models/moviesModel.js';

const getAllMovies = async (req, res) => {
	try {
		const data = await MoviesModel.getAllMovies();
		const cleanData = JSON.parse(data);
		res.status(200).json({ movies: cleanData });
	} catch (error) {
		console.log(error);
	}
};

const getOneById = async (req, res) => {
	const targetId = Number(req.params.id);

	if (isNaN(targetId)) {
		res.json({
			error: true,
			message: "Cet id n'est pas valide",
		});
	} else {
		const data = await MoviesModel.getOneById();

		const cleanData = JSON.parse(data);

		const movie = cleanData.filter((oneMovie) => {
			if (oneMovie.id === targetId) {
				return oneMovie;
			}
		})[0];

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
		res.status(201).json({ message: 'Film ajouté' });
	} catch (error) {
		res.status(500).json({ error: true, message: error.message });
	}
};

const patchOneById = (req, res) => {
	res.json({ message: 'Je suis une route patch de movies' });
};

const deleteOneById = (req, res) => {
	res.json({ message: 'Je suis une route delete de movies' });
};

export { getAllMovies, getOneById, createOne, patchOneById, deleteOneById };
