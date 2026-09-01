import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.GITHUB_USERNAME?.trim() || "itmepayal";

export async function GET() {
  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch GitHub contributions" },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch GitHub contributions" },
      { status: 500 },
    );
  }
}
