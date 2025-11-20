import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/dbConnect";
import { getToken } from "next-auth/jwt";

export const POST = async (req) => {
  const usersCollection = await dbConnect("users");
  const userData = await req.json();
  const initialPassword = userData.password;
  const hashedPassword = await bcrypt.hash(initialPassword, 10);
  userData.password = hashedPassword;
  const newUser = await usersCollection.insertOne(userData);
  return NextResponse.json(newUser);
};

export const GET = async (req) => {
  const usersCollection = await dbConnect("users");
  const users = await usersCollection.find({}).toArray();
  return NextResponse.json(users);
};
