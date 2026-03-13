import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Wire to db.ts getRecentChecks() + getTagCloud()
  return NextResponse.json(
    { error: "Commons not yet implemented" },
    { status: 501 }
  );
}
