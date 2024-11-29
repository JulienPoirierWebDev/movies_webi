import mongoose from 'mongoose';

async function connectDB() {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.rylpson.mongodb.net/webitech?retryWrites=true&w=majority&appName=teachingCluster`
		);
		console.log('Connexion à la base de données réussie !');
	} catch (error) {
		console.log(error);
	}
}

async function disconnectDB() {
	try {
		await mongoose.disconnect();
		console.log('Déconnexion de la base de données réussie !');
	} catch (error) {
		console.log(error);
	}
}

export { connectDB, disconnectDB };
