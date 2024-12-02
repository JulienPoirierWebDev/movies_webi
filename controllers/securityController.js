import UsersModel from '../models/usersModel.js';
import bcrypt from 'bcrypt';

class SecurityController {
	static async authenticate(req, res) {
		const { email, password } = req.body;
		const user = await UsersModel.getOneByEmail(email);

		if (!user) {
			res.status(404).json({
				error: true,
				message: "Il y a un problème avec le mot de passe / l'email",
			});
		} else {
			const isSamePassword = await bcrypt.compare(
				password,
				user.hashedPassword
			);

			if (!isSamePassword) {
				res.status(404).json({
					error: true,
					message:
						"Il y a un problème avec le mot de passe / l'email",
				});
			} else {
				res.status(200).json({
					message: "C'est bien vous !",
				});
			}
		}
	}
}

export default SecurityController;