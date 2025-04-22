// src/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const MONGO_URI = process.env.MONGO_URI!;
export const SERVER_NAME = process.env.SERVER_NAME || 'saas-mcp-server';