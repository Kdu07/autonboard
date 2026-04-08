import { Request, Response } from "express";
import db from "../../database/config/db";

/**
 * Returns the profile of the current user based on their Auth0 context or provided email.
 */
export async function getProfile(req: Request, res: Response): Promise<Response> {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required to fetch profile." });
    }

    // Attempt to find a customer associated with this email
    const query = `
      SELECT id, name, email 
      FROM customer 
      WHERE email = $1 
      LIMIT 1
    `;
    const result = await db.query(query, [email]);

    if (result.rows.length === 0) {
      // Fallback: if no customer found, we might want to return a default or 404
      // For now, let's return a 404 so the frontend knows it needs to handle this
      return res.status(404).json({ error: "No customer account found for this user." });
    }

    return res.status(200).json({
        customer_id: result.rows[0].id,
        customer_name: result.rows[0].name
    });
  } catch (error: any) {
    console.error("Profile Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
