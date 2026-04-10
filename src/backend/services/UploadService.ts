import UploadModel from "../models/UploadModel";
import { IUpload } from "../interfaces/db.interfaces";

export class UploadService {
  /**
   * Receives the multer file object (memory storage), the customer ID and a
   * status value, performs basic validations and delegates persistence to the model.
   */
  static async processUpload(
    file: Express.Multer.File | undefined,
    customerId: number,
    status: string = "pending",
  ): Promise<IUpload> {
    if (!file) {
      throw new Error("No file was uploaded.");
    }

    const allowedTypes = [
      "text/csv",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error("Invalid format. Please upload only CSV or Excel files.");
    }

    if (file.size === 0) {
      throw new Error("The uploaded file is empty.");
    }

    console.log(`[Backend Service] Starting model create for customerId: ${customerId}`);

    const savedUpload = await UploadModel.create(
      customerId,
      file.buffer,
      file.mimetype,
      file.originalname,
      status,
    );

    console.log(`[Backend Service] Model create finished. Saved ID: ${savedUpload?.id || "none"}`);

    return savedUpload;
  }

  static async getAll() {
    try {
      const result = await UploadModel.getAll();
      return result;
    } catch (error) {
      console.error("[Backend Service] Error in getAll:", error);
      throw error;
    }
  }
}
