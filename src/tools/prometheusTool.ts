import { fetchPrometheusMetric } from '../services/api.ts';
import { z } from 'zod';
import type { McpResponse, McpTextContent } from '../types/index.ts';

export const prometheusTool = {
  name: "prometheus",
  description: "Returns a prometheus metric with optional metric_name and service_name parameters.",
  parameters: {
    metric_name: z.string().describe('The name of the metric to fetch.'),
    service_name: z.string().describe('The name of the service for which to fetch the metric.')
  },
  handler: async (args: { metric_name: string; service_name: string }): Promise<McpResponse> => {
    try {
      const { metric_name, service_name } = args;
      const result = await fetchPrometheusMetric({ metric_name, service_name });
      const content: McpTextContent = {
        type: "text",
        text: JSON.stringify(result)
      };
      return {
        content: [content]
      };
    } catch (error) {
      throw new Error(`Failed to fetch Prometheus metric: ${error.message}`);
    }
  }
}
