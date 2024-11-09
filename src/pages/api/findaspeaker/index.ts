import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import mongoose from "mongoose";
import FindASpeaker, { IFindASpeaker } from "../../../models/findaspeaker";

// Define a mapping for categories to Mongoose models
const categoryModels: Record<string, mongoose.Model<IFindASpeaker>> = {
  academicians:
    mongoose.models.Academicians ||
    mongoose.model<IFindASpeaker>("Academicians", FindASpeaker.schema),
  celebrities:
    mongoose.models.Celebrities ||
    mongoose.model<IFindASpeaker>("Celebrities", FindASpeaker.schema),
  scholars:
    mongoose.models.Scholars ||
    mongoose.model<IFindASpeaker>("Scholars", FindASpeaker.schema),
  bureaucrats:
    mongoose.models.Bureaucrats ||
    mongoose.model<IFindASpeaker>("Bureaucrats", FindASpeaker.schema),
  politicians:
    mongoose.models.Politicians ||
    mongoose.model<IFindASpeaker>("Politicians", FindASpeaker.schema),
  athletes:
    mongoose.models.Athletes ||
    mongoose.model<IFindASpeaker>("Athletes", FindASpeaker.schema),
  notable:
    mongoose.models.Notable ||
    mongoose.model<IFindASpeaker>("Notable", FindASpeaker.schema),
  entrepreneurs:
    mongoose.models.Entrepreneurs ||
    mongoose.model<IFindASpeaker>("Entrepreneurs", FindASpeaker.schema),
};

type ResponseData = {
  success: boolean;
  data?: IFindASpeaker[];
  message?: string;
  error?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;

  // Handle GET request for all speakers
  if (method === "GET") {
    try {
      const allSpeakers: IFindASpeaker[] = [];

      // Fetch data from all category models
      for (const category in categoryModels) {
        const Model = categoryModels[category];
        const speakers = await Model.find({});
        allSpeakers.push(...speakers);
      }

      // Return aggregated data
      res.status(200).json({ success: true, data: allSpeakers });
    } catch (error) {
      res.status(500).json({ success: false, error });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
