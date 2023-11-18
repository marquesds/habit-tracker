import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function GET(request: Request) {
  try {
    const result = await sql`
    CREATE TABLE habits (
      id SERIAL PRIMARY KEY,
      name VARCHAR,
      quantity INTEGER,
      unit VARCHAR,
      achieved INTEGER
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
