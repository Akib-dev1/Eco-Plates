import dbConnect from "@/app/lib/dbConnect";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const logsCollection = await dbConnect("logs");
  const logsData = await req.json();
  const newLog = await logsCollection.insertOne(logsData);
  revalidatePath("/profile");
  return NextResponse.json(newLog);
};
