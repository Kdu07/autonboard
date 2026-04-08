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

    console.log(`[Backend Controller] Incoming upload request for customer_id: ${customer_id}, status: ${status}`);
    const result = await UploadService.processUpload(file, Number(customer_id), status, fileBuffer);
    console.log(`[Backend Controller] Upload processed. Result ID: ${result?.id || 'none'}`);
    
    if (!result) {
      return res.status(404).json({ error: "Failed to create submission record." });
    }

    return res.status(201).json(result);
  } catch (error: any) {
    console.error("Upload Error:", error);
    return res.status(error.status || 500).json({ 
      error: error.message || "Internal Server Error" 
    });
  }
}


module.exports = {
  getAll,
  create,
};