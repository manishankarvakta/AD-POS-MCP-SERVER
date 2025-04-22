// test/unit/handlers/resource.test.ts
import { listCollections } from '../../../handlers/resource.handler';


describe('Resource Handlers', () => {
  it('should list collections', async () => {
    const collections = await listCollections();
    expect(collections).toBeInstanceOf(Array);
  });
});