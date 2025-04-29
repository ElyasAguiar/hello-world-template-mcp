// GraphQL API endpoint
export const GRAPHQL_API = 'https://tml-api.herokuapp.com/graphql';

// Initialize the GraphQL client
export const client = () => {
  return;
}

// Tool configurations
export const TOOL_CONFIG = {
  hello: {
    name: "hello_world",
    description: "Returns a hello world message with optional name parameter."
  },
  prometheus: {
    name: "prometheus",
    description: `
    Returns a prometheus metric with optional metric_name and service_name parameters.
    Supported metrics: request_rate, request_rate_by_endpoint, error_count, error_rate, latency_p95, latency_avg, availability
    `
  }
};

// Server configuration
export const SERVER_CONFIG = {
  name: "hello-world-template",
  version: "1.0.0",
  description: "A simple Hello World MCP template.",
};
