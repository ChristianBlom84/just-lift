const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		console.log("MongoURI", db);
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
      useUnifiedTopology: true
		});

		console.log('MongoDB connected.');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
}

module.exports = connectDB;
