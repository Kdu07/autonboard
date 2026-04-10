// Directly import your Model
import UploadModel from "../models/UploadModel";
import { IUpload } from "../interfaces/db.interfaces";

export class UploadService {
  /**
   * Receives the multer file object, the customer ID and a status value,
   * performs basic validations and delegates persistence to the model.
   */
  static async processUpload(
    file: Express.Multer.File | undefined,
    customerId: number,
    status: string = "pending",
  ) {
    try {
      // Ensure the file was actually received
      if (!file) {
        throw new Error("No file was uploaded.");
      }

      // Define accepted formats
      const allowedTypes = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // XLSX
        "application/vnd.ms-excel", // Old XLS
      ];

      // Validate file format
      if (!allowedTypes.includes(file.mimetype)) {
        throw new Error(
          "Invalid format. Please upload only CSV or Excel files.",
        );
      }

      // Ensure the file is not empty (0 bytes)
      if (file.size === 0) {
        throw new Error("The uploaded file is empty.");
      }

      console.log(
        `[Backend Service] Starting model create for customerId: ${customerId}`,
      );

      // Call the Model to save to the database including status
      const savedUpload = await UploadModel.create(
        customerId,
        file.path,
        status,
      );

      console.log(
        `[Backend Service] Model create finished. Saved ID: ${savedUpload?.id || "none"}`,
      );

      // Return the result to the caller (the Controller)
      return savedUpload;
    } catch (error) {
      console.error("[Backend Service] Error in processUpload:", error);
      throw error;
    }
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
