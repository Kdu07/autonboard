import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import type { IAuthTokenPayload, UserRole } from "../interfaces/global.interfaces";
import UserModel from "../models/UserModel";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("Missing JWT_SECRET env var");
  return secret;
}

function getJwtExpiresIn(): string {
  return process.env.JWT_EXPIRES_IN ?? "1d";
}

export class AuthService {
  static async register(params: {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
  }) {
    const { name, email, password, role } = params;

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      const err: any = new Error("Email already registered");
      err.statusCode = 409;
      throw err;
    }

    const password_hash = await bcrypt.hash(password, 12);
    const user = await UserModel.create({ name, email, password_hash, role });

    const token = AuthService.signToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    };
  }

  static async login(params: { email: string; password: string }) {
    const { email, password } = params;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      const err: any = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) {
      const err: any = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const token = AuthService.signToken({
      sub: user.id,
      email: user.email,
      role: user.role
    });

    return {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      token
    };
  }

  static verifyToken(token: string): IAuthTokenPayload {
    const secret = getJwtSecret();
    const payload = jwt.verify(token, secret) as any;
    return {
      sub: Number(payload.sub),
      email: String(payload.email),
      role: payload.role as UserRole
    };
  }

  private static signToken(payload: IAuthTokenPayload): string {
    const secret = getJwtSecret();
    return jwt.sign(payload, secret, { expiresIn: getJwtExpiresIn() as jwt.SignOptions["expiresIn"] });
  }
}

