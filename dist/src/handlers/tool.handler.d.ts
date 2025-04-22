export declare function validatePipeline(pipeline: any[]): boolean;
export declare function runAggregation(collection: string, pipeline: any[]): Promise<import("bson").Document[]>;
export declare function createOrder(orderData: any): Promise<any>;
export declare function setupToolHandlers(server: any): void;
