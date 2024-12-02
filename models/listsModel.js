import mongoose, { Schema } from 'mongoose';
import { MovieSchema } from './moviesModel.js';
import { UserSchema } from './usersModel.js';

const ListSchema = Schema({
	name: { type: String, required: true },
	movies: [{ type: MovieSchema }],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
});

const Lists = mongoose.model('Lists', ListSchema);

class ListsModel {
	static async getOneById(_id) {
		const list = await Lists.findById();
		return list;
	}

	static async getAllListsByUserId(userId) {
		const lists = await Lists.find({ 'owner._id': userId });
		return lists;
	}

	static async createOne(newList) {
		try {
			const list = new Lists(newList);
			list.save();
			return 'Liste créée avec succès';
		} catch (error) {
			console.error(error);
		}
	}

	static async updateOneById(update, _id) {
		try {
			const listUpdated = await Lists.findByIdAndUpdate(_id, update);
			return listUpdated;
		} catch (error) {
			console.log(error);
		}
	}

	static async addMovieToList(listId, movie) {
		try {
			const list = await Lists.findById(listId);
			list.movies.push(movie);
			list.save();
			return 'Film ajouté à la liste';
		} catch (error) {
			console.error(error);
		}
	}

	static async removeMovieFromList(listId, movieId) {
		try {
			const list = await Lists.findById(listId);
			list.movies = list.movies.filter((movie) => movie._id !== movieId);
			list.save();
			return 'Film supprimé de la liste';
		} catch (error) {
			console.error(error);
		}
	}

	static async deleteOneById(_id) {
		try {
			const deletedList = await Lists.findByIdAndDelete(_id);
			return deletedList;
		} catch (error) {
			console.error(error);
		}
	}
}

export default ListsModel;

export { ListSchema };
