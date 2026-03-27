import fs from 'fs';
import path from 'path';
import * as Excel from 'exceljs';
import { BadRequestError, UnprocessableEntityError } from '../../errors/HttpError';

export class ExcelReader {
  async read(filePath: string): Promise<Excel.Worksheet> {
    if (!filePath) {
      throw new BadRequestError('A file path is required to read the Excel file');
    }

    const extension = path.extname(filePath).toLowerCase();
    if (extension !== '.xlsx') {
      throw new BadRequestError('Only .xlsx files are supported in this endpoint');
    }

    if (!fs.existsSync(filePath)) {
      throw new BadRequestError('Uploaded file was not found on disk', { filePath });
    }

    const workbook = new Excel.Workbook();

    try {
      await workbook.xlsx.readFile(filePath);
    } catch (error) {
      throw new UnprocessableEntityError('Unable to read the Excel workbook', error);
    }

    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new UnprocessableEntityError('Workbook does not contain a worksheet');
    }

    return worksheet;
  }
}
