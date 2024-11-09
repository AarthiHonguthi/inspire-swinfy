import mongoose, { Schema, Document, model } from "mongoose";

// Define the Profile interface that extends Document for Mongoose
export interface IProfile extends Document {
  name: string;
  image: string;
  tagline: string;
  travelsFrom: string;
  speakingFee: string;
  categories: string[];
  biography: string;
  bookButtonText: string;
  videoLinks: string[];
}

// Define the Mongoose schema
const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: { type: String },
  travelsFrom: { type: String },
  speakingFee: { type: String },
  categories: { type: [String] }, // Array of strings
  biography: { type: String },
  bookButtonText: { type: String },
  videoLinks: { type: [String] }, // Array of strings for video URLs
  image: { type: String, required: true }, // New field for the image URL
});

// Export the model
export default mongoose.models.Profile ||
  model<IProfile>("Profile", ProfileSchema);
