export interface Submission {
    id: number;
    customer_id: number;
    status: string;
    file_path: string;
    upload_date: Date;
}
declare class UploadModel {
    /**
     * Cria um novo registro de upload com o caminho do arquivo
     */
    static create(customer_id: number, file_path: string): Promise<Submission>;
    /**
     * Retorna todos os registros de upload
     */
    static getAll(): Promise<Submission[]>;
}
export default UploadModel;
//# sourceMappingURL=UploadModel.d.ts.map