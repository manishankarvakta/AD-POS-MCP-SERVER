// src/services/database.service.ts
import { MongoClient } from "mongodb";
import { MONGO_URI } from "../config/env";

let client: MongoClient;

export async function connectDB() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("MongoDB connected successfully");
    return client.db();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export function getDatabase() {
  if (!client) throw new Error("Database not connected");
  return client.db();
}
