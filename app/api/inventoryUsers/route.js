import dbConnect from "@/app/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const inventoryUsersCollection = await dbConnect("inventoryUsers");
  const inventoryUserData = await req.json();
  const newInventoryUser = await inventoryUsersCollection.insertOne(
    inventoryUserData
  );
  revalidatePath("/profile");
  return NextResponse.json(newInventoryUser);
};
