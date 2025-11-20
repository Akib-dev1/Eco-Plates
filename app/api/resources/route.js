import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const inventoryCollection = await dbConnect("resources");
    const resources = await inventoryCollection.find({}).toArray();
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
};
