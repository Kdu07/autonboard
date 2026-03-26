import { ValidationError } from '../../errors/HttpError';
import { ParsedExcel } from './types';

export class ExcelValidator {
  private readonly requiredSections = [
    'location',
    'details',
    'rates',
  ];

  private readonly requiredFieldsBySection: Record<string, string[]> = {
    location: ['building', 'level'],
    details: ['amenity_title', 'amenity_type', 'capacity'],
    rates: ['hourly_rate'],
  };

  private readonly numericFieldsBySection: Record<string, string[]> = {
    location: ['level'],
    details: ['capacity'],
    rates: ['hourly_rate'],
  };

  validate(data: ParsedExcel): void {
    if (!data || typeof data !== 'object' || Object.keys(data).length === 0) {
      throw new ValidationError('Uploaded Excel does not contain structured data');
    }

    this.validateRequiredSections(data);
    this.validateRequiredFields(data);
    this.validateNonEmptyValues(data);
    this.validateNumericFields(data);
  }

  private validateRequiredSections(data: ParsedExcel): void {
    for (const section of this.requiredSections) {
      if (!data[section]) {
        throw new ValidationError(`Missing required section "${section}"`);
      }
    }
  }

  private validateRequiredFields(data: ParsedExcel): void {
    for (const [section, fields] of Object.entries(this.requiredFieldsBySection)) {
      const sectionData = data[section];

      if (!sectionData) continue;

      for (const field of fields) {
        if (!(field in sectionData)) {
          throw new ValidationError(
            `Missing required field "${field}" in section "${section}"`
          );
        }
      }
    }
  }

  private validateNonEmptyValues(data: ParsedExcel): void {
    for (const [section, fields] of Object.entries(this.requiredFieldsBySection)) {
      const sectionData = data[section];

      if (!sectionData) continue;

      for (const field of fields) {
        const values = sectionData[field] as unknown[] | undefined;

        if (!Array.isArray(values) || values.length === 0) {
          throw new ValidationError(
            `Field "${field}" in section "${section}" must contain at least one value`
          );
        }

        const hasMeaningfulValue = values.some((value) => this.isMeaningful(value));

        if (!hasMeaningfulValue) {
          throw new ValidationError(
            `Field "${field}" in section "${section}" cannot be empty`
          );
        }
      }
    }
  }

  private validateNumericFields(data: ParsedExcel): void {
    for (const [section, fields] of Object.entries(this.numericFieldsBySection)) {
      const sectionData = data[section];

      if (!sectionData) {
        continue;
      }

      for (const field of fields) {
        const values = sectionData[field] as unknown[] | undefined;
        if (!Array.isArray(values)) {
          continue;
        }

        const meaningfulValues = values.filter((value) => this.isMeaningful(value));

        if (meaningfulValues.length === 0) {
          continue;
        }

        const hasNumberValue = meaningfulValues.some(
          (value) => this.coerceToNumber(value) !== null
        );

        if (!hasNumberValue) {
          throw new ValidationError(
            `Field "${field}" in section "${section}" must contain a valid numeric value`
          );
        }
      }
    }
  }

  private isMeaningful(value: unknown): boolean {
    if (value === null || value === undefined) {
      return false;
    }

    if (typeof value === 'string') {
      const normalized = value.trim().toLowerCase();
      return normalized.length > 0 && normalized !== 'n/a' && normalized !== 'na';
    }

    return true;
  }

  private coerceToNumber(value: unknown): number | null {
    if (typeof value === 'number') {
      return Number.isFinite(value) ? value : null;
    }

    if (typeof value !== 'string') {
      return null;
    }

    const cleaned = value.replace(/[^\d,.-]/g, '').replace(',', '.');
    if (!cleaned) {
      return null;
    }

    const parsed = Number(cleaned);
    return Number.isNaN(parsed) ? null : parsed;
  }
}
