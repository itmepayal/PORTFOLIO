import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import DSA from "@/models/dsa";

/* ====================================================== */
/* GET SINGLE DSA */
/* ====================================================== */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid DSA ID",
        },
        { status: 400 },
      );
    }

    const dsa = await DSA.findById(id);

    if (!dsa) {
      return Response.json(
        {
          success: false,
          message: "DSA not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        dsa,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

/* ====================================================== */
/* UPDATE DSA */
/* ====================================================== */

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid DSA ID",
        },
        { status: 400 },
      );
    }

    const updatedDSA = await DSA.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDSA) {
      return Response.json(
        {
          success: false,
          message: "DSA not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "DSA updated successfully",
        dsa: updatedDSA,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

/* ====================================================== */
/* DELETE DSA */
/* ====================================================== */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid DSA ID",
        },
        { status: 400 },
      );
    }

    const deletedDSA = await DSA.findByIdAndDelete(id);

    if (!deletedDSA) {
      return Response.json(
        {
          success: false,
          message: "DSA not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "DSA deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}
