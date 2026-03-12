import { Request, Response } from "express";
import { UploadService } from "../services/UploadService";
import uploadModel from "../models/UploadModel";

export async function getAll(req: Request, res: Response): Promise<Response> {
  try {
    const rows = await uploadModel.getAll();
    return res.json(rows);
  } catch (error) {
    return res.json(error);
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { customer_id, status } = req.body;
    const file = req.file;

    const result = await UploadService.processUpload(file, Number(customer_id), status);
    return res.json(result);
  } catch (error) {
    return res.json(error);
  }
}


module.exports = {
  getAll,
  create,
};
