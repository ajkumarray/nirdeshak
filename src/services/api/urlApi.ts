import { createAxiosInstance } from './config';
import { ApiResponse } from './types';

interface ShortenUrlRequest {
  url: string;
  expirationDays: number;
  status: string;
}

interface ShortenUrlResponse {
  shortUrl: string;
}

export const urlService = {
  shortenUrl: async (data: ShortenUrlRequest, isAuthenticated: boolean): Promise<ApiResponse<ShortenUrlResponse>> => {
    const api = createAxiosInstance(isAuthenticated);
    try {
      const baseUrl = isAuthenticated ? 'api/v1/url' : 'api/v1/public/url';
      const response = await api.post<ApiResponse<ShortenUrlResponse>>(baseUrl, data);
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getUserUrls: async (): Promise<ApiResponse<{ urls: Array<{ shortUrl: string; originalUrl: string; createdAt: string }> }>> => {
    const api = createAxiosInstance(true); // Using authenticated instance
    try {
      const response = await api.get<ApiResponse<{ urls: Array<{ shortUrl: string; originalUrl: string; createdAt: string }> }>>('/urls');
      return response.data;
    } catch (error) {
      return {
        mc: "E00000",
        m: "Failed to fetch URLs",
        err: {
          errorCode: "E00000",
          errorMessage: "Failed to fetch URLs"
        }
      };
    }
  }
}; 