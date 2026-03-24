
import * as Excel from 'exceljs'

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

async function main(){
    const excelReader = new ExcelReader();

    const filePath = 'src/uploads/Pessoal Bookable.xlsx';

    const worksheet = await excelReader.read(filePath);

     worksheet.eachRow((row, rowNumber) => {
        console.log(row.values);
    });
}

main();

// rodar aqruivo: npx ts-node src/backend/ExcelReader.ts