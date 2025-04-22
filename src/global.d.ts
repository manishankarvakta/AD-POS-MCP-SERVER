declare module "@modelcontextprotocol/sdk/server" {
  export interface ServerInfo {
    name: string;
    version: string;
  }

  export interface ServerOptions {
    capabilities: {
      resources: Record<string, unknown>;
      tools: Record<string, unknown>;
      prompts: Record<string, unknown>;
    };
  }

  export class Server {
    constructor(info: ServerInfo, options: ServerOptions);
    connect(transport: unknown): Promise<void>;
    method(name: string, handler: (...args: unknown[]) => unknown): void;
    prompt(name: string, handler: (args: unknown) => Promise<unknown>): void;
  }
}

declare module "@modelcontextprotocol/sdk/server/stdio" {
  export class StdioServerTransport {
    constructor();
  }
}
