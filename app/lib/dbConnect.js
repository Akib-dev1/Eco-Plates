import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) throw new Error("❌ MONGODB_URI is missing in .env.local");

// Global cache (required for Next.js App Router)
let client;
let clientPromise;

if (!global._mongoClient) {
  client = new MongoClient(uri, {});
  global._mongoClient = client.connect();
}

clientPromise = global._mongoClient;

export default async function dbConnect(name) {
  const client = await clientPromise;
  const db = client.db("Eco-Plates");
  return db.collection(name);
}
