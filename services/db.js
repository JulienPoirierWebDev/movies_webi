import mongoose from 'mongoose';

async function connectDB() {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.rylpson.mongodb.net/?retryWrites=true&w=majority&appName=teachingCluster`
		);
	} catch (error) {
		console.log(error);
	}
}

export default connectDB;
