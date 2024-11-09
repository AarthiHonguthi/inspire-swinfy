import mongoose, { Schema, Document, model } from "mongoose";

// Define the Shortlist interface that extends Document for Mongoose
export interface IShortlist extends Document {
    name: string;
    title: string;
    imageUrl: string;
    link: string;
}

// Define the Mongoose schema
const ShortlistSchema: Schema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
});

// Export the model
export default mongoose.models.Shortlist || model<IShortlist>("Shortlist", ShortlistSchema);

