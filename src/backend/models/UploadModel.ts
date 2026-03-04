// Importe o banco de dados (ajuste o caminho se necessário)
import db from '../../database/runDB/init';

// Interface que define a estrutura da tabela no banco
export interface Submission {
  id: number;
  customer_id: number;
  status: string;
  file_path: string;
  upload_date: Date;
}

class UploadModel {
  /**
   * Cria um novo registro de upload com o caminho do arquivo
   */
  static async create(customer_id: number, file_path: string): Promise<Submission> {
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
  static async getAll(): Promise<Submission[]> {
    const query = 'SELECT * FROM submission';
    const result = await db.query(query);
    return result.rows;
  }
}

export default UploadModel;