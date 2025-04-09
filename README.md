# hello-world-template-mcp

A simple Hello World Model Context Protocol (MCP) template.

## Available Tools

This MCP server provides the following tools:

- `hello-world`: Returns a hello world message with optional name parameter
  - Supports optional name parameter to customize the greeting

## Setup

1. Make sure you're using Node.js v20+
```bash
node -v
#v20.0.0 or higher
```

2. Clone this repository:
```bash
git clone https://github.com/aguiardev/hello-world-template-mcp.git
cd hello-world-template-mcp
```

3. Restore dependencies:
```bash
npm ci
```

## Integration with AI Tools

### Cursor Setup

1. Open Cursor Settings
2. Navigate to MCP section
3. Click "Add new MCP server"
4. Configure the server:
   ```
   Name = hello-world-template
   Type = command
   Command = node ABSOLUTE_PATH_TO_PROJECT/src/index.ts
   ```

or configure directly from the Cursor's global MCP file located in `~/.cursor/mcp.json` and add the following:

```json
{
  "mcpServers": {
    "hello-world-template": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

5. Make sure Cursor chat is in Agent mode by selecting "Agent" in the lower left side dropdown

6. Go to the chat and ask "Hello World" or "Hello [your name]"

### Claude Desktop Setup

1. Go to Claude settings
2. Click in the Developer tab
3. Click in edit config
4. Open the config in a code editor
5. Add the following configuration to your Claude Desktop config:

```json
{
  "mcpServers": {
    "hello-world-template": {
      "command": "node",
      "args": ["ABSOLUTE_PATH_TO_PROJECT/src/index.ts"]
    }
  }
}
```

6. Save file and Restart Claude Desktop
7. Open the Developer tab again and check if it's in the "running" state
8. Go to the chat and ask "Hello World" or "Hello [your name]"

## Development

### Features

- Built with Model Context Protocol (MCP)
- Type-safe with TypeScript and Zod schema validation
- Native TypeScript support in Node.js without transpilation
- Modular architecture with separation of concerns
- Standard I/O transport for easy integration
- Structured error handling
- Compatible with Claude Desktop, Cursor, and other MCP clients

> Note: This project requires Node.js v20+ as it uses the native TypeScript support.

### Architecture

The codebase follows a modular structure:

```
src/
  ├── config/      # Configuration settings
  ├── types/       # TypeScript interfaces and types
  ├── tools/       # MCP tool implementations
  ├── utils/       # Utility functions
  ├── services/    # API service layer
  └── index.ts     # Main entry point
```

## Testing

To run the test suite:

```bash
npm test
```

For development mode with watch:

```bash
npm run test:dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

[Elyas Aguiar](https://dev.elyasaguiar.com.br)

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

### Running the Server

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

### Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:dev
```

## License

MIT