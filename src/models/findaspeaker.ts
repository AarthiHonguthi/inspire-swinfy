import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the FindASpeaker interface that extends Document for Mongoose
export interface IFindASpeaker extends Document {
  name: string;
  description: string;
  image: string;
}

// Define the Mongoose schema
const FindASpeakerSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, 
});

// Create the FindASpeaker model
const FindASpeaker: Model<IFindASpeaker> = mongoose.models.FindASpeaker || mongoose.model<IFindASpeaker>('FindASpeaker', FindASpeakerSchema);

export default FindASpeaker;