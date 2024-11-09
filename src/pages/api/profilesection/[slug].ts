import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Profile, { IProfile } from "../../../models/profilesection";

type ResponseData = {
  success: boolean;
  data?: IProfile | IProfile[];
  message?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;
  const { slug } = req.query; // Retrieve the slug parameter from the URL

  switch (method) {
    case "GET":
      // Get a profile by slug (name)
      try {
        const profile = await Profile.findOne({ name: slug });
        if (!profile) {
          return res.status(404).json({
            success: false,
            message: `Profile with name '${slug}' not found`,
          });
        }
        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res
          .status(500)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    case "PUT":
      // Update a profile by slug (name)
      try {
        const updatedData = req.body;

        // Ensure the image is included if updating the image URL
        if (updatedData && !updatedData.image) {
          return res.status(400).json({
            success: false,
            message: "Image URL is required for update",
          });
        }

        const profile = await Profile.findOneAndUpdate(
          { name: slug },
          { $set: updatedData },
          { new: true }
        );

        if (!profile) {
          return res.status(404).json({
            success: false,
            message: `Profile with name '${slug}' not found`,
          });
        }

        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    case "DELETE":
      // Delete a profile by slug (name)
      try {
        const result = await Profile.deleteOne({ name: slug });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            message: `Profile with name '${slug}' not found`,
          });
        }

        res.status(200).json({
          success: true,
          message: `Profile '${slug}' deleted successfully`,
        });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
