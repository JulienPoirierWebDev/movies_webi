// créer les méthodes pour ajouter un utilisateur, modifier un utilisateur, modifier, supprimer un utilisateur

import bycrypt from 'bcrypt';

import UsersModel from '../models/usersModel.js';

class UsersController {
	static async getOneById(req, res) {
		const user = await UsersModel.getOneById(req.params.id);
		if (user) {
			res.status(200).json(user);
		} else {
			res.status(404).json('Utilisateur non trouvé');
		}
	}

	static async createOne(req, res) {
		const newUser = req.body;
		const hashedPassword = await bycrypt.hash(newUser.password, 10);
		newUser.hashedPassword = hashedPassword;
		//delete newUser.password;
		const message = await UsersModel.createOne(newUser);
		res.status(201).json(message);
	}

	static async updateOneById(req, res) {
		const update = req.body;
		const userUpdate = await UsersModel.updateOneById(
			update,
			req.params.id
		);
		if (userUpdate) {
			res.status(200).json(userUpdate);
		} else {
			res.status(404).json('Utilisateur non trouvé');
		}
	}

	static async deleteOneById(req, res) {
		const userDelete = await UsersModel.deleteOneById(req.params.id);
		if (userDelete) {
			res.status(200).json('Utilisateur supprimé');
		} else {
			res.status(404).json('Utilisateur non trouvé');
		}
	}
}

export default UsersController;
