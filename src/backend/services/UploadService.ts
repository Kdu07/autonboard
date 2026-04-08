// Directly import your Model
import UploadModel from '../models/UploadModel';
import { IUpload } from '../interfaces/db.interfaces';
import { BadRequestError, InternalServerError } from '../errors/HttpError';

export class UploadService {
  
  /**
   * Receives the multer file object, the customer ID and a status value,
   * performs basic validations and delegates persistence to the model.
   */
  static async processUpload(
    file: Express.Multer.File | undefined,
    customerId: number,
    status: string = 'pending',
    fileBuffer: Buffer
  ){
    // Ensure the file was actually received
    if (!file) {
      throw new BadRequestError('Nenhum arquivo foi enviado.');
    }

    // Define accepted formats
    const allowedTypes = [
      'text/csv',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      'application/vnd.ms-excel' // Old XLS
    ];

    // Validate file format
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestError('Formato inválido. Envie apenas arquivos CSV ou Excel (.csv, .xlsx, .xls).');
    }

    // Ensure the file is not empty (0 bytes)
    if (file.size === 0) {
      throw new BadRequestError('O arquivo enviado está vazio.');
    }

    // Validate customerId is a positive integer
    if (!Number.isInteger(customerId) || customerId <= 0) {
      throw new BadRequestError('O campo customer_id deve ser um número inteiro positivo válido.');
    }

    console.log(`[Backend Service] Starting model create for customerId: ${customerId}`);
    const fileType = file.mimetype;

    // Call the Model to save to the database including status
    try {
      const savedUpload = await UploadModel.create(customerId, status, fileBuffer, fileType);
      console.log(`[Backend Service] Model create finished. Saved ID: ${savedUpload?.id || 'none'}`);
      return savedUpload;
    } catch (error: any) {
      console.error('[UploadService] Database error during upload creation:', error);
      throw new InternalServerError('Falha ao salvar o arquivo no banco de dados. Tente novamente.');
    }
  }

  static async getAll(): Promise<IUpload[]> {
    try {
      const result = await UploadModel.getAll();
      return result;
    } catch (error: any) {
      console.error('[UploadService] Database error fetching uploads:', error);
      throw new InternalServerError('Falha ao buscar registros de upload do banco de dados.');
    }
  }
}
