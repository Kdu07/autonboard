import { IUpload } from '../interfaces/global.interfaces';
export declare class UploadService {
    /**
     * Receives the multer file object, the customer ID and a status value,
     * performs basic validations and delegates persistence to the model.
     */
    static processUpload(file: Express.Multer.File | undefined, customerId: number, status?: string): Promise<IUpload>;
}
//# sourceMappingURL=UploadService.d.ts.map