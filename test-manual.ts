import { UploadService } from "./src/backend/services/UploadService";

async function main() {
  const result = await UploadService.getAll();
  
  const quantidadeLinhas = result.length;
  console.log(`--- Total de linhas encontradas: ${quantidadeLinhas} ---`);

  const filteredResult = result.map(({ id, customer_id, status, file_type, upload_date }) => ({
    id,
    customer_id,
    status,
    file_type,
    upload_date
  }));

  console.log(JSON.stringify(filteredResult, null, 2));
}

main().catch(console.error);