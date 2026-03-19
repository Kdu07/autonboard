import { values } from 'pdf-lib';
import db from '../../database/config/db'
import * as Interfaces from '../interfaces/db.interfaces';

export class ExtractionModel {
    static async createCustomer(name: string, email: string, modules_enabled: Record<string, any> | null): Promise<Interfaces.ICustomer> {
        const sql = `
        INSERT INTO customer (name, email, modules_enabled)
        VALUES ($1, $2, $3)
        RETURNING *;
        `;
        const { rows } = await db.query(sql, [name, email, modules_enabled]);
        return rows[0];
    }


    static async createBuilding(data: Omit<Interfaces.IBuilding, 'id'>): Promise<Interfaces.IBuilding> {
        const sql = `
            INSERT INTO building (
                customer_id, name, type, address, 
                number_of_floors, total_area, images_url
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
        const values = [
            data.customer_id,
            data.name,
            data.type ?? null,
            data.address ?? null,
            data.number_of_floors ?? null,
            data.total_area ?? null,
            data.images_url ?? null
        ];

        const { rows } = await db.query(sql, values);
        return rows[0];
    }

    static async createFloor(data: Omit<Interfaces.IFloor, 'id'>): Promise<Interfaces.IFloor> {
        const sql = `
            INSERT INTO floor (building_id, floor_number, floor_area)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const { rows } = await db.query(sql, [
            data.building_id, 
            data.floor_number, 
            data.floor_area ?? null
        ]);
        return rows[0];
    }

    static async createAmenity(data: Omit<Interfaces.IAmenity, 'id'>): Promise<Interfaces.IAmenity> {
        const sql = `
            INSERT INTO amenity (
                building_id, floor_id, parent_amenity_id, 
                name, type, capacity, area_m2, images_url
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
        `;
        const values = [
            data.building_id,
            data.floor_id ?? null,
            data.parent_amenity_id ?? null,
            data.name,
            data.type ?? null,
            data.capacity ?? null,
            data.area_m2 ?? null,
            data.images_url ?? null
        ];

        const { rows } = await db.query(sql, values);
        return rows[0];
    }

    static async createAmenityConfiguration(data: Omit<Interfaces.IAmenityConfiguration, 'id'>): Promise<Interfaces.IAmenityConfiguration> {
        const sql = `
            INSERT INTO amenity_configuration (amenity_id, key, value, reservable, image_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `;
        const { rows } = await db.query(sql, [
            data.amenity_id,
            data.key,
            data.value ?? null,
            data.reservable ?? false,
            data.image_url ?? null
        ]);
        return rows[0];
    }
}