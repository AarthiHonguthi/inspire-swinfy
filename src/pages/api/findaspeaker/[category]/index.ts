//findaspeaker/[category]
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../lib/dbConnect";
import mongoose, { Model } from "mongoose";
import FindASpeaker, { IFindASpeaker } from "../../../../models/findaspeaker";

type ResponseData = {
  success: boolean;
  data?: IFindASpeaker[];
  message?: string;
  error?: any;
};

// Define a mapping for categories to Mongoose models
const categoryModels: Record<string, Model<IFindASpeaker>> = {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  await dbConnect();
  const { method } = req;
  const category = (req.query.category as string)?.toLowerCase();

  // Check if the category is valid
  const Model = categoryModels[category];
  if (!Model) {
    return res.status(400).json({
      success: false,
      message: "Invalid category",
    });
  }

  switch (method) {
    case "GET":
      try {
        const findASpeakers = await Model.find({});
        res.status(200).json({ success: true, data: findASpeakers });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    case "POST":
      try {
        const findASpeakerData = req.body;

        if (Array.isArray(findASpeakerData)) {
          // Filter out documents that already exist in the collection
          const names = findASpeakerData.map((data) => data.name);
          const existingDocuments = await Model.find({ name: { $in: names } });
          const existingNames = new Set(
            existingDocuments.map((doc) => doc.name)
          );
          const nonDuplicateData = findASpeakerData.filter(
            (data) => !existingNames.has(data.name)
          );

          if (nonDuplicateData.length === 0) {
            return res.status(400).json({
              success: false,
              message: "All provided data are duplicates.",
            });
          }

          // Insert non-duplicate data only
          const newFindASpeakers = (
            await Model.insertMany(nonDuplicateData)
          ).map((doc) => doc.toObject());
          res.status(201).json({ success: true, data: newFindASpeakers });
        } else {
          // Check for a duplicate in case of a single document
          const existingDocument = await Model.findOne({
            name: findASpeakerData.name,
          });
          if (existingDocument) {
            return res.status(400).json({
              success: false,
              message: `A speaker with the name "${findASpeakerData.name}" already exists.`,
            });
          }

          // Create the document if it's not a duplicate
          const newFindASpeaker = await Model.create(findASpeakerData);
          res
            .status(201)
            .json({ success: true, data: [newFindASpeaker.toObject()] });
        }
      } catch (error) {
        res
          .status(400)
          .json({ success: false, error: (error as Error).message });
      }
      break;

    case "DELETE":
      try {
        const { id } = req.body;
        if (!id || typeof id !== "string") {
          return res.status(400).json({
            success: false,
            message: "ID is required to delete a speaker.",
          });
        }

        // Check if the document exists
        const deletedSpeaker = await Model.findByIdAndDelete(id);
        if (!deletedSpeaker) {
          return res.status(404).json({
            success: false,
            message: "Speaker not found.",
          });
        }

        res.status(200).json({
          success: true,
          message: "Speaker deleted successfully.",
          data: [deletedSpeaker.toObject()],
        });
      } catch (error) {
        res.status(500).json({ success: false, error });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
