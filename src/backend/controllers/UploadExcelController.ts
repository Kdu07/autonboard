import { Request, Response } from 'express';
import { UploadExcelService } from '../services/UploadExcelService';
import { BookableResourceRepository } from '../repositories/BookableResourceRepository';
import { normalizeHttpError } from '../errors/HttpError';

export class UploadExcelController {
  private readonly uploadExcelService: UploadExcelService;

  constructor(uploadExcelService?: UploadExcelService) {
    this.uploadExcelService =
      uploadExcelService ??
      new UploadExcelService({
        repository: new BookableResourceRepository(),
      });
  }

  upload = async (req: Request, res: Response): Promise<Response> => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'BAD_REQUEST',
            message: 'No file was uploaded. Use multipart/form-data with field "file".',
          },
        });
      }

      const result = await this.uploadExcelService.process({
        buffer: req.file.buffer,
        originalname: req.file.originalname,
      });

      return res.status(201).json({
        success: true,
        message: 'Excel processed successfully',
        data: {
          raw: result.raw,
          mapped: result.mapped,
          saved: result.saved,
        },
      });
    } catch (error) {
      const mappedError = normalizeHttpError(error);

      return res.status(mappedError.statusCode).json({
        success: false,
        error: {
          code: mappedError.code,
          message: mappedError.message,
          details: mappedError.details,
        },
      });
    }
  };
}
