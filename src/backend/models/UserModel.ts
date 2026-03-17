import db from "../../database/config/db";
import type { IUser, UserRole } from "../interfaces/global.interfaces";

class UserModel {
  static async create(params: {
    name: string;
    email: string;
    password_hash: string;
    role?: UserRole;
  }): Promise<IUser> {
    const { name, email, password_hash, role = "user" } = params;

    const query = `
      INSERT INTO app_user (name, email, password_hash, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, name, email, password_hash, role, created_at
    `;
    const values = [name, email, password_hash, role];
    const result = await db.query(query, values);
    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const query = `
      SELECT id, name, email, password_hash, role, created_at
      FROM app_user
      WHERE email = $1
      LIMIT 1
    `;
    const result = await db.query(query, [email]);
    return result.rows[0] ?? null;
  }

  static async findById(id: number): Promise<Omit<IUser, "password_hash"> | null> {
    const query = `
      SELECT id, name, email, role, created_at
      FROM app_user
      WHERE id = $1
      LIMIT 1
    `;
    const result = await db.query(query, [id]);
    return result.rows[0] ?? null;
  }
}

export default UserModel;

