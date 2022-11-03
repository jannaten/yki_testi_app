import mongoose from 'mongoose'

async function dbConnect() {
	const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CLUSTER, MONGO_DATABASE } =
		process.env;

	const MONGODB_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

	const mongooseOption = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	const connection = {}

	/* check if we have connection to our databse*/
	if (connection.isConnected) {
		return
	}

	/* connecting to our database */
	const db = await mongoose.connect(MONGODB_URI, mongooseOption);
	connection.isConnected = db.connections[0].readyState
}

export default dbConnect
