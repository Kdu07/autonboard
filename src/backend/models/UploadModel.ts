import db from '../../database/config/db'
import { IUpload } from '../interfaces/db.interfaces';

class UploadModel {
  /**
   * Creates a new upload record with the file path
   */
  static async create(customer_id: number, status: string = 'pending', file_buffer: Buffer, file_type: string,): Promise<IUpload> {
    // include status so the frontend can specify the submission state;
    // the database has a default so callers may omit it.
    const query = `
      INSERT INTO submission (customer_id, status, file, file_type, upload_date) 
      VALUES ($1, $2, $3, $4, NOW()) 
      RETURNING *
    `;
    const values = [customer_id, status, file_buffer, file_type];
    
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