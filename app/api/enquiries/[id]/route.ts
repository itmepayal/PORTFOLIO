import { getErrorMessage } from "@/lib/utils";
import { getAuthSession } from "@/lib/auth";
import { requireAuthSessionOrResponse } from "@/lib/api/auth";
import mongoose from "mongoose";

import { connectDB } from "@/lib/db";
import Enquiry from "@/models/enquiry";

/* ====================================================== */
/* GET SINGLE ENQUIRY */
/* ====================================================== */

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAuthSessionOrResponse();
  if (response) return response;

  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid Enquiry ID",
        },
        { status: 400 },
      );
    }

    const enquiry = await Enquiry.findById(id);

    if (!enquiry) {
      return Response.json(
        {
          success: false,
          message: "Enquiry not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        enquiry,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}

/* ====================================================== */
/* UPDATE ENQUIRY */
/* ====================================================== */

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAuthSessionOrResponse();
  if (response) return response;

  try {
    await connectDB();

    const { id } = await params;

    const body = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid Enquiry ID",
        },
        { status: 400 },
      );
    }

    if (body.replied === true) {
      const session = await getAuthSession();
      if (session) {
        body.repliedBy = session.userId;
        if (!body.repliedAt) {
          body.repliedAt = new Date();
        }
      }
    }

    if (body.replied === false) {
      body.repliedBy = null;
      body.repliedAt = null;
    }

    const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEnquiry) {
      return Response.json(
        {
          success: false,
          message: "Enquiry not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Enquiry updated successfully",
        enquiry: updatedEnquiry,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}

/* ====================================================== */
/* DELETE ENQUIRY */
/* ====================================================== */

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { response } = await requireAuthSessionOrResponse();
  if (response) return response;

  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return Response.json(
        {
          success: false,
          message: "Invalid Enquiry ID",
        },
        { status: 400 },
      );
    }

    const deletedEnquiry = await Enquiry.findByIdAndDelete(id);

    if (!deletedEnquiry) {
      return Response.json(
        {
          success: false,
          message: "Enquiry not found",
        },
        { status: 404 },
      );
    }

    return Response.json(
      {
        success: true,
        message: "Enquiry deleted successfully",
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    return Response.json(
      {
        success: false,
        message: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
