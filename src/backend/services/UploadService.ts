// Directly import your Model
import UploadModel from '../models/UploadModel';
import { IUpload } from '../interfaces/global.interfaces';

export class UploadService {
  
  /**
   * Receives the file and customer ID, validates them, and sends them to the database.
   */
  static async processUpload(file: IUpload, customerId: number) {
    
    // Ensure the file was actually received
    if (!file) {
      throw new Error('No file was uploaded.');
    }

    // Define accepted formats
    const allowedTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      'application/vnd.ms-excel' // Old XLS
    ];

    // Validate file format
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Invalid format. Please upload only CSV or Excel files.');
    }

    // Ensure the file is not empty (0 bytes)
    if (file.size === 0) {
      throw new Error('The uploaded file is empty.');
    }

    // Call the Model to save to the database
    const savedUpload = await UploadModel.create(customerId, file.file_path);

    // Return the result to the caller (the Controller)
    return savedUpload;
  }
}