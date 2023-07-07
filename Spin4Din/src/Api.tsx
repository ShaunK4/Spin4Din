import ApiConfig from "../ApiConfig.json";

export function getApiUrl(): string {
  return ApiConfig.apiUrl;
}
