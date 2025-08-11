import { NextResponse } from "next/server";
import { demoFinanceStats } from "@/lib/mockData";
export const runtime = "edge";

export async function GET() {
  return NextResponse.json({ data: demoFinanceStats });
}


