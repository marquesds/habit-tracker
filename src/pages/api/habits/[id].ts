import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const habitId = req.query.id;

  if (req.method === "GET") {
    const result = await sql`SELECT * FROM habits WHERE id = ${habitId};`;
    const habits = result.rows;
    res.status(200).json(habits ? habits[0] : {});
  } else if (req.method === "PUT") {
    const achieved = req.body.achieved;

    try {
      const result =
        await sql`UPDATE habits SET achieved = ${achieved} WHERE id = ${habitId};`;
    } catch (error) {
      res.status(500).json({ error });
    }

    res.status(200).json({ message: `Habit ${habitId} updated.` });
  } else {
    res.setHeader("Allow", "GET, POST, PUT");
    res.status(405).json({ message: "Method not allowed" });
  }
};
