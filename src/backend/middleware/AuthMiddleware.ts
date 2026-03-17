import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/AuthService";

function extractBearerToken(req: Request): string | null {
  const header = req.headers.authorization;
  if (!header) return null;

  const [type, token] = header.split(" ");
  if (type?.toLowerCase() !== "bearer" || !token) return null;
  return token;
}

export const AuthMiddleware = {
  requireAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const token = extractBearerToken(req);
      if (!token) return res.status(401).json({ error: "Missing Authorization: Bearer <token>" });

      const payload = AuthService.verifyToken(token);
      req.user = { id: payload.sub, email: payload.email, role: payload.role };
      return next();
    } catch (_err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
  }
};

