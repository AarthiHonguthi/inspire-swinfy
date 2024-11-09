import mongoose, { Schema, Document, model } from "mongoose";

// Define the Speaker interface that extends Document for Mongoose
export interface ISpeaker extends Document {
    name: string;
    title: string;
    imageUrl: string;
    link: string;
}

// Define the Mongoose schema
const SpeakerSchema: Schema = new Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
});

// Export the model
export default mongoose.models.Speaker || model<ISpeaker>("Speaker", SpeakerSchema);
