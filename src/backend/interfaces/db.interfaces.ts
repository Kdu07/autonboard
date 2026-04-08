// Global interfaces used across the backend

// Interface that defines the structure of the upload record
export interface IUpload {
  id: number;
  customer_id: number;
  status: string;
  file: Buffer;
  file_type: string;
  upload_date: Date;
  size: number;
}

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  modules_enabled: Record<string, any> | null;
}

export interface IBuilding {
  id: number;
  customer_id: number;
  name: string;
  type?: string | null;
  address?: string | null;
  number_of_floors?: number | null;
  total_area?: number | null;
  images_url?: string[] | Record<string, any> | null;
}

export interface IFloor {
  id: number;
  building_id: number;
  floor_number: number;
  floor_area?: number | null;
}

export interface IAmenity {
  id: number;
  building_id: number;
  floor_id?: number | null;
  parent_amenity_id?: number | null; 
  name: string;
  type?: string | null;
  capacity?: number | null;
  area_m2?: number | null;
  images_url?: string[] | Record<string, any> | null;
}

export interface IAmenityConfiguration {
  id: number;
  amenity_id: number;
  key: string;
  value?: string | null;
  reservable: boolean;
  image_url?: string | null;
}