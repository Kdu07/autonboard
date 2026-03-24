import * as Excel from 'exceljs';

type ParsedExcel = {
  [section: string]: {
    [field: string]: any[];
  };
};

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
    let currentSection = '';

    worksheet.eachRow((row) => {
      const values = row.values as any[];

      const first = this.extractCellText(values[1]);
      if (!first) return;

      const normalizedFirst = this.normalize(first);

      if (this.isKnownSection(normalizedFirst)) {
        currentSection = normalizedFirst;

        if (!result[currentSection]) {
          result[currentSection] = {};
        }

        return;
      }

      if (!currentSection) return;

      const parsedValues = values
        .slice(2)
        .map((value) => this.parseValue(value));

      const hasAnyMeaningfulValue = parsedValues.some(
        (value) => value !== null && value !== ''
      );

      if (!hasAnyMeaningfulValue) return;

      result[currentSection][normalizedFirst] = parsedValues;
    });

    return result;
  }

  private isKnownSection(section: string): boolean {
    return this.knownSections.has(section);
  }

  private extractCellText(value: any): string | null {
    if (value === null || value === undefined) return null;

    if (typeof value === 'string') return value.trim();

    if (typeof value === 'number') return String(value);

    if (value instanceof Date) return value.toISOString();

    if (value?.richText) {
      return value.richText.map((part: any) => part.text).join('').trim();
    }

    return String(value).trim();
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

  private parseValue(value: any): any {
    if (value === null || value === undefined) return null;

    if (value === 'N/A') return null;

    if (value?.richText) {
      return value.richText.map((part: any) => part.text).join('').trim();
    }

    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  }
}

