import { NextResponse } from "next/server";
import { checkClaim } from "@/lib/pipeline";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { claim } = body;

    if (!claim || typeof claim !== "string" || claim.trim().length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid claim" },
        { status: 400 }
      );
    }

    if (claim.trim().length > 1000) {
      return NextResponse.json(
        { error: "Claim too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    const verdict = await checkClaim(claim);
    return NextResponse.json(verdict);
  } catch (error) {
    console.error("Check API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
