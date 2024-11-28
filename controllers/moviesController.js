import MoviesModel from '../models/moviesModel.js';

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

		/*
		"adult": false,
		"backdrop_path": null,
		"genre_ids": [27],
		"id": 1268729,
		"original_language": "ja",
		"original_title": "投稿 怨霊映像 Vol.106 変篇",
		"overview": "This is the 106th installment of the “Posted Grudge Spirit Footage” film series.",
		"popularity": 0.087,
		"poster_path": "/mAg64xSP5ZfQMgMf9rtbDhikydh.jpg",
		"release_date": "2024-03-06",
		"title": "Posted Grudge Spirit Footage Vol.106: Transformation Edition",
		"video": false,
		"vote_average": 0,
		"vote_count": 0
		 */

		// check if all required fields are present

		if (
			!newMovie.adult ||
			!newMovie.backdrop_path ||
			!newMovie.genre_ids ||
			!newMovie.id ||
			!newMovie.original_language ||
			!newMovie.original_title ||
			!newMovie.overview ||
			!newMovie.popularity ||
			!newMovie.poster_path ||
			!newMovie.release_date ||
			!newMovie.title ||
			!newMovie.video ||
			!newMovie.vote_average ||
			!newMovie.vote_count
		) {
			res.status(400).json({
				error: true,
				message: 'Tous les champs sont obligatoires',
			});
			return;
		}

		// check format of required fields

		if (
			typeof newMovie.adult !== 'boolean' ||
			typeof newMovie.backdrop_path !== 'string' ||
			!Array.isArray(newMovie.genre_ids) ||
			typeof newMovie.id !== 'number' ||
			typeof newMovie.original_language !== 'string' ||
			typeof newMovie.original_title !== 'string' ||
			typeof newMovie.overview !== 'string' ||
			typeof newMovie.popularity !== 'number' ||
			typeof newMovie.poster_path !== 'string' ||
			typeof newMovie.release_date !== 'string' ||
			typeof newMovie.title !== 'string' ||
			typeof newMovie.video !== 'boolean' ||
			typeof newMovie.vote_average !== 'number' ||
			typeof newMovie.vote_count !== 'number'
		) {
			res.status(400).json({
				error: true,
				message: 'Mauvais format',
			});
			return;
		}

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
