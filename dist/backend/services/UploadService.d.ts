import { IUpload } from '../interfaces/global.interfaces';
export declare class UploadService {
    /**
     * Receives the file and customer ID, validates them, and sends them to the database.
     */
    static processUpload(file: IUpload, customerId: number): Promise<IUpload>;
}
//# sourceMappingURL=UploadService.d.ts.map