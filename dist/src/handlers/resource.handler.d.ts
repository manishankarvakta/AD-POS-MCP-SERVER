export declare function listCollections(): Promise<(import("mongodb").CollectionInfo | Pick<import("mongodb").CollectionInfo, "name" | "type">)[]>;
export declare function getCollectionSchema(collectionName: string): Promise<import("mongodb").WithId<import("bson").Document> | null>;
export declare function setupResourceHandlers(server: any): void;
