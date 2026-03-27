import express from "express";
import { getAll, create } from "../controllers/UploadController";
import { UploadMiddleware } from "../middleware/UploadMiddleware";

const router = express.Router();

/**
 * Dashboard route (Mariana's feature from develop)
 */
router.get("/dashboard", (req, res) => {
  res.json({
    user: {
      name: "Mariana",
      email: "mariana@email.com",
      auth0_id: "google-oauth2|123",
      email_verified: true,
      picture: ""
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
});

/**
 * Debug and auxiliary routes (from feat/docker)
 */
router.get("/dashboard-debug", getAll);
router.post("/profile", (req, res) => res.json({ message: "Profile saved (mock)" }));

/**
 * Upload and List routes
 */
router.get("/", getAll);

router.post(
  "/upload",
  UploadMiddleware.multerSingle,
  UploadMiddleware.process,
  create
);

export { router as routes };
