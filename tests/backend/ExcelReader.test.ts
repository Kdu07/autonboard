import path from 'path';
import { ExcelReader } from '../../src/backend/services/excel/ExcelReader';
import { ExcelParser } from '../../src/backend/services/excel/ExcelParser';
import { ExcelValidator } from '../../src/backend/services/excel/ExcelValidator';

describe('ExcelValidator', () => {
  it('should validate a valid parsed excel', async () => {
    const reader = new ExcelReader();
    const parser = new ExcelParser();
    const validator = new ExcelValidator();

    const filePath = path.resolve(
      process.cwd(),
      'src/uploads/Pessoal Bookable.xlsx'
    );

    const worksheet = await reader.read(filePath);
    const parsed = parser.parse(worksheet);

    expect(() => validator.validate(parsed)).not.toThrow();
  });
});
