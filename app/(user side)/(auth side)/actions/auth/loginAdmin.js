"use server";
import dbConnect from "@/app/lib/dbConnect";
import bcrypt from "bcrypt";

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const usersCollection = await dbConnect("users");
  const user = await usersCollection.findOne({ email });
  if (!user) return null;
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;
  return user;
};
