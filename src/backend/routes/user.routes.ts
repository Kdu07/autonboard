import express from "express";
import { getProfile } from "../controllers/UserController";

const router = express.Router();

router.get("/profile", getProfile);

export const userRoutes = router;
