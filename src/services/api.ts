import { client } from '../config/api.ts';
import type {
  StatusResponse,
} from '../types/index.ts';

/**
 * Checks if the API is alive and responding
 */
export async function checkApiStatus(): Promise<StatusResponse> {
  return await client.query({
    isAlive: true,
  }) as StatusResponse;
} 