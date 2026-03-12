import { IUpload } from '../interfaces/global.interfaces';
declare class UploadModel {
    /**
     * Creates a new upload record with the file path
     */
    static create(customer_id: number, file_path: string, status?: string): Promise<IUpload>;
    /**
     * Returns all upload records
     */
    static getAll(): Promise<IUpload[]>;
}
export default UploadModel;
//# sourceMappingURL=UploadModel.d.ts.map