import { createAxiosInstance } from './config';
import { ApiErrorResponse } from './types';

const authApi = createAxiosInstance(true);

export interface ShortenUrlRequest {
  url: string;
  expirationDays: number;
}

export interface ShortenUrlResponse {
  success: boolean;
  shortUrl?: string;
  error?: string;
}

export const urlService = {
  shortenUrl: async (data: ShortenUrlRequest): Promise<ShortenUrlResponse> => {
    try {
      const response = await authApi.post('/urls', data);
      return {
        success: true,
        shortUrl: response.data.shortUrl,
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        success: false,
        error: apiError.response?.data?.message || 'Failed to shorten URL',
      };
    }
  },

  // Add other authenticated API calls here
  getUserUrls: async () => {
    try {
      const response = await authApi.get('/urls');
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        success: false,
        error: apiError.response?.data?.message || 'Failed to fetch URLs',
      };
    }
  },
}; 