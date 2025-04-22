"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCollections = listCollections;
exports.getCollectionSchema = getCollectionSchema;
exports.setupResourceHandlers = setupResourceHandlers;
// src/handlers/resource.handler.ts
const database_services_1 = require("../services/database.services");
async function listCollections() {
    const db = await (0, database_services_1.getDatabase)();
    return db.listCollections().toArray();
}
async function getCollectionSchema(collectionName) {
    const db = await (0, database_services_1.getDatabase)();
    return db.collection(collectionName).findOne();
}
// Add the setup function
function setupResourceHandlers(server) {
    // Registering the functions as server methods
    server.method('listCollections', listCollections);
    server.method('getCollectionSchema', getCollectionSchema);
}
