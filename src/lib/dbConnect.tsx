import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
	const databaseURL: string = 'mongodb+srv://aarthihonguthi:arty2519@inspire.erczw.mongodb.net/?retryWrites=true&w=majority&appName=Inspire';
	console.log("Connecting to database");
	if (!databaseURL) {
		console.log("Database URL is missing");
		return;
	}

	try {
		const conn = await mongoose.connect(databaseURL);
		console.log("MongoDB connected successfully");

	} catch (error) {
		console.log("Error in connecting to MongoDB");
		console.error(`Error: ${(error as Error).message}`);
		process.exit(1);
	}
};

export default dbConnect;
