// src/handlers/prompt.handler.ts
import type { Server } from "@modelcontextprotocol/sdk/server";

interface SalesOrderArgs {
  customerId: string;
  products: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface PromptResponse {
  messages: Array<{
    role: string;
    content: string;
  }>;
}

// We'll use the any type here as a workaround
// since the SDK's Server type doesn't match our expected interface
export function getPromptTemplate(
  //@ts-ignore
  server: any,
) {
  server.prompt("create_sales_order", async (args: unknown) => {
    const typedArgs = args as SalesOrderArgs;

    return {
      messages: [
        {
          role: "system",
          content: `Create order for customer ${typedArgs.customerId} with the following products: ${JSON.stringify(typedArgs.products)}`,
        },
      ],
    };
  });
}

export const BUSINESS_PROMPTS = [
  {
    name: "create_sales_order",
    description: "Generate new sales order with product details",
    arguments: [
      { name: "customerId", required: true },
      { name: "products", required: true },
    ],
  },
  // ... other prompts
];
