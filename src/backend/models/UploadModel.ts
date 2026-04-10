import db from "../../database/config/db";
import { IUpload } from "../interfaces/db.interfaces";

class UploadModel {
  /**
   * Creates a new upload record storing the file content as bytea.
   */
  static async create(
    customer_id: number,
    file_buffer: Buffer,
    file_type: string,
    file_name: string,
    status: string = "pending",
  ): Promise<IUpload> {
    const query = `
      INSERT INTO submission (customer_id, status, file, file_type, file_name, upload_date)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;
    const values = [customer_id, status, file_buffer, file_type, file_name];

    const result = await db.query(query, values);
    return result.rows[0];
  }

  /**
   * Returns all upload records
   */
  static async getAll(): Promise<IUpload[]> {
    const query = "SELECT * FROM submission";
    const result = await db.query(query);
    return result.rows;
  }
}

export default UploadModel;
