import express from "express";
import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";

const router = express.Router();

/**
 * Route definitions for spreadsheet management
 */
export const routes: any[] = [
  /**
   * Fetch a list of all previously processed uploads
   */
  router.get("/", getAll),

  /**
   * File Upload Pipeline:
   * 1. multerSingle: Intercepts multipart/form-data and saves the file to disk
   * 2. process: Validates required body fields and parses spreadsheet contents
   * 3. create: Final controller to persist data to the database
   */
  router.post(
    "/upload",
    UploadMiddleware.multerSingle,
    UploadMiddleware.process,
    create
  ),

  /**
   * Dashboard route
   * Returns authenticated user data and dashboard information
   */
  router.get("/dashboard", async (req: any, res) => {
    try {
      const user = req.user;

      if (!user) {
        return res.status(401).json({
          message: "Unauthorized"
        });
      }

      res.json({
        user: {
          name: user.name,
          email: user.email,
          auth0_id: user.sub,
          email_verified: user.email_verified,
          picture: user.picture
        },
        customer: {
          name: "Empresa Teste",
          cnpj: "00.000.000/0001-00",
          modules: ["Onboarding", "Analytics"],
          plan: "Premium",
          status: "active"
        },
        stats: {
          total: 10,
          pending: 2,
          completed: 7,
          failed: 1
        },
        submissions: [
          {
            id: 1,
            filename: "arquivo.csv",
            status: "completed",
            created_at: new Date().toISOString(),
            file_size: 204800,
            file_type: "csv"
          }
        ]
      });
    } catch (error) {
      res.status(500).json({
        message: "Error loading dashboard",
        error
      });
    }
  })
];