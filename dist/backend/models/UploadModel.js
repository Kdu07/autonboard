// Importe o banco de dados (ajuste o caminho se necessário)
import db from '../../database/runDB/init';
class UploadModel {
    /**
     * Cria um novo registro de upload com o caminho do arquivo
     */
    static async create(customer_id, file_path) {
        const query = `
      INSERT INTO submission (customer_id, file_path, upload_date) 
      VALUES ($1, $2, NOW()) 
      RETURNING *
    `;
        const values = [customer_id, file_path];
        const result = await db.query(query, values);
        return result.rows[0];
    }
    /**
     * Retorna todos os registros de upload
     */
    static async getAll() {
        const query = 'SELECT * FROM submission';
        const result = await db.query(query);
        return result.rows;
    }
}
async function testCreate() {
    // Testa a criação de um novo upload
    const newUpload = await UploadModel.create(3, '/path/to/file.csv');
    console.log('Novo upload criado:', newUpload);
}
async function testGetAll() {
    // Testa a recuperação de todos os uploads
    const uploads = await UploadModel.getAll();
    console.log('Todos os uploads:', uploads);
}
testCreate();
// testGetAll();
export default UploadModel;
//# sourceMappingURL=UploadModel.js.map