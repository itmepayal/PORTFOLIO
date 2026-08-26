import { getErrorMessage } from "@/lib/utils";
import {
  sanitizeProjectPayload,
  validateProjectWorkType,
} from "@/lib/project";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Project from "@/models/project";

/* ====================================================== */
/* GET SINGLE PROJECT */
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
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    const project = await Project.findById(id);

    if (!project) {
      return Response.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        project,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}

/* ====================================================== */
/* UPDATE PROJECT */
/* ====================================================== */

export async function PUT(
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
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    const body = await req.json();
    const existingProject = await Project.findById(id).select("workType company");

    if (!existingProject) {
      return Response.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    const nextWorkType =
      body.workType !== undefined ? body.workType : existingProject.workType;
    const nextCompany =
      body.company !== undefined ? body.company : existingProject.company;
    const validationError = validateProjectWorkType(nextWorkType, nextCompany);

    if (validationError) {
      return Response.json(
        {
          success: false,
          message: validationError,
        },
        {
          status: 400,
        },
      );
    }

    const payload = sanitizeProjectPayload({
      ...body,
      workType: nextWorkType,
      company: nextCompany,
    });

    const updatedProject = await Project.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });

    if (!updatedProject) {
      return Response.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Project updated successfully",
        project: updatedProject,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}

/* ====================================================== */
/* DELETE PROJECT */
/* ====================================================== */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();

    const { id } = await params;

    console.log("DELETE ID:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid project ID",
        },
        {
          status: 400,
        },
      );
    }

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return Response.json(
        {
          success: false,
          message: "Project not found",
        },
        {
          status: 404,
        },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Project deleted successfully",
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      {
        status: 500,
      },
    );
  }
}
