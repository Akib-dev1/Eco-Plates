import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const inventoryCollection = await dbConnect("Inventory");
    const inventoryItems = await inventoryCollection.find({}).toArray();
    return NextResponse.json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    return NextResponse.json(
      { error: "Failed to fetch inventory items" },
      { status: 500 }
    );
  }
};
