import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Experience from "@/models/experience";

/* ====================================================== */
/* GET SINGLE EXPERIENCE */
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
          message: "Invalid experience ID",
        },
        {
          status: 400,
        },
      );
    }

    const experience = await Experience.findById(id);

    if (!experience) {
      return Response.json(
        {
          success: false,
          message: "Experience not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        experience,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

/* ====================================================== */
/* UPDATE EXPERIENCE */
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
          message: "Invalid experience ID",
        },
        {
          status: 400,
        },
      );
    }

    const updatedExperience = await Experience.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedExperience) {
      return Response.json(
        {
          success: false,
          message: "Experience not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Experience updated successfully",
        experience: updatedExperience,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

/* ====================================================== */
/* DELETE EXPERIENCE */
/* ====================================================== */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("DELETE EXPERIENCE ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid experience ID",
        },
        {
          status: 400,
        },
      );
    }

    const deletedExperience = await Experience.findByIdAndDelete(id);

    if (!deletedExperience) {
      return Response.json(
        {
          success: false,
          message: "Experience not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Experience deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
