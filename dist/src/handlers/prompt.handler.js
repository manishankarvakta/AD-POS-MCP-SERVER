"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BUSINESS_PROMPTS = void 0;
exports.getPromptTemplate = getPromptTemplate;
// We'll use the any type here as a workaround
// since the SDK's Server type doesn't match our expected interface
function getPromptTemplate(server) {
    server.prompt("create_sales_order", async (args) => {
        const typedArgs = args;
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
exports.BUSINESS_PROMPTS = [
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
