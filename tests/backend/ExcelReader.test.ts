import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import Excel from 'exceljs';
import { ExcelReader } from '../../src/backend/services/excel/ExcelReader';

async function createTempWorkbook(withSheet: boolean = true): Promise<string> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'excel-reader-'));
  const filePath = path.join(tempDir, 'input.xlsx');

  const workbook = new Excel.Workbook();
  if (withSheet) {
    workbook.addWorksheet('Sheet1').addRow(['location']);
  }

  await workbook.xlsx.writeFile(filePath);
  return filePath;
}

async function cleanupTempFile(filePath: string): Promise<void> {
  await fs.rm(path.dirname(filePath), { recursive: true, force: true });
}

describe('ExcelReader', () => {
  it('should read the first worksheet from a valid .xlsx file', async () => {
    const filePath = await createTempWorkbook(true);
    const reader = new ExcelReader();

    const worksheet = await reader.read(filePath);

    expect(worksheet).toBeDefined();
    expect(worksheet.name).toBe('Sheet1');

    await cleanupTempFile(filePath);
  });

  it('should throw when file does not exist', async () => {
    const reader = new ExcelReader();
    const filePath = path.join(process.cwd(), 'src/uploads/does-not-exist.xlsx');

    await expect(reader.read(filePath)).rejects.toThrow(
      'Uploaded file was not found on disk'
    );
  });

  it('should throw when extension is not .xlsx', async () => {
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'excel-reader-'));
    const wrongPath = path.join(tempDir, 'input.csv');
    await fs.writeFile(wrongPath, 'header,value');

    const reader = new ExcelReader();

    await expect(reader.read(wrongPath)).rejects.toThrow(
      'Only .xlsx files are supported in this endpoint'
    );

    await fs.rm(tempDir, { recursive: true, force: true });
  });
});
