import { isAllowedExcelFile } from '../../src/backend/middleware/uploadExcel.middleware';

describe('uploadExcel middleware', () => {
  it('should accept valid .xlsx file by mimetype', () => {
    expect(
      isAllowedExcelFile({
        mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        originalname: 'resource.bin',
      })
    ).toBe(true);
  });

  it('should accept valid .xlsx file by extension', () => {
    expect(
      isAllowedExcelFile({
        mimetype: 'application/octet-stream',
        originalname: 'resource.xlsx',
      })
    ).toBe(true);
  });

  it('should reject non-excel file', () => {
    expect(
      isAllowedExcelFile({
        mimetype: 'application/pdf',
        originalname: 'resource.pdf',
      })
    ).toBe(false);
  });
});
