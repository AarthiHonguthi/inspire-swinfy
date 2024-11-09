import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Profile, { IProfile } from "../../../models/profilesection";

type ResponseData = {
  success: boolean;
  data?: any;
  message?: string;
  error?: any;
  result?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      // Get all profiles
      try {
        const profiles = await Profile.find({});
        res.status(200).json({ success: true, data: profiles });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      // Create a new profile
      try {
        const {
          name,
          tagline,
          travelsFrom,
          speakingFee,
          categories,
          biography,
          bookButtonText,
          videoLinks,
          image,
        }: IProfile = req.body;

        if (!image) {
          return res
            .status(400)
            .json({ success: false, message: "Image URL is required" });
        }

        const createdProfile = await Profile.create({
          name,
          tagline,
          travelsFrom,
          speakingFee,
          categories,
          biography,
          bookButtonText,
          videoLinks,
          image,
        });

        res.status(201).json({ success: true, data: createdProfile });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    case "PUT":
      // Update a profile
      try {
        const { name, updatedData } = req.body;

        // Ensure the image is included if updating the image URL
        if (updatedData && !updatedData.image) {
          return res
            .status(400)
            .json({
              success: false,
              message: "Image URL is required for update",
            });
        }

        const profile = await Profile.findOneAndUpdate(
          { name },
          { $set: updatedData },
          { new: true }
        );

        if (!profile) {
          return res
            .status(404)
            .json({ success: false, message: "Profile not found" });
        }

        res.status(200).json({ success: true, data: profile });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    case "DELETE":
      // Delete a profile by name
      try {
        const { name } = req.body;
        const result = await Profile.deleteOne({ name });

        if (result.deletedCount === 0) {
          return res
            .status(404)
            .json({ success: false, message: "Profile not found" });
        }

        res
          .status(200)
          .json({ success: true, message: "Profile deleted", result });
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
