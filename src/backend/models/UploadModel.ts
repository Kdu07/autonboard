import db from '../../database/config/db'
import { IUpload } from '../interfaces/db.interfaces';
import { InternalServerError } from '../errors/HttpError';

class UploadModel {
  /**
   * Creates a new upload record with the file path
   */
  static async create(customer_id: number, status: string = 'pending', file_buffer: Buffer, file_type: string, file_name?: string): Promise<IUpload> {
    const query = `
      INSERT INTO submission (customer_id, status, file, file_type, file_name, upload_date)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
    const values = [customer_id, status, file_buffer, file_type, file_name ?? null];

    try {
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      console.error('[UploadModel] Failed to insert submission record:', error);
      throw new InternalServerError(
        'Erro ao inserir o registro de upload no banco de dados.',
        { pgCode: error.code, detail: error.detail }
      );
    }
  }

  /**
   * Returns all upload records
   */
  static async getAll(): Promise<IUpload[]> {
    const query = `
      SELECT s.id, s.customer_id, s.status, s.file_type, s.file_name, s.upload_date,
             c.name AS customer_name
      FROM submission s
      JOIN customer c ON s.customer_id = c.id
      ORDER BY s.upload_date DESC
    `;
    try {
      const result = await db.query(query);
      return result.rows;
    } catch (error: any) {
      console.error('[UploadModel] Failed to fetch submissions:', error);
      throw new InternalServerError(
        'Erro ao buscar registros de upload do banco de dados.',
        { pgCode: error.code }
      );
    }
  }
}

export default UploadModel;