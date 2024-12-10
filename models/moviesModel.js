import mongoose, { Schema } from 'mongoose';

const MovieSchema = Schema({
	adult: Boolean,
	backdrop_path: String,
	genre_ids: [Number],
	id: Number,
	original_language: String,
	original_title: {
		type: String,
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
			const data = await Movies.find();
			return data;
		} catch (error) {
			console.log(error);
		}
	}
	static async getOneById(id) {
		const movie = await Movies.findById(id);
		return movie;
	}
	static async createOne(newMovie) {
		try {
			const isMovieWithSameIdTMDB = await Movies.findOne({
				id: newMovie.id,
			});

			if (isMovieWithSameIdTMDB) {
				return 'Ce film existe déjà';
			} else {
				const movieInMongoose = new Movies(newMovie);
				movieInMongoose.save();
				return 'Film ajouté avec succès';
			}
		} catch (error) {
			console.error(error);
		}
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

export { MovieSchema };
