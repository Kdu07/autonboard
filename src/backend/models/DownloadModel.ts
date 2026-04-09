import db from '../../database/config/db';
import { IUpload } from '../interfaces/db.interfaces';
import { InternalServerError, NotFoundError } from '../errors/HttpError';

class DownloadModel {
  static async getById(id: number): Promise<IUpload> {
    const query = 'SELECT * FROM submission WHERE id = $1';
    try {
      const result = await db.query(query, [id]);
      if (!result.rows[0]) throw new NotFoundError(`Submission ${id} not found.`);
      return result.rows[0];
    } catch (error: any) {
      if (error instanceof NotFoundError) throw error;
      console.error('[DownloadModel] Failed to fetch submission:', error);
      throw new InternalServerError('Erro ao buscar arquivo no banco de dados.', { pgCode: error.code });
    }
  }
}

export default DownloadModel;
