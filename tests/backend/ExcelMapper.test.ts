import path from 'path';

import { ExcelReader } from '../../src/backend/services/excel/ExcelReader';
import { ExcelParser } from '../../src/backend/services/excel/ExcelParser';
import { ExcelValidator } from '../../src/backend/services/excel/ExcelValidator';
import { ExcelMapper } from '../../src/backend/services/excel/ExcelMapper';

describe('ExcelMapper', () => {
  it('should map parsed excel into domain model', async () => {
    const reader = new ExcelReader();
    const parser = new ExcelParser();
    const validator = new ExcelValidator();
    const mapper = new ExcelMapper();

    const filePath = path.resolve(
      process.cwd(),
      'src/uploads/Pessoal Bookable.xlsx'
    );

    const worksheet = await reader.read(filePath);
    const parsed = parser.parse(worksheet);

    expect(() => validator.validate(parsed)).not.toThrow();

    const mapped = mapper.map(parsed);

    expect(mapped).toBeDefined();

    expect(mapped.location.building).toBe('Equiem Tower - Right');
    expect(mapped.location.level).toBe(10);

    expect(mapped.details.amenityTitlePrimary).toBe('Conference Room');
    expect(mapped.details.amenityTitleSecondary).toBe('Bike');

    expect(mapped.rates.hourlyRatePrimary).toBe(50);
    expect(mapped.rates.hourlyRateSecondary).toBe(10);
    expect(mapped.rates.weekendHourlyRatePrimary).toBe(80);

    expect(mapped.permissions.approvalRequiredForBookingsPrimary).toBe('Yes');
    expect(mapped.permissions.approvalRequiredForBookingsSecondary).toBe('No');
  });

  it('should map null safely when optional values are missing', () => {
    const mapper = new ExcelMapper();

    const fakeParsed = {
      location: {
        building: ['Main Tower'],
        level: [12],
      },
      details: {
        amenity_title: ['Room A'],
        amenity_type: ['Meeting Room'],
        capacity: [8],
      },
      rates: {
        hourly_rate: [100],
      },
    };

    const mapped = mapper.map(fakeParsed);

    expect(mapped.location.building).toBe('Main Tower');
    expect(mapped.location.level).toBe(12);

    expect(mapped.details.amenityTitlePrimary).toBe('Room A');
    expect(mapped.details.amenityTitleSecondary).toBeNull();

    expect(mapped.rates.hourlyRatePrimary).toBe(100);
    expect(mapped.rates.hourlyRateSecondary).toBeNull();

    expect(mapped.configurations.roomConfigurationPrimary).toBeNull();
    expect(mapped.cancellationPermissions.cancellationPolicyPrimary).toBeNull();
  });

  it('should convert numeric strings to numbers when applicable', () => {
    const mapper = new ExcelMapper();

    const fakeParsed = {
      location: {
        building: ['Tower X'],
        level: ['15'],
      },
      details: {
        amenity_title: ['Room B'],
        amenity_type: ['Focus Room'],
        capacity: ['20'],
      },
      rates: {
        hourly_rate: ['250'],
        half_day_rate: ['400'],
      },
    };

    const mapped = mapper.map(fakeParsed);

    expect(mapped.location.level).toBe(15);
    expect(mapped.details.capacityPrimary).toBe(20);
    expect(mapped.rates.hourlyRatePrimary).toBe(250);
    expect(mapped.rates.halfDayRatePrimary).toBe(400);
  });
});
