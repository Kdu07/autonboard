import { Readable } from 'stream';
import * as Excel from 'exceljs';
import { BadRequestError, UnprocessableEntityError } from '../../errors/HttpError';

export class ExcelReader {
  async read(buffer: Buffer, originalname: string): Promise<Excel.Worksheet> {
    if (!buffer || buffer.length === 0) {
      throw new BadRequestError('A non-empty file buffer is required to read the Excel file');
    }

    const extension = originalname.split('.').pop()?.toLowerCase();
    if (extension !== 'xlsx') {
      throw new BadRequestError('Only .xlsx files are supported in this endpoint');
    }

    const workbook = new Excel.Workbook();

    try {
      await workbook.xlsx.read(Readable.from(buffer));
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
