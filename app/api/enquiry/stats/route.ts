import { connectDB } from "@/lib/db";
import Enquiry from "@/models/enquiry";

/* ====================================================== */
/* GET ENQUIRY STATS */
/* ====================================================== */

export async function GET() {
  try {
    await connectDB();

    /* ====================================================== */
    /* TOTAL ENQUIRIES */
    /* ====================================================== */

    const totalEnquiries = await Enquiry.countDocuments();

    /* ====================================================== */
    /* UNREAD */
    /* ====================================================== */

    const unreadEnquiries = await Enquiry.countDocuments({
      isRead: false,
    });

    /* ====================================================== */
    /* READ */
    /* ====================================================== */

    const readEnquiries = await Enquiry.countDocuments({
      isRead: true,
    });

    /* ====================================================== */
    /* REPLIED */
    /* ====================================================== */

    const repliedEnquiries = await Enquiry.countDocuments({
      replied: true,
    });

    /* ====================================================== */
    /* RESPONSE */
    /* ====================================================== */

    const stats = [
      {
        label: "Total Enquiries",
        value: totalEnquiries,
        growth: "+12.4%",
        icon: "Mail",
      },

      {
        label: "Unread",
        value: unreadEnquiries,
        growth: "+8.2%",
        icon: "MailOpen",
      },

      {
        label: "Read",
        value: readEnquiries,
        growth: "+5.1%",
        icon: "BadgeCheck",
      },

      {
        label: "Replied",
        value: repliedEnquiries,
        growth: "+18.3%",
        icon: "Send",
      },
    ];

    return Response.json(
      {
        success: true,
        stats,
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
