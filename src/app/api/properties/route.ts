import { NextResponse } from "next/server";
import { demoProperties } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ data: demoProperties });
}


