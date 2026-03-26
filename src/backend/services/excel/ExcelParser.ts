import * as Excel from 'exceljs';
import { UnprocessableEntityError } from '../../errors/HttpError';
import { ParsedExcel } from './types';

export class ExcelParser {
  private readonly knownSections = new Set([
    'terms_conditions',
    'location',
    'details',
    'photos_videos',
    'rates',
    'configurations',
    'availability',
    'extras',
    'permissions',
    'additional_settings',
    'cancellation_permissions',
  ]);

  parse(worksheet: Excel.Worksheet): ParsedExcel {
    const result: ParsedExcel = {};
    let currentSection: string | null = null;

    if (worksheet.rowCount === 0) {
      throw new UnprocessableEntityError('Excel worksheet is empty');
    }

    worksheet.eachRow((row, rowNumber) => {
      const values = row.values as unknown[];

      const normalizedFirst = this.getNormalizedCellText(values[1]);
      if (!normalizedFirst) {
        return;
      }

      if (this.isKnownSection(normalizedFirst)) {
        currentSection = normalizedFirst;

        if (!result[currentSection]) {
          result[currentSection] = {};
        }

        return;
      }

      const rawFieldValues = values.slice(2);
      const parsedValues = rawFieldValues.map((value) => this.parseValue(value));

      const hasAnyMeaningfulValue = parsedValues.some(
        (value) => this.isMeaningfulValue(value)
      );
      const hasAnyProvidedValue = rawFieldValues.some((value) =>
        this.hasAnyProvidedValue(value)
      );

      if (!hasAnyMeaningfulValue && !hasAnyProvidedValue) {
        return;
      }

      if (!currentSection) {
        throw new UnprocessableEntityError(
          `Field "${normalizedFirst}" was found before a known section`,
          { rowNumber }
        );
      }

      result[currentSection][normalizedFirst] = parsedValues;
    });

    if (Object.keys(result).length === 0) {
      throw new UnprocessableEntityError(
        'No known sections were found in the uploaded Excel file'
      );
    }

    return result;
  }

  private getNormalizedCellText(value: unknown): string | null {
    const text = this.extractCellText(value);
    if (!text) {
      return null;
    }

    const normalized = this.normalize(text);
    return normalized || null;
  }

  private isKnownSection(section: string): boolean {
    return this.knownSections.has(section);
  }

  private extractCellText(value: unknown): string | null {
    if (value === null || value === undefined) return null;

    if (typeof value === 'string') {
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : null;
    }

    if (typeof value === 'number') return String(value);

    if (typeof value === 'boolean') return String(value);

    if (value instanceof Date) return value.toISOString();

    if (
      typeof value === 'object' &&
      value !== null &&
      'richText' in value &&
      Array.isArray((value as { richText: unknown[] }).richText)
    ) {
      const richText = (value as { richText: { text?: string }[] }).richText;
      const parsed = richText
        .map((part) => (typeof part.text === 'string' ? part.text : ''))
        .join('')
        .trim();
      return parsed.length > 0 ? parsed : null;
    }

    if (typeof value === 'object' && value !== null && 'text' in value) {
      const text = (value as { text?: unknown }).text;
      return typeof text === 'string' ? text.trim() : null;
    }

    if (typeof value === 'object' && value !== null && 'result' in value) {
      return this.extractCellText((value as { result?: unknown }).result);
    }

    return null;
  }

  private normalize(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s]/g, ' ')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  private parseValue(value: unknown): unknown {
    if (value === null || value === undefined) return null;

    if (
      typeof value === 'object' &&
      value !== null &&
      'richText' in value &&
      Array.isArray((value as { richText: unknown[] }).richText)
    ) {
      const richText = (value as { richText: { text?: string }[] }).richText;
      const parsed = richText
        .map((part) => (typeof part.text === 'string' ? part.text : ''))
        .join('')
        .trim();
      return this.isNormalizedNullString(parsed) ? null : parsed;
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    if (typeof value === 'object' && value !== null && 'result' in value) {
      return this.parseValue((value as { result?: unknown }).result);
    }

    if (typeof value === 'string') {
      const parsed = value.trim();
      return this.isNormalizedNullString(parsed) ? null : parsed;
    }

    if (
      typeof value === 'object' &&
      value !== null &&
      'text' in value &&
      typeof (value as { text?: unknown }).text === 'string'
    ) {
      const parsed = (value as { text: string }).text.trim();
      return this.isNormalizedNullString(parsed) ? null : parsed;
    }

    return value;
  }

  private isMeaningfulValue(value: unknown): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return true;
  }

  private isNormalizedNullString(value: string): boolean {
    const normalized = value.trim().toLowerCase();
    return normalized.length === 0 || normalized === 'n/a' || normalized === 'na';
  }

  private hasAnyProvidedValue(value: unknown): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      return value.trim().length > 0;
    }

    return true;
  }
}
