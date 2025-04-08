import type { McpResponse, McpTextContent } from '../types/index.ts';
import { TOOL_CONFIG } from '../config/api.ts';

/**
 * MCP tool definition for hello world
 */
export const helloWorldTool = {
  name: TOOL_CONFIG.hello.name,
  description: TOOL_CONFIG.hello.description,
  parameters: {},
  handler: async (params: { name?: string }): Promise<McpResponse> => {
    try {
      const name = params.name || "World";
      
      const content: McpTextContent = {
        type: "text",
        text: `Hello, ${name}!`
      };

      return {
        content: [content],
      };
    } catch (error) {
      throw new Error(`Failed to generate greeting: ${error.message}`);
    }
  }
}; 