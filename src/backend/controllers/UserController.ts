import { Request, Response } from "express";
import db from "../../database/config/db";

/**
 * Returns the customer profile associated with the given email.
 * Used by the frontend to resolve customer_id after Auth0 login.
 */
export async function getUserProfile(req: Request, res: Response): Promise<Response> {
  const { email } = req.query as { email?: string };

  if (!email) {
    return res.status(400).json({ error: "Missing required query parameter: email" });
  }

  try {
    const result = await db.query(
      "SELECT id AS customer_id, name AS customer_name FROM customer WHERE email = $1",
      [email],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No customer account found for this email." });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("[UserController] Error fetching user profile:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
}
