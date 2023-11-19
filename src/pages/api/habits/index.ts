import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const result = await sql`SELECT * FROM habits ORDER BY id ASC;`;
    const habits = result.rows;
    res.status(200).json(habits);
  } else if (req.method === "POST") {
    const newHabit = {
      name: req.body.name,
      unit: req.body.unit,
      quantity: req.body.quantity,
      achieved: 0,
    };

    try {
      if (!newHabit.name || !newHabit.unit || !newHabit.quantity) {
        throw new Error("Missing field(s)");
      }
      const result = await sql`
      INSERT INTO habits
        (name, unit, quantity, achieved)
      VALUES
        (${newHabit.name}, ${newHabit.unit}, ${newHabit.quantity}, 0);
    `;
    } catch (error) {
      res.status(500).json({ error });
    }

    res.status(201).json(newHabit);
  } else {
    res.setHeader("Allow", "GET, POST");
    res.status(405).json({ message: "Method not allowed" });
  }
};
