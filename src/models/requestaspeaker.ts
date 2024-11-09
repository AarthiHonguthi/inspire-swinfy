import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBookingRequest extends Document {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  organization: string;
  requestSpeaker: string;
  position: string;
  eventLocation: string;
  bookingFor: string;
  eventDescription: string;
}

const BookingRequestSchema: Schema = new Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true },
  organization: { type: String, required: true },
  requestSpeaker: { type: String, required: true },
  position: { type: String, required: true },
  eventLocation: { type: String, required: true },
  bookingFor: { type: String, required: true },
  eventDescription: { type: String, required: true },
});

// Reuse the model if it exists, otherwise define it
const BookingRequest: Model<IBookingRequest> =
  mongoose.models.BookingRequest ||
  mongoose.model<IBookingRequest>("BookingRequest", BookingRequestSchema);

export default BookingRequest;
