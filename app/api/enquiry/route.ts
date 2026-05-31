import { connectDB } from "@/lib/db";
import Enquiry from "@/models/enquiry";

/* ====================================================== */
/* GET ALL ENQUIRIES */
/* ====================================================== */

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
    const filter = searchParams.get("filter") || "All";

    const isRead = searchParams.get("isRead");
    const replied = searchParams.get("replied");

    const skip = (page - 1) * limit;

    const query: any = {};

    /* ====================================================== */
    /* SEARCH */
    /* ====================================================== */

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { message: { $regex: search, $options: "i" } },
      ];
    }

    /* ====================================================== */
    /* FILTERS */
    /* ====================================================== */

    if (filter === "Read") query.isRead = true;
    if (filter === "Unread") query.isRead = false;
    if (filter === "Replied") query.replied = true;

    /* override if query params exist */
    if (isRead === "true") query.isRead = true;
    if (isRead === "false") query.isRead = false;

    if (replied === "true") query.replied = true;

    /* ====================================================== */
    /* DATA */
    /* ====================================================== */

    const totalEnquiries = await Enquiry.countDocuments(query);

    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalEnquiries / limit);

    return Response.json(
      {
        success: true,
        enquiries,
        pagination: {
          totalEnquiries,
          totalPages,
          currentPage: page,
          limit,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1,
        },
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
/* CREATE ENQUIRY */
/* ====================================================== */

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const enquiry = await Enquiry.create(body);

    return Response.json(
      {
        success: true,
        message: "Message sent successfully",
        enquiry,
      },
      { status: 201 },
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
