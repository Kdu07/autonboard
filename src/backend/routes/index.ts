import express from "express";

const router = express.Router();

import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";
import { register, login, me } from "../controllers/AuthController";
import { AuthMiddleware } from "../middleware/AuthMiddleware";

/**
 * Route definitions for spreadsheet management
 */
export const routes: any[] = [
  // Fetch a list of all previously processed uploads
  router.get("/", getAll),

  // Auth
  router.post("/auth/register", register),
  router.post("/auth/login", login),
  router.get("/auth/me", AuthMiddleware.requireAuth, me),

  /**
   * File Upload Pipeline:
   * 1. multerSingle: Intercepts 'multipart/form-data' and saves the file to disk.
   * 2. process: Validates required body fields and parses spreadsheet contents.
   * 3. create: Final controller to persist data to the database.
   */
  router.post(
    "/upload",
    UploadMiddleware.multerSingle,
    UploadMiddleware.process,
    create
  )
];