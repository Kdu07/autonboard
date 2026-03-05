import db from '../../database/runDB/init';
import { IUpload } from '../interfaces/global.interfaces';

class UploadModel {
  /**
   * Creates a new upload record with the file path
   */
  static async create(customer_id: number, file_path: string): Promise<IUpload> {
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
   * Returns all upload records
   */
  static async getAll(): Promise<IUpload[]> {
    const query = 'SELECT * FROM submission';
    const result = await db.query(query);
    return result.rows;
  }
}

export default UploadModel;