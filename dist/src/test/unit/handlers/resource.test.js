"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// test/unit/handlers/resource.test.ts
const resource_handler_1 = require("../../../handlers/resource.handler");
describe('Resource Handlers', () => {
    it('should list collections', async () => {
        const collections = await (0, resource_handler_1.listCollections)();
        expect(collections).toBeInstanceOf(Array);
    });
});
