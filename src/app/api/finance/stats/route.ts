import { NextResponse } from "next/server";
import { demoFinanceStats } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ data: demoFinanceStats });
}


