import { ExcelReader } from '../../src/backend/services/ExcelReader';
import path from 'path';

describe('ExcelReader', () => {

    it('deve ler um arquivo excel', async() => {

        const reader = new ExcelReader()

        const filePath = path.resolve(
            process.cwd(),
            'src/uploads/Pessoal Bookable.xlsx'
        );

        const worksheet = await reader.read(filePath)
        expect(worksheet).toBeDefined();
        expect(worksheet.rowCount).toBeGreaterThan(0);
    });
})