import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import uploadModel from "../models/UploadModel";

/**
 * Retrieves all upload records from the database
 */
export async function getAll(req: Request, res: Response): Promise<Response> {
  try {
    const result = await UploadService.getAll();
    return res.status(200).json(result);
  } catch (error) {
    // Return the raw error object if the database query fails
    return res.json(error);
  }
}

/**
 * Handles the creation of a new upload by coordinating the service layer
 */
export async function create(req: Request, res: Response): Promise<Response> {
  try {
    // Extract metadata from the request body and the file from multer
    const { customer_id, status } = req.body;
    const file = req.file;

    // Delegate business logic and file processing to the UploadService
    const result = await UploadService.processUpload(file, Number(customer_id), status);
    return res.json(result);
  } catch (error) {
    // Return the error encountered during the upload or parsing process
    return res.json(error);
  }
}


module.exports = {
  getAll,
  create,
};