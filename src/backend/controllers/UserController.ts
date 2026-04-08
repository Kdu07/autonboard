import { Request, Response } from "express";
import db from "../../database/config/db";

/**
 * Returns the profile of the current user based on their email.
 * If no customer exists for the email, one is automatically created (supports social logins).
 */
export async function getProfile(req: Request, res: Response): Promise<Response> {
  try {
    const { email, name } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required to fetch profile." });
    }

    const findResult = await db.query(
      "SELECT id, name FROM customer WHERE email = $1 LIMIT 1",
      [email]
    );

    if (findResult.rows.length > 0) {
      return res.status(200).json({
        customer_id: findResult.rows[0].id,
        customer_name: findResult.rows[0].name
      });
    }

    // Auto-register customer for first-time login (e.g. Google social login)
    const customerName = (name as string) || (email as string).split("@")[0];
    const insertResult = await db.query(
      "INSERT INTO customer (name, email) VALUES ($1, $2) RETURNING id, name",
      [customerName, email]
    );

    console.log(`[UserController] New customer auto-registered: ${email}`);

    return res.status(201).json({
      customer_id: insertResult.rows[0].id,
      customer_name: insertResult.rows[0].name
    });
  } catch (error: any) {
    console.error("Profile Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
