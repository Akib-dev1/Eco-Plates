import dbConnect from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
  try {
    const inventoryUsersCollection = await dbConnect("inventoryUsers");
    const email = params.id;

    const logs = await inventoryUsersCollection.find({ email }).toArray();

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return NextResponse.json(
      { message: "Failed to fetch logs", error: error.message },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  try {
    const data = await getServerSession(authOptions);
    const userEmail = data?.user?.email;
    const inventoryUsersCollection = await dbConnect("inventoryUsers");
    const id = params.id;
    const result = await inventoryUsersCollection.deleteOne({
      _id: new ObjectId(id),
      email: userEmail,
    });
    revalidatePath("/profile");
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error deleting inventory user:", error);
    return NextResponse.json(
      { message: "Failed to delete inventory user", error: error.message },
      { status: 500 }
    );
  }
};
