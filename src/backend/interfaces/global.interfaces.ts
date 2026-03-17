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

export type UserRole = "admin" | "user";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
}

export interface IAuthTokenPayload {
  sub: number;
  email: string;
  role: UserRole;
}