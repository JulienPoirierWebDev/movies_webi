import mongoose, { Schema } from 'mongoose';

const MovieSchema = Schema({
	adult: Boolean,
	backdrop_path: String,
	genre_ids: [Number],
	id: Number,
	original_language: String,
	original_title: {
		type: String,
		required: true,
	},
	overview: String,
	popularity: Number,
	poster_path: String,
	release_date: String,
	title: String,
	video: Boolean,
	vote_average: Number,
	vote_count: Number,
});

const Movies = mongoose.model('Movies', MovieSchema);

class MoviesModel {
	static async getAllMovies() {
		try {
			/*const data = await fs.readFile('movies.json', { encoding: 'utf8' });
			const cleanData = JSON.parse(data);
			return cleanData;*/
			const data = await Movies.find();
			return data;
		} catch (error) {
			console.log(error);
		}
	}
	static async getOneById(id) {
		const movie = await Movies.findById(id);
		return movie;
		/*
		const data = await fs.readFile('movies.json', { encoding: 'utf8' });
		const cleanData = JSON.parse(data);
		const movie = cleanData.filter((oneMovie) => {
			if (oneMovie.id === id) {
				return oneMovie;
			}
		})[0];
		return movie;
		*/
	}
	static async createOne(newMovie) {
		try {
			const isMovieWithSameIdTMDB = await Movies.findOne({
				id: newMovie.id,
			});

			if (isMovieWithSameIdTMDB) {
				return 'Ce film existe déjà';
			} else {
				const movieIsMongoose = new Movies(newMovie);
				movieIsMongoose.save();
				return 'Film ajouté avec succès';
			}
		} catch (error) {
			console.error(error);
		}

		/*
		const allMovies = await MoviesModel.getAllMovies();

		const alreadyExist = allMovies.some(
			(oneMovie) => oneMovie.id === newMovie.id
		);
		console.log('alreadyExist', alreadyExist);

		if (alreadyExist) {
			return 'Ce film existe déjà';
		} else {
			allMovies.push({ ...newMovie });

			try {
				const data = await fs.writeFile(
					'movies.json',
					JSON.stringify(allMovies)
				);
				return 'Film ajouté avec succès';
			} catch (error) {
				throw new Error(
					"Erreur lors de l'écriture du fichier : " + error.message
				);
			}
		}*/
	}
	static async updateOneById(update, _id) {
		try {
			const movieUpdated = await Movies.findByIdAndUpdate(_id, update);
			return movieUpdated;
		} catch (error) {
			console.log(error);
		}
	}
	static async deleteOneById(_id) {
		try {
			const deletedMovie = await Movies.findByIdAndDelete(_id);
			return deletedMovie;
		} catch (error) {}
	}
}

export default MoviesModel;
