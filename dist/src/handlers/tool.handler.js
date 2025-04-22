"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePipeline = validatePipeline;
exports.runAggregation = runAggregation;
exports.createOrder = createOrder;
exports.setupToolHandlers = setupToolHandlers;
// src/handlers/tool.handler.ts
const constants_1 = require("../config/constants");
const database_services_1 = require("../services/database.services");
function validatePipeline(pipeline) {
    return pipeline.some(stage => Object.keys(stage).some(key => constants_1.FORBIDDEN_AGGREGATION_STAGES.includes(key)));
}
async function runAggregation(collection, pipeline) {
    const db = await (0, database_services_1.getDatabase)();
    return db.collection(collection).aggregate(pipeline).toArray();
}
async function createOrder(orderData) {
    const db = await (0, database_services_1.getDatabase)();
    const order = {
        ...orderData,
        orderId: `ORD-${Date.now()}`,
        createdAt: new Date()
    };
    await db.collection('orders').insertOne(order);
    return order;
}
// Add the setup function
function setupToolHandlers(server) {
    // Registering the functions as server methods
    server.method('validatePipeline', validatePipeline);
    server.method('runAggregation', runAggregation);
    server.method('createOrder', createOrder);
}
