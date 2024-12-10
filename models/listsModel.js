import mongoose, { Schema } from 'mongoose';
import { MovieSchema } from './moviesModel.js';
import Users from './usersModel.js';

const ListSchema = Schema({
	name: { type: String, required: true },
	movies: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Movies',
		},
	],
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users',
		required: true,
	},
});

const Lists = mongoose.model('Lists', ListSchema);

class ListsModel {
	static async getOneById(_id) {
		try {
			const list = await Lists.findById(_id).populate('movies').exec();
			return list;
		} catch (error) {
			console.log(error);
		}
	}

	static async getAllListsByUserId(userId) {
		try {
			const user = await Users.getOneById(userId);

			const lists = await Lists.find({ owner: user._id });
			return lists;
		} catch (error) {
			return;
		}
	}

	static async createOne(newList) {
		try {
			const list = new Lists(newList);
			console.log(list);
			await list.save();
			return list;
		} catch (error) {
			throw new Error('Erreur lors de la création de la liste');
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
			console.log(list);

			if (list.movies === undefined) {
				list.movies = [];
			}

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
