import db from '../../database/config/db'
import { IUpload } from '../interfaces/global.interfaces';

class UploadModel {
  /**
   * Creates a new upload record with the file path
   */
  static async create(customer_id: number, file_path: string, status: string = 'pending'): Promise<IUpload> {
    // include status so the frontend can specify the submission state;
    // the database has a default so callers may omit it.
    const query = `
      INSERT INTO submission (customer_id, status, file_path, upload_date) 
      VALUES ($1, $2, $3, NOW()) 
      RETURNING *
    `;
    const values = [customer_id, status, file_path];
    
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