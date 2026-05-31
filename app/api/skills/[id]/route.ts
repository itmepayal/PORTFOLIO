import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Skill from "@/models/skills";

/* ====================================================== */
/* GET SINGLE SKILL */
/* ====================================================== */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    /* ====================================================== */
    /* VALIDATE ID */
    /* ====================================================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,

          message: "Invalid skill ID",
        },
        {
          status: 400,
        },
      );
    }

    /* ====================================================== */
    /* FIND SKILL */
    /* ====================================================== */

    const skill = await Skill.findById(id);

    if (!skill) {
      return Response.json(
        {
          success: false,

          message: "Skill not found",
        },
        {
          status: 404,
        },
      );
    }

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    return Response.json(
      {
        success: true,

        skill,
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
/* UPDATE SKILL */
/* ====================================================== */

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    /* ====================================================== */
    /* VALIDATE ID */
    /* ====================================================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,

          message: "Invalid skill ID",
        },
        {
          status: 400,
        },
      );
    }

    /* ====================================================== */
    /* UPDATE SKILL */
    /* ====================================================== */

    const updatedSkill = await Skill.findByIdAndUpdate(id, body, {
      new: true,

      runValidators: true,
    });

    if (!updatedSkill) {
      return Response.json(
        {
          success: false,

          message: "Skill not found",
        },
        {
          status: 404,
        },
      );
    }

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    return Response.json(
      {
        success: true,

        message: "Skill updated successfully",

        skill: updatedSkill,
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
/* DELETE SKILL */
/* ====================================================== */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    /* ====================================================== */
    /* VALIDATE ID */
    /* ====================================================== */

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,

          message: "Invalid skill ID",
        },
        {
          status: 400,
        },
      );
    }

    /* ====================================================== */
    /* DELETE SKILL */
    /* ====================================================== */

    const deletedSkill = await Skill.findByIdAndDelete(id);

    if (!deletedSkill) {
      return Response.json(
        {
          success: false,

          message: "Skill not found",
        },
        {
          status: 404,
        },
      );
    }

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    return Response.json(
      {
        success: true,

        message: "Skill deleted successfully",
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
