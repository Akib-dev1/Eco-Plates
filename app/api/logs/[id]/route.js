import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    const logsCollection = await dbConnect("logs");
    const email = params.id;

    const logs = await logsCollection
      .find({ email })
      .sort({ createdAt: -1 }) // newest first (optional)
      .toArray();

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "Failed to fetch logs", error: error.message },
      { status: 500 }
    );
  }
};
