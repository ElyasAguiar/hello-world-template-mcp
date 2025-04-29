import axios from 'axios';
import { client } from '../config/api.ts';
import type { FetchPrometheusMetricParams } from '../types/index.ts';

export async function fetchPrometheusMetric({ metric_name, service_name }: FetchPrometheusMetricParams): Promise<any> {
  try {
    const query = buildPrometheusQuery(metric_name, service_name);
    const response = await axios.get(`http://localhost:9090/api/v1/query`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Prometheus metric:', error);
    throw error;
  }
}

function buildPrometheusQuery(metric_name: string, service_name: string): string {
  // Example logic to build a query based on metric_name and service_name
  switch (metric_name) {
    case 'request_rate':
      return `sum(rate(${service_name}_http_requests_total[5m]))`;
    case 'request_rate_by_endpoint':
      return `sum by(endpoint) (rate(${service_name}_http_requests_total[5m]))`;
    case 'error_count':
      return `sum(increase(${service_name}_http_requests_total{status=~"5.*|4.*"}[15m]))`;
    case 'error_rate':
      return `sum(rate(${service_name}_http_requests_total{status=~"5.*|4.*"}[5m])) / sum(rate(${service_name}_http_requests_total[5m])) * 100`;
    case 'latency_p95':
      return `histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, endpoint))`;
    case 'latency_avg':
      return `sum(rate(http_request_duration_seconds_sum[5m])) / sum(rate(http_request_duration_seconds_count[5m]))`;
    case 'availability':
      return `sum(rate(${service_name}_http_requests_total{status=~"2.*"}[5m])) / sum(rate(${service_name}_http_requests_total[5m])) * 100`;
    // Add more cases as needed
    default:
      throw new Error('Unsupported metric name');
  }
} 