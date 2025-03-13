import { envConfig } from '../../env';
import { OpenAPI } from './core/OpenAPI';

export function initCoreV2OpenAPIConfig() {
  OpenAPI.BASE = envConfig.CORE_API_V2_URL;
  OpenAPI.interceptors.request.use(request => {
    request.headers = {
      ...request.headers,
      'Content-Type': 'application/json',
    };
    return request;
  });

  OpenAPI.interceptors.response.use(async response => {
    if (response.status === 401) {
      // Implement remove session logic
    }

    return response;
  });
}
