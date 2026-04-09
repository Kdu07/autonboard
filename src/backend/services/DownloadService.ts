import DownloadModel from '../models/DownloadModel';
import { IUpload } from '../interfaces/db.interfaces';

export class DownloadService {
  static async getById(id: number): Promise<IUpload> {
    return DownloadModel.getById(id);
  }
}
