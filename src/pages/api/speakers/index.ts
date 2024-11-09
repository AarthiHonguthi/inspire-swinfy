import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Speaker from "../../../models/speaker";

type ResponseData = {
  success: boolean;
  data?: any;
  message?: string;
  error?: any;
  result?: any; // Add result property here
};

// Handler function
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      // Get all speakers
      try {
        const speakers = await Speaker.find({});
        res.status(200).json({ success: true, data: speakers });
      } catch (error) {
        res.status(500).json({ success: false, error }); // Server error
      }
      break;

    case "POST":
      // Create new speakers
      try {
        const speakersData = Array.isArray(req.body) ? req.body : [req.body];
        const createdSpeakers = await Speaker.insertMany(speakersData);
        res.status(201).json({ success: true, data: createdSpeakers });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    case "PUT":
      // Update a speaker
      try {
        const { speakerName, updatedData } = req.body;
        const speaker = await Speaker.updateMany(
          { name: speakerName },
          { $set: updatedData }
        );
        res.status(200).json({ success: true, data: speaker });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    case "DELETE":
      // Delete speakers by name
      try {
        const { speakername } = req.body;
        const result = await Speaker.deleteMany({ name: speakername });
        res.status(200).json({ success: true, message: "Speakers deleted", result });
      } catch (error) {
        res.status(400).json({ success: false, error: (error as Error).message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
