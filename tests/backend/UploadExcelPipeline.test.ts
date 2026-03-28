import fs from 'fs/promises';
import os from 'os';
import path from 'path';
import Excel from 'exceljs';
import { UploadExcelService } from '../../src/backend/services/UploadExcelService';
import { IBookableResourceRepository } from '../../src/backend/repositories/IBookableResourceRepository';
import { BookableResourceModel } from '../../src/backend/models/BookableResourceModel';

class InMemoryBookableResourceRepository implements IBookableResourceRepository {
  public readonly save = jest.fn(
    async (resource: BookableResourceModel): Promise<BookableResourceModel> =>
      structuredClone(resource)
  );
}

async function createWorkbook(rows: unknown[][]): Promise<string> {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'upload-excel-'));
  const filePath = path.join(tempDir, 'input.xlsx');

  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  rows.forEach((row) => worksheet.addRow(row));
  await workbook.xlsx.writeFile(filePath);

  return filePath;
}

async function cleanupWorkbook(filePath: string): Promise<void> {
  await fs.rm(path.dirname(filePath), { recursive: true, force: true });
}

function buildValidRows(): unknown[][] {
  return [
    ['location'],
    ['building', 'Tower A'],
    ['level', '10'],
    ['details'],
    ['amenity title', 'Conference Room'],
    ['amenity type', 'Meeting Room'],
    ['capacity', '20'],
    ['rates'],
    ['hourly rate', '150'],
    ['weekend hourly rate', '£180'],
  ];
}

describe('UploadExcelService pipeline', () => {
  it('should process a valid Excel upload end-to-end', async () => {
    const repository = new InMemoryBookableResourceRepository();
    const service = new UploadExcelService({ repository });
    const filePath = await createWorkbook(buildValidRows());

    const result = await service.process({ filePath });

    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result.raw.location.building[0]).toBe('Tower A');
    expect(result.mapped.location.level).toBe(10);
    expect(result.mapped.rates.hourlyRatePrimary).toBe(150);
    expect(result.mapped.rates.weekendHourlyRatePrimary).toBe(180);
    expect(result.saved.details.amenityTitlePrimary).toBe('Conference Room');

    await cleanupWorkbook(filePath);
  });

  it('should fail when field appears before any known section', async () => {
    const repository = new InMemoryBookableResourceRepository();
    const service = new UploadExcelService({ repository });
    const filePath = await createWorkbook([
      ['building', 'Tower A'],
      ...buildValidRows(),
    ]);

    await expect(service.process({ filePath })).rejects.toThrow(
      'before a known section'
    );

    await cleanupWorkbook(filePath);
  });

  it('should fail when required fields are missing', async () => {
    const repository = new InMemoryBookableResourceRepository();
    const service = new UploadExcelService({ repository });
    const rows = buildValidRows().filter((row) => row[0] !== 'capacity');
    const filePath = await createWorkbook(rows);

    await expect(service.process({ filePath })).rejects.toThrow(
      'Missing required field "capacity" in section "details"'
    );

    await cleanupWorkbook(filePath);
  });

  it('should fail when required values are null-like (N/A)', async () => {
    const repository = new InMemoryBookableResourceRepository();
    const service = new UploadExcelService({ repository });
    const rows = buildValidRows().map((row) =>
      row[0] === 'hourly rate' ? ['hourly rate', 'N/A'] : row
    );
    const filePath = await createWorkbook(rows);

    await expect(service.process({ filePath })).rejects.toThrow(
      'Field "hourly_rate" in section "rates" cannot be empty'
    );

    await cleanupWorkbook(filePath);
  });
});
