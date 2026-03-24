type ParsedExcel = {
  [section: string]: {
    [field: string]: any[];
  };
};

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

  validate(data: ParsedExcel): void {
    this.validateRequiredSections(data);
    this.validateRequiredFields(data);
    this.validateNonEmptyValues(data);
  }

  private validateRequiredSections(data: ParsedExcel): void {
    for (const section of this.requiredSections) {
      if (!data[section]) {
        throw new Error(`Missing required section: ${section}`);
      }
    }
  }

  private validateRequiredFields(data: ParsedExcel): void {
    for (const [section, fields] of Object.entries(this.requiredFieldsBySection)) {
      const sectionData = data[section];

      if (!sectionData) continue;

      for (const field of fields) {
        if (!(field in sectionData)) {
          throw new Error(`Missing required field "${field}" in section "${section}"`);
        }
      }
    }
  }

  private validateNonEmptyValues(data: ParsedExcel): void {
    for (const [section, fields] of Object.entries(this.requiredFieldsBySection)) {
      const sectionData = data[section];

      if (!sectionData) continue;

      for (const field of fields) {
        const values = sectionData[field];

        if (!Array.isArray(values) || values.length === 0) {
          throw new Error(`Field "${field}" in section "${section}" must contain at least one value`);
        }

        const hasMeaningfulValue = values.some(
          (value) => value !== null && value !== undefined && value !== ''
        );

        if (!hasMeaningfulValue) {
          throw new Error(`Field "${field}" in section "${section}" cannot be empty`);
        }
      }
    }
  }
}