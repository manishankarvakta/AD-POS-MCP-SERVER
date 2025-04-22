"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.getDatabase = getDatabase;
// src/services/database.service.ts
const mongodb_1 = require("mongodb");
const env_1 = require("../config/env");
let client;
async function connectDB() {
    try {
        client = new mongodb_1.MongoClient(env_1.MONGO_URI);
        await client.connect();
        console.log("MongoDB connected successfully");
        return client.db();
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
function getDatabase() {
    if (!client)
        throw new Error("Database not connected");
    return client.db();
}
