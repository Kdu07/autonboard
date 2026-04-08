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
// UploadController.ts
export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { customer_id, status } = req.body;
    const file = req.file;
    // Cast req to 'any' to bypass TS error, or extend the Express Request interface
    const fileBuffer = (req as any).fileBuffer; 

    const result = await UploadService.processUpload(file, Number(customer_id), status, fileBuffer);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
}


module.exports = {
  getAll,
  create,
};