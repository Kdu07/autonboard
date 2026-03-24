import path from 'path';

import { ExcelReader } from '../services/excel/ExcelReader';
import { ExcelParser } from '../services/excel/ExcelParser';
//import { ExcelValidator } from '../services/excel/ExcelValidator';

async function main() {
  const reader = new ExcelReader();
  const parser = new ExcelParser();
  //const validator = new ExcelValidator();

  const filePath = path.resolve(
    process.cwd(),
    'src/uploads/Pessoal Bookable.xlsx'
  );

  const worksheet = await reader.read(filePath);

  const parsed = parser.parse(worksheet);

  //validator.validate(parsed);

  console.log(JSON.stringify(parsed, null, 2));
}

main();

// npx ts-node src/backend/scripts/testExcel.ts