
import * as Excel from 'exceljs'
import { ExcelParser } from './ExcelParser';

export class ExcelReader {

    async read(path: string): Promise<Excel.Worksheet> {
        const workbook = new Excel.Workbook()
        await workbook.xlsx.readFile(path);

        const worksheet: Excel.Worksheet | undefined = workbook.getWorksheet(1);

        if (!worksheet) {
            throw new Error('Worksheet não encontrada');
        }

        return worksheet
    }

}