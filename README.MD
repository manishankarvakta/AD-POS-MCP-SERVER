# MCP Server - MongoDB Connected Platform

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.x-green)

A secure middleware server connecting to MongoDB with read-only analytics capabilities and e-commerce management features.


## Table of Contents
- [Features](#features)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
- [API Documentation](#api-documentation)
  - [Order Management](#order-management)
  - [Customer Management](#customer-management)
  - [Product Services](#product-services)
  - [Analytics](#analytics)
- [Development Guide](#development-guide)
  - [Project Structure](#project-structure)
  - [Available Scripts](#available-scripts)
  - [Coding Standards](#coding-standards)
- [License](#license)

## Features
- 🔒 Secure MongoDB connection
- 📊 Read-only aggregation pipelines
- 📦 Order lifecycle management
- 👥 Customer CRUD operations
- 📈 Business analytics endpoints
- 🛡️ Aggregation pipeline validation
- 📦 Modular TypeScript architecture

## Setup Instructions

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account
- TypeScript v5+

### File Structure
mcp-server/
├── src/
│   ├── config/
│   │   ├── env.ts
│   │   └── constants.ts
│   ├── handlers/
│   │   ├── resource.handler.ts
│   │   ├── tool.handler.ts
│   │   └── prompt.handler.ts
│   ├── services/
│   │   └── database.service.ts
│   ├── types/
│   │   └── index.ts
│   └── index.ts
├── test/
│   └── unit/
│       └── handlers/
│           └── resource.test.ts
├── .env.example
├── tsconfig.json
├── package.json
└── README.md

### Installation
```bash
# Clone repository
git clone https://github.com/manishankarvakta/ad-pos-mcp-server.git
cd ad-pos-mcp-server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
