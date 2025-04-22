// src/handlers/tool.handler.ts
import { FORBIDDEN_AGGREGATION_STAGES } from '../config/constants';
import { getDatabase } from '../services/database.services';

export function validatePipeline(pipeline: any[]) {
  return pipeline.some(stage => 
    Object.keys(stage).some(key => 
      FORBIDDEN_AGGREGATION_STAGES.includes(key)
    )
  );
}

export async function runAggregation(collection: string, pipeline: any[]) {
  const db = await getDatabase();
  return db.collection(collection).aggregate(pipeline).toArray();
}

export async function createOrder(orderData: any) {
  const db = await getDatabase();
  const order = {
    ...orderData,
    orderId: `ORD-${Date.now()}`,
    createdAt: new Date()
  };
  await db.collection('orders').insertOne(order);
  return order;
}

// Add the setup function
export function setupToolHandlers(server: any) {
  // Registering the functions as server methods
  server.method('validatePipeline', validatePipeline);
  server.method('runAggregation', runAggregation);
  server.method('createOrder', createOrder);
}
