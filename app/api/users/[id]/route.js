import dbConnect from "@/app/lib/dbConnect";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const usersCollection = await dbConnect("users");
  const email = params.id;
  const user = await usersCollection.findOne({ email });
  return NextResponse.json(user);
};

export const PUT = async (req, { params }) => {
  const usersCollection = await dbConnect("users");
  const email = params.id;
  const data = await req.json();
  const result = await usersCollection.updateOne({ email }, { $set: data });
  revalidatePath("/profile");
  return NextResponse.json(result);
};
