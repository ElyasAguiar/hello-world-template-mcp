import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createMcpClient } from './setup.ts';
import type { McpToolResponse } from './types.ts';

describe('Hello World Tool', () => {
  it('should return a default greeting', async () => {
    // Create the MCP client
    const client = await createMcpClient();
    
    try {
      // Call the hello world tool
      const toolName = 'mcp_hello_world_template_mcp_hello_world';
      const params = { random_string: 'test' };
      
      // @ts-ignore - Ignoring type checking for this call due to API differences
      const response = await client.request(toolName, params) as McpToolResponse;
      
      // Verify the response
      assert.ok(response.content, 'Response should have content');
      assert.equal(response.content.length, 1, 'Should have one content item');
      assert.equal(response.content[0].type, 'text', 'Content should be text type');
      assert.equal(response.content[0].text, 'Hello, World!', 'Content should be the expected greeting');
    } finally {
      // Clean up
      if (client.transport) {
        await client.transport.close();
      }
    }
  });
}); 