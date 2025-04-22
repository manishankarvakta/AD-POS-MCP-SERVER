# Aamar Dokan POS MCP Server

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-green)
![MCP SDK](https://img.shields.io/badge/MCP_SDK-1.9.0-purple)

A Model Context Protocol (MCP) server for Aamar Dokan POS system, providing a secure middleware connection to MongoDB with analytical capabilities, order management, and AI-assisted prompt generation.

## Table of Contents

- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [Architecture](#architecture)
  - [Project Structure](#project-structure)
  - [MCP Protocol](#mcp-protocol)
- [API Documentation](#api-documentation)
  - [Resource Methods](#resource-methods)
  - [Tool Methods](#tool-methods)
  - [Prompt Capabilities](#prompt-capabilities)
- [Development Guide](#development-guide)
  - [Available Scripts](#available-scripts)
  - [Adding New Methods](#adding-new-methods)
  - [Testing](#testing)
  - [Coding Standards](#coding-standards)
- [Troubleshooting](#troubleshooting)
- [Changelog](#changelog)
- [License](#license)

## Features

- 🔒 Secure MongoDB connection
- 📊 Read-only aggregation pipelines with security validation
- 📦 Order lifecycle management
- 🤖 AI-assisted prompt generation for sales operations
- 📈 Business analytics capabilities
- 🔍 Collection exploration and schema discovery
- 📱 Integration with Aamar Dokan POS system
- 🛡️ Type-safe implementation with TypeScript

## Setup Instructions

### Prerequisites

- Node.js v18+
- npm v9+
- MongoDB v6+
- TypeScript v5+
- MCP SDK v1.9.0

### Installation

```bash
# Clone repository
git clone https://github.com/manishankarvakta/ad-pos-mcp-server.git
cd ad-pos-mcp-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Configuration

Configure your environment variables in the `.env` file:

```
MONGO_URI=mongodb://username:password@hostname:port/database?authSource=admin
```

## Architecture

### Project Structure

```
ad-pos-mcp-server/
├── src/
│   ├── config/
│   │   ├── env.ts             # Environment variables
│   │   └── constants.ts       # Application constants
│   ├── handlers/
│   │   ├── resource.handler.ts # Collection and resource handlers
│   │   ├── tool.handler.ts     # Tool method implementations
│   │   └── prompt.handler.ts   # AI prompt generation
│   ├── services/
│   │   └── database.services.ts # MongoDB connection
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── global.d.ts            # Global type declarations
│   └── index.ts               # Entry point
├── .env                       # Environment variables
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Documentation
```

### MCP Protocol

The MCP (Model Context Protocol) server implements a standardized interface for AI models to interact with your application data. It provides:

1. **Resources**: Data sources and collections
2. **Tools**: Function-like capabilities for data manipulation
3. **Prompts**: Context-aware template generation

## API Documentation

### Resource Methods

#### `listCollections`

Returns a list of all collections in the connected MongoDB database.

- **Parameters**: None
- **Returns**: Array of collection information objects
- **Example**:
  ```javascript
  const collections = await listCollections();
  // Returns: [{ name: "orders", ... }, { name: "products", ... }]
  ```

#### `getCollectionSchema`

Returns a sample document from a collection to help identify its schema.

- **Parameters**: 
  - `collectionName` (string): Name of the collection
- **Returns**: A sample document from the collection
- **Example**:
  ```javascript
  const schema = await getCollectionSchema("orders");
  // Returns: { _id: "...", customerId: "...", products: [...], ... }
  ```

### Tool Methods

#### `createOrder`

Creates a new order in the database.

- **Parameters**:
  - `orderData` (OrderData): Order information including:
    - `customerId` (string): Customer identifier
    - `products` (array): Array of products with:
      - `productId` (string): Product identifier
      - `quantity` (number): Quantity ordered
      - `price` (number, optional): Product price
    - `total` (number, optional): Order total
- **Returns**: Created order object with generated orderId and timestamp
- **Example**:
  ```javascript
  const order = await createOrder({
    customerId: "CUST-001",
    products: [
      { productId: "PROD-001", quantity: 2, price: 10.99 }
    ]
  });
  // Returns: { orderId: "ORD-1619364578245", customerId: "CUST-001", ... }
  ```

#### `runAggregation`

Executes a MongoDB aggregation pipeline on a collection with security validation.

- **Parameters**:
  - `collection` (string): Name of the collection to query
  - `pipeline` (array): MongoDB aggregation pipeline stages
- **Returns**: Results of the aggregation operation
- **Security**: Blocks dangerous operations like `$out`, `$merge`, and `$geoNear`
- **Example**:
  ```javascript
  const results = await runAggregation("orders", [
    { $match: { customerId: "CUST-001" } },
    { $group: { _id: "$customerId", total: { $sum: "$total" } } }
  ]);
  // Returns: [{ _id: "CUST-001", total: 245.87 }]
  ```

### Prompt Capabilities

#### `create_sales_order`

Generates a prompt for creating a sales order.

- **Parameters**:
  - `customerId` (string): Customer identifier
  - `products` (array): Array of products to include in the order
- **Returns**: A prompt message structure
- **Example**:
  ```javascript
  const prompt = await create_sales_order({
    customerId: "CUST-001",
    products: [{ productId: "PROD-001", quantity: 2 }]
  });
  ```

## Development Guide

### Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start the production server
- `npm run dev` - Start development server with hot-reload
- `npm run test` - Run test suite

### Adding New Methods

To add a new method to the MCP server:

1. **Define Types**: Add the necessary interfaces in `src/types/index.ts`
2. **Implement the Method**: Create implementation in the appropriate handler file
3. **Register the Method**: Add it to the server in `src/index.ts`

Example of adding a new tool method:

```typescript
// 1. Define the type
interface ProductData {
  name: string;
  price: number;
  category: string;
}

// 2. Implement the method
const createProduct = async (productData: ProductData) => {
  const db = await getDatabase();
  const result = await db.collection('products').insertOne({
    ...productData,
    createdAt: new Date()
  });
  return { ...productData, _id: result.insertedId };
};

// 3. Register in index.ts
mcpServer.method('createProduct', createProduct);
```

### Testing

Run tests with `npm test`. Add new tests in the `test/` directory.

Example test:

```typescript
describe('createOrder', () => {
  it('should create an order with valid data', async () => {
    const order = await createOrder({
      customerId: 'test',
      products: [{ productId: 'p1', quantity: 1 }]
    });
    expect(order).toHaveProperty('orderId');
    expect(order.customerId).toBe('test');
  });
});
```

### Coding Standards

- Follow TypeScript best practices with strict type checking
- Use async/await for all database operations
- Add JSDoc comments for all public methods
- Follow the existing project structure
- Validate all inputs before executing database operations

## Troubleshooting

### Common Issues

- **MongoDB Connection Failures**: Verify your MongoDB URI and network settings
- **Type Errors**: Ensure all interfaces are properly defined and used
- **MCP SDK Version Conflicts**: This project uses MCP SDK v1.9.0

### Debug Mode

Set `DEBUG=true` in your `.env` file for additional logging.

## Changelog

### v1.0.0 (2024-04-22)
- Initial release with core MCP server functionality
- MongoDB integration for database operations
- Basic resource handlers for collection operations
- Tool handlers for creating orders and running aggregations
- Prompt generation for sales orders

## License

ISC License

Copyright (c) 2024 Aamar Dokan

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.
