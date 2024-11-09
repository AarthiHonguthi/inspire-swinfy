import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import BookingRequest, {
  IBookingRequest,
} from "../../../models/requestaspeaker";

type ResponseData = {
  success: boolean;
  data?: IBookingRequest | IBookingRequest[];
  message?: string;
  error?: any;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    await dbConnect();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Database connection failed" });
  }

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const bookingRequests = await BookingRequest.find();
        res.status(200).json({ success: true, data: bookingRequests });
      } catch (error) {
        res.status(500).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    case "POST":
      try {
        const {
          email,
          firstName,
          lastName,
          phone,
          organization,
          requestSpeaker,
          position,
          eventLocation,
          bookingFor,
          eventDescription,
        } = req.body;

        const createdBookingRequest = await BookingRequest.create({
          email,
          firstName,
          lastName,
          phone,
          organization,
          requestSpeaker,
          position,
          eventLocation,
          bookingFor,
          eventDescription,
        });

        res.status(201).json({ success: true, data: createdBookingRequest });
      } catch (error) {
        res.status(400).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    case "PUT":
      try {
        const { id, updatedData } = req.body;

        // Validate required fields for update
        if (
          updatedData &&
          (!updatedData.email ||
            !updatedData.firstName ||
            !updatedData.lastName ||
            !updatedData.phone ||
            !updatedData.organization ||
            !updatedData.requestSpeaker ||
            !updatedData.position ||
            !updatedData.eventLocation ||
            !updatedData.bookingFor ||
            !updatedData.eventDescription)
        ) {
          return res.status(400).json({
            success: false,
            message: "All form fields are required for update",
          });
        }

        const bookingRequest = await BookingRequest.findByIdAndUpdate(
          id,
          { $set: updatedData },
          { new: true }
        );

        if (!bookingRequest) {
          return res
            .status(404)
            .json({ success: false, message: "Booking request not found" });
        }

        res.status(200).json({ success: true, data: bookingRequest });
      } catch (error) {
        res.status(400).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        const result = await BookingRequest.findByIdAndDelete(id);

        if (!result) {
          return res
            .status(404)
            .json({ success: false, message: "Booking request not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "Booking request deleted", result });
      } catch (error) {
        res.status(400).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
