import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // TODO: Wire to pipeline.ts checkClaim()
  const { claim } = await request.json();

  if (!claim || typeof claim !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid claim" },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { error: "Pipeline not yet implemented" },
    { status: 501 }
  );
}
