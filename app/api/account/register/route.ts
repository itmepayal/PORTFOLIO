import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/user";

interface RegisterRequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body: RegisterRequestBody = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    let message = "Server error";

    if (error instanceof Error) {
      message = error.message;
    }

    return NextResponse.json({ message, error: message }, { status: 500 });
  }
}
