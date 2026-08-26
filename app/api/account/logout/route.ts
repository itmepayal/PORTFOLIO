import { getErrorMessage } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 },
    );

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json(
      { message: getErrorMessage(error, "Logout failed") },
      { status: 500 },
    );
  }
}
