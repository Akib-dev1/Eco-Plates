// app/api/expiry-risk/alerts/route.js
import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const inventoryCol = await dbConnect("inventoryUsers");

    const items = await inventoryCol
      .find({
        email, // adjust if you use userEmail
        riskLevel: { $in: ["high", "medium"] },
      })
      .sort({ riskScore: -1, predictedExpiryDate: 1 })
      .limit(20)
      .toArray();

    return NextResponse.json({ items });
  } catch (err) {
    console.error("expiry-risk/alerts error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
