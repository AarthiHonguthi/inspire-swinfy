// pages/api/shortlist/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Shortlist from "../../../models/shortlist";

type ResponseData = {
  success: boolean;
  data?: any;
  message?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const shortlist = await Shortlist.find({});
        res.status(200).json({ success: true, data: shortlist });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const newSpeaker = req.body;
        const createdSpeaker = await Shortlist.create(newSpeaker);
        res.status(201).json({ success: true, data: createdSpeaker });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;

    case "DELETE":
      const { id } = req.query; // You forgot to extract 'id' from the query
      if (id) {
        // If an ID is provided, delete the specific speaker
        try {
          const deletedSpeaker = await Shortlist.findByIdAndDelete(id);
          if (!deletedSpeaker) {
            return res
              .status(404)
              .json({ success: false, message: "Speaker not found" });
          }
          res
            .status(200)
            .json({
              success: true,
              message: "Speaker removed from shortlist",
              data: deletedSpeaker,
            });
        } catch (error) {
          res.status(500).json({ success: false, error });
        }
      } else {
        // If no ID is provided, clear the entire shortlist
        try {
          await Shortlist.deleteMany({});
          res.status(200).json({ success: true, message: "Shortlist cleared" });
        } catch (error) {
          res.status(400).json({ success: false, error });
        }
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
