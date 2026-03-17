import type { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import UserModel from "../models/UserModel";

function badRequest(res: Response, message: string) {
  return res.status(400).json({ error: message });
}

export async function register(req: Request, res: Response): Promise<Response> {
  try {
    const { name, email, password } = req.body ?? {};

    if (!name || !email || !password) {
      return badRequest(res, "Missing required fields: name, email, password");
    }

    const result = await AuthService.register({
      name: String(name),
      email: String(email).toLowerCase(),
      password: String(password)
    });

    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({ error: error?.message ?? error });
  }
}

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return badRequest(res, "Missing required fields: email, password");
    }

    const result = await AuthService.login({
      email: String(email).toLowerCase(),
      password: String(password)
    });

    return res.json(result);
  } catch (error: any) {
    return res.status(error?.statusCode ?? 500).json({ error: error?.message ?? error });
  }
}

export async function me(req: Request, res: Response): Promise<Response> {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json({ user });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message ?? error });
  }
}

module.exports = {
  register,
  login,
  me
};

