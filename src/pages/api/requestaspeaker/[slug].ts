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

  switch (method) {
    case "GET":
      try {
        const { slug } = req.query; // Retrieve slug from query
        if (!slug) {
          return res.status(400).json({
            success: false,
            message: "Missing 'slug' in the request query",
          });
        }

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
        const { slug } = req.query; // Retrieve slug from query
        const updatedData = req.body;

        if (!slug) {
          return res.status(400).json({
            success: false,
            message: "Missing 'slug' in the request query",
          });
        }

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
        const { _id } = req.body; // Expect _id in the request body
        if (!_id) {
          return res.status(400).json({
            success: false,
            message: "Missing '_id' in the request body",
          });
        }

        const result = await BookingRequest.findByIdAndDelete(_id);

        if (!result) {
          return res.status(404).json({
            success: false,
            message: `Booking request with id '${_id}' not found`,
          });
        }

        res.status(200).json({
          success: true,
          message: `Booking request with id '${_id}' deleted successfully`,
          data: result,
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
