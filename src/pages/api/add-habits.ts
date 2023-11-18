import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function GET(request: Request) {
  const url = new URL(
    request.url,
    `http://${request.headers.get("host") as string}`,
  );
  const searchParams = url.searchParams;
  const name = searchParams.get("name");
  const quantity = parseInt(searchParams.get("quantity") || "0");
  const unit = searchParams.get("unit");
  const achieved = parseInt(searchParams.get("achieved") || "0");

  try {
    await sql`INSERT INTO habits (name, quantity, unit, achieved) VALUES (${name}, ${quantity}, ${unit}, ${achieved});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const habits = await sql`SELECT * FROM habits;`;
  const rows = habits.rows;
  return NextResponse.json({ rows }, { status: 200 });
}
