// src/index.ts
// Import from the specific file paths
import { connectDB } from "./services/database.services";
import type { MongoClient } from "mongodb";

let mongoClient: MongoClient | null = null;

// Use the direct imports for server and stdio since exported classes are hard to reach
const {
  Server,
} = require("../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/index.js");
const {
  StdioServerTransport,
} = require("../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js");

// Define interfaces for our data types
interface OrderData {
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price?: number;
  }>;
  total?: number;
}

interface SalesOrderArgs {
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

// Define interface for MongoDB aggregation pipeline stages
type AggregationStage = Record<string, unknown>;

async function bootstrap() {
  try {
    console.log("Starting MCP server...");

    // Connect to MongoDB
    const db = await connectDB();
    mongoClient = (db as unknown as { client: MongoClient }).client;

    // Create a basic server with minimal capabilities
    const mcpServer = new Server(
      { name: "ad-pos-mcp-server", version: "1.0.0" },
      { capabilities: {} },
    );

    // Define handlers by directly adding methods to the server instance
    // The Server.prototype.onRequest approach doesn't work, so we're adding handlers
    // using a different approach
    mcpServer.onRequest = async (
      method: string,
      params: Record<string, unknown>,
    ): Promise<unknown> => {
      console.log(`Received request: ${method}`, params);

      if (method === "listCollections") {
        const db = await connectDB();
        return db.listCollections().toArray();
      }

      if (method === "createOrder") {
        const db = await connectDB();
        // Use type assertion with unknown as intermediate step for safety
        const orderData = params as unknown as OrderData;
        const order = {
          ...orderData,
          orderId: `ORD-${Date.now()}`,
          createdAt: new Date(),
        };
        await db.collection("orders").insertOne(order);
        return order;
      }

      if (method === "runAggregation") {
        const collection = params.collection as string;
        const pipeline = params.pipeline as AggregationStage[];

        // Check for forbidden stages as a security measure
        const forbidden = ["$out", "$merge", "$geoNear"];
        const hasForbidden = pipeline.some((stage: AggregationStage) =>
          Object.keys(stage).some((key) => forbidden.includes(key)),
        );

        if (hasForbidden) {
          throw new Error("Pipeline contains forbidden stages");
        }

        const db = await connectDB();
        return db.collection(collection).aggregate(pipeline).toArray();
      }

      throw new Error(`Unknown method: ${method}`);
    };

    // Connect to the transport
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);

    console.log("MCP Server operational");

    // Handle process termination
    process.on("SIGINT", handleShutdown);
    process.on("SIGTERM", handleShutdown);
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

async function handleShutdown() {
  console.log("Shutting down MCP server...");

  if (mongoClient) {
    console.log("Closing MongoDB connection...");
    await mongoClient.close();
    console.log("MongoDB connection closed");
  }

  console.log("Server shutdown complete");
  process.exit(0);
}

bootstrap().catch(console.error);
