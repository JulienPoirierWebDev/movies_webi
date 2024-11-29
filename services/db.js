import mongoose from 'mongoose';

async function connectDB() {
	try {
		await mongoose.connect(
			`mongodb+srv://julienpoirier17:${process.env.MONGO_PASSWORD}@teachingcluster.rylpson.mongodb.net/?retryWrites=true&w=majority&appName=teachingCluster`
		);
	} catch (error) {
		console.log(error);
	}
}

export default connectDB;
