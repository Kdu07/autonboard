// Global interfaces used across the backend

// Interface that defines the structure of the upload record
export interface IUpload {
  id: number;
  customer_id: number;
  status: string;
  file_path: string;
  upload_date: Date;
  mimetype: string;
  size: number;
}