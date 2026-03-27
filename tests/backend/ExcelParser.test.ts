import Excel from 'exceljs';
import { ExcelParser } from '../../src/backend/services/excel/ExcelParser';

describe('ExcelParser', () => {
  it('should parse richText, Date and N/A values consistently', () => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const parser = new ExcelParser();

    worksheet.addRow(['location']);
    worksheet.addRow([{ richText: [{ text: 'building' }] }, 'Tower A']);
    worksheet.addRow(['details']);
    worksheet.addRow(['amenity title', { richText: [{ text: 'Conference Room' }] }]);
    worksheet.addRow(['rates']);
    worksheet.addRow(['hourly rate', 100]);
    worksheet.addRow(['weekend hourly rate', 'N/A']);
    worksheet.addRow(['available from time', new Date('2026-01-01T09:00:00.000Z')]);

    const parsed = parser.parse(worksheet);

    expect(parsed.location.building[0]).toBe('Tower A');
    expect(parsed.details.amenity_title[0]).toBe('Conference Room');
    expect(parsed.rates.hourly_rate[0]).toBe(100);
    expect(parsed.rates.weekend_hourly_rate).toEqual([null]);
    expect(parsed.rates.available_from_time[0]).toBe('2026-01-01T09:00:00.000Z');
  });

  it('should not generate invalid keys such as object_object', () => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const parser = new ExcelParser();

    worksheet.addRow(['location']);
    worksheet.addRow(['building', 'Tower A']);
    worksheet.addRow([{ foo: 'bar' } as any, 'wrong']);

    const parsed = parser.parse(worksheet);

    expect(parsed.location.object_object).toBeUndefined();
    expect(Object.keys(parsed.location)).toEqual(['building']);
  });

  it('should fail fast when a field appears before any section', () => {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    const parser = new ExcelParser();

    worksheet.addRow(['building', 'Tower A']);

    expect(() => parser.parse(worksheet)).toThrow('before a known section');
  });
});
