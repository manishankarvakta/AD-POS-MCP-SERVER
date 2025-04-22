// src/handlers/resource.handler.ts
import { getDatabase } from '../services/database.services';

export async function listCollections() {
  const db = await getDatabase();
  return db.listCollections().toArray();
}

export async function getCollectionSchema(collectionName: string) {
  const db = await getDatabase();
  return db.collection(collectionName).findOne();
}

// Add the setup function
export function setupResourceHandlers(server: any) {
  // Registering the functions as server methods
  server.method('listCollections', listCollections);
  server.method('getCollectionSchema', getCollectionSchema);
}
