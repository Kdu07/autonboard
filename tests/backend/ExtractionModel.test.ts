// Import
// Model that will be tested
// TypeScript interfaces to type-check our mock data
// Actual database configuration object
import { ExtractionModel } from '../../src/backend/models/ExtractionModel';
import * as I from '../../src/backend/interfaces/db.interfaces';
import db from '../../src/database/config/db';

// MOCKING: Whenever db.query is called in the model, use a fake function (jest.fn()) instead.
jest.mock('../../src/database/config/db', () => ({
    query: jest.fn(),
}));

describe('ExtractionModel', () => {
    // SETUP: Before every single test runs, clear any history on mock functions.
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('createCustomer', () => {
        // Complete mock object that represents what the DB should return
        const mockCustomer: I.ICustomer = {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            modules_enabled: { admin: true }
        };

        test('should insert a customer and return the first row', async () => {
            // ARRANGE: Tell fake database to successfully return the mockCustomer when queried.
            (db.query as jest.Mock).mockResolvedValue({
                rows: [mockCustomer],
            });

            // ACT: Call the actual method on ExtractionModel.
            const result = await ExtractionModel.createCustomer(
                'John Doe',
                'john@example.com',
                { admin: true }
            );

            // ASSERT: Verify that the model constructed the correct SQL string and passed the right variables.
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO customer'),
                ['John Doe', 'john@example.com', { admin: true }]
            );

            // ASSERT: Verify that the method returned the exact object the database handed back.
            expect(result).toEqual(mockCustomer);
        });

        test('should throw an error if the database query fails', async () => {
            // ARRANGE: Tell our fake database to simulate a crash/error.
            (db.query as jest.Mock).mockRejectedValue(new Error('DB Connection Failed'));

            // ACT & ASSERT: Verify that if the DB throws an error, the model passes that error up correctly.
            await expect(
                ExtractionModel.createCustomer('Fail', 'fail@test.com', null)
            ).rejects.toThrow('DB Connection Failed');
        });
    });

    describe('createBuilding', () => {
        const mockBuilding: I.IBuilding = {
            id: 1,
            customer_id: 1,
            name: 'Main HQ',
            type: 'Office',
            address: '123 Business Rd.',
            number_of_floors: 10,
            total_area: 50000,
            images_url: null
        };

        test('should insert a building and return the first row', async () => {
            (db.query as jest.Mock).mockResolvedValue({
                rows: [mockBuilding],
            });

            // Omit<'id'> is used because the database generates the ID, not the incoming payload.
            const buildingData: Omit<I.IBuilding, 'id'> = {
                customer_id: 1,
                name: 'Main HQ',
                type: 'Office',
                address: '123 Business Rd.',
                number_of_floors: 10,
                total_area: 50000,
                images_url: null
            };

            const result = await ExtractionModel.createBuilding(buildingData);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO building'),
                [1, 'Main HQ', 'Office', '123 Business Rd.', 10, 50000, null]
            );

            expect(result).toEqual(mockBuilding);
        });

        test('should handle missing optional fields gracefully using null', async () => {
            (db.query as jest.Mock).mockResolvedValue({
                rows: [{ id: 1, customer_id: 1, name: 'Minimal Building' }],
            });

            // ACT: Pass an object missing all the optional fields (like type, address, etc.)
            const minimalData = { customer_id: 1, name: 'Minimal Building' };

            await ExtractionModel.createBuilding(minimalData);

            // ASSERT: Verify that the model's (?? null) correctly replaced the missing fields with `null` values for the database array.
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO building'),
                [1, 'Minimal Building', null, null, null, null, null]
            );
        });

        test('should throw an error if the database query fails', async () => {
            (db.query as jest.Mock).mockRejectedValue(new Error('DB Connection Failed'));

            await expect(
                ExtractionModel.createBuilding({ customer_id: 1, name: 'Fail' })
            ).rejects.toThrow('DB Connection Failed');
        });
    });

    describe('createFloor', () => {
        const mockFloor: I.IFloor = {
            id: 1,
            building_id: 1,
            floor_number: 5,
            floor_area: 5000
        };

        test('should insert a floor and return the first row', async () => {
            (db.query as jest.Mock).mockResolvedValue({
                rows: [mockFloor],
            });

            const floorData: Omit<I.IFloor, 'id'> = {
                building_id: 1,
                floor_number: 5,
                floor_area: 5000
            };

            const result = await ExtractionModel.createFloor(floorData);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO floor'),
                [1, 5, 5000]
            );

            expect(result).toEqual(mockFloor);
        });

        test('should throw an error if the database query fails', async () => {
            (db.query as jest.Mock).mockRejectedValue(new Error('DB Error'));

            await expect(
                ExtractionModel.createFloor({ building_id: 1, floor_number: 1 })
            ).rejects.toThrow('DB Error');
        });
    });

    describe('createAmenity', () => {
        const mockAmenity: I.IAmenity = {
            id: 1,
            building_id: 1,
            floor_id: 2,
            parent_amenity_id: null,
            name: 'Conference Room A',
            type: 'Meeting Room',
            capacity: 12,
            area_m2: 30,
            images_url: null
        };

        test('should insert an amenity and return the first row', async () => {
            (db.query as jest.Mock).mockResolvedValue({
                rows: [mockAmenity],
            });

            const amenityData: Omit<I.IAmenity, 'id'> = {
                building_id: 1,
                floor_id: 2,
                parent_amenity_id: null,
                name: 'Conference Room A',
                type: 'Meeting Room',
                capacity: 12,
                area_m2: 30,
                images_url: null
            };

            const result = await ExtractionModel.createAmenity(amenityData);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO amenity'),
                [1, 2, null, 'Conference Room A', 'Meeting Room', 12, 30, null]
            );

            expect(result).toEqual(mockAmenity);
        });

        test('should throw an error if the database query fails', async () => {
            (db.query as jest.Mock).mockRejectedValue(new Error('DB Error'));

            await expect(
                ExtractionModel.createAmenity({ building_id: 1, name: 'Gym' })
            ).rejects.toThrow('DB Error');
        });
    });

    describe('createAmenityConfiguration', () => {
        const mockConfig: I.IAmenityConfiguration = {
            id: 1,
            amenity_id: 1,
            key: 'has_projector',
            value: 'true',
            reservable: false,
            image_url: null
        };

        test('should insert an amenity configuration and return the first row', async () => {
            (db.query as jest.Mock).mockResolvedValue({
                rows: [mockConfig],
            });

            const configData: Omit<I.IAmenityConfiguration, 'id'> = {
                amenity_id: 1,
                key: 'has_projector',
                value: 'true',
                reservable: false,
                image_url: null
            };

            const result = await ExtractionModel.createAmenityConfiguration(configData);

            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO amenity_configuration'),
                [1, 'has_projector', 'true', false, null]
            );

            expect(result).toEqual(mockConfig);
        });

        test('should apply default values correctly for optional fields missing from payload', async () => {
             (db.query as jest.Mock).mockResolvedValue({
                rows: [{ id: 1, amenity_id: 1, key: 'wifi', reservable: false }],
            });

            const minimalConfig = { amenity_id: 1, key: 'wifi', reservable: false };

            await ExtractionModel.createAmenityConfiguration(minimalConfig);

            // ASSERT: Verify that optional fields like `value` and `image_url` become `null` 
            // instead of `undefined` when passed to the database.
            expect(db.query).toHaveBeenCalledWith(
                expect.stringContaining('INSERT INTO amenity_configuration'),
                [1, 'wifi', null, false, null]
            );
        });

        test('should throw an error if the database query fails', async () => {
            (db.query as jest.Mock).mockRejectedValue(new Error('DB Error'));

            await expect(
                ExtractionModel.createAmenityConfiguration({ amenity_id: 1, key: 'test', reservable: true })
            ).rejects.toThrow('DB Error');
        });
    });
});