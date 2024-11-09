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
  const { slug } = req.query; // Retrieve slug parameter from the URL

  switch (method) {
    case "GET":
      try {
        const bookingRequest = await BookingRequest.findOne({ name: slug });
        if (!bookingRequest) {
          return res.status(404).json({
            success: false,
            message: `Booking request with name '${slug}' not found`,
          });
        }
        res.status(200).json({ success: true, data: bookingRequest });
      } catch (error) {
        res.status(500).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    case "PUT":
      try {
        const updatedData = req.body;

        if (!updatedData) {
          return res.status(400).json({
            success: false,
            message: "Updated data is required",
          });
        }

        const bookingRequest = await BookingRequest.findOneAndUpdate(
          { name: slug },
          { $set: updatedData },
          { new: true }
        );

        if (!bookingRequest) {
          return res.status(404).json({
            success: false,
            message: `Booking request with name '${slug}' not found`,
          });
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
        const result = await BookingRequest.findOneAndDelete({ name: slug });

        if (!result) {
          return res.status(404).json({
            success: false,
            message: `Booking request with name '${slug}' not found`,
          });
        }

        res.status(200).json({
          success: true,
          message: `Booking request '${slug}' deleted successfully`,
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
