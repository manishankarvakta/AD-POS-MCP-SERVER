"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
// Import from the specific file paths
const database_services_1 = require("./services/database.services");
let mongoClient = null;
// Use explicit imports since we can't resolve the main SDK module
const server = require("../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/index.js");
const stdio = require("../node_modules/@modelcontextprotocol/sdk/dist/cjs/server/stdio.js");
async function bootstrap() {
    try {
        console.log("Starting MCP server...");
        // Connect to MongoDB
        const db = await (0, database_services_1.connectDB)();
        mongoClient = db.client;
        // Create the MCP server with all capabilities
        const mcpServer = new server.Server({ name: "ad-pos-mcp-server", version: "1.0.0" }, {
            capabilities: {
                resources: {
                    collections: {
                        description: "Database collections available for querying",
                    },
                },
                tools: {
                    createOrder: {
                        description: "Create a new sales order",
                        parameters: {
                            customerId: { type: "string" },
                            products: { type: "array" },
                        },
                    },
                    runAggregation: {
                        description: "Run MongoDB aggregation pipeline",
                        parameters: {
                            collection: { type: "string" },
                            pipeline: { type: "array" },
                        },
                    },
                },
                prompts: {
                    create_sales_order: {
                        description: "Generate a sales order prompt",
                        parameters: {
                            customerId: { type: "string" },
                            products: { type: "array" },
                        },
                    },
                },
            },
        });
        // Add resource handling methods
        mcpServer.method("listCollections", async () => {
            const db = await (0, database_services_1.connectDB)();
            return db.listCollections().toArray();
        });
        // Add tool methods
        mcpServer.method("createOrder", async (orderData) => {
            const db = await (0, database_services_1.connectDB)();
            const order = {
                ...orderData,
                orderId: `ORD-${Date.now()}`,
                createdAt: new Date(),
            };
            await db.collection("orders").insertOne(order);
            return order;
        });
        mcpServer.method("runAggregation", async (collection, pipeline) => {
            // Check for forbidden stages as a security measure
            const forbidden = ["$out", "$merge", "$geoNear"];
            const hasForbidden = pipeline.some((stage) => Object.keys(stage).some((key) => forbidden.includes(key)));
            if (hasForbidden) {
                throw new Error("Pipeline contains forbidden stages");
            }
            const db = await (0, database_services_1.connectDB)();
            return db.collection(collection).aggregate(pipeline).toArray();
        });
        // Add prompt handling
        mcpServer.prompt("create_sales_order", async (args) => {
            return {
                messages: [
                    {
                        role: "system",
                        content: `Create order for customer ${args.customerId} with the following products: ${JSON.stringify(args.products)}`,
                    },
                ],
            };
        });
        // Connect to the transport
        const transport = new stdio.StdioServerTransport();
        await mcpServer.connect(transport);
        console.log("MCP Server operational");
        // Handle process termination
        process.on("SIGINT", handleShutdown);
        process.on("SIGTERM", handleShutdown);
    }
    catch (error) {
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
