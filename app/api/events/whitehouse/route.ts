import { NextResponse } from "next/server";
import { fetchWhiteHouseRemarks } from "../../../../lib/whitehouse";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const events = await fetchWhiteHouseRemarks();

    return NextResponse.json({
      source: "The White House",
      sourceUrl: "https://www.whitehouse.gov/remarks/",
      fetchedAt: new Date().toISOString(),
      count: events.length,
      events
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "WHITEHOUSE_FETCH_FAILED",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 502 }
    );
  }
}
