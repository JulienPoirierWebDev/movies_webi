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
		try {
			const newUser = req.body;
			// faire les vérif que l'on veut
			const isUserWithEmail = await UsersModel.getOneByEmail(
				req.body.email
			);

			if (isUserWithEmail) {
				res.status(404).json({
					error: true,
					message: 'Cet email est déja utilisé',
				});
			} else {
				const hashedPassword = await bycrypt.hash(newUser.password, 10);
				newUser.hashedPassword = hashedPassword;
				delete newUser.password;
				newUser.role = 'user';
				const message = await UsersModel.createOne(newUser);
				res.status(201).json(message);
			}
		} catch (error) {
			console.log('error in usersController createOne');
		}
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
