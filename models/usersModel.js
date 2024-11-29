import mongoose, { Schema } from 'mongoose';
const UserSchema = Schema(
	{
		lastname: {
			type: String,
			required: true,
		},
		firstname: {
			type: String,
			required: true,
		},
		birthdate: {
			type: Date,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: [true, 'Cet email est déja utilisé'],
		},
		hashedPassword: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserSchema.virtual('fullname').get(() => {
	return `${this.firstname} ${this.lastname}`;
});

const Users = mongoose.model('Users', UserSchema);

class UsersModel {
	static async getOneById(_id) {
		const user = await Users.findById(_id);
		return user;
	}
	static async createOne(newUser) {
		try {
			const user = new Users(newUser);
			user.save();
			return 'Utilisateur crée avec succès';
		} catch (error) {
			if (error.code === 11000 && error.keyPattern?.email) {
				return 'Cet email est déjà utilisé';
			}
			console.error(error);
		}
	}
	static async updateOneById(update, _id) {
		try {
			const userUpdate = await Users.findByIdAndUpdate(_id, update);
			return userUpdate;
		} catch (error) {
			console.log(error);
		}
	}
	static async deleteOneById(_id) {
		try {
			const deletedUser = await Users.findByIdAndDelete(_id);
			return deletedUser;
		} catch (error) {
			console.log(error);
		}
	}
}

export default UsersModel;
