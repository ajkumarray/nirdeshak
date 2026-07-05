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

export interface UrlItem {
  id: number;
  code: string;
  shortUrl: string;
  url: string;
  createdAt: string;
  expiresAt: string;
  clickCount: number;
  status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED';
  lastAccessedAt: string | null;
  createdBy: string;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

export const urlService = {
  shortenUrl: async (data: ShortenUrlRequest, isAuthenticated: boolean): Promise<ApiResponse<ShortenUrlResponse>> => {
    const api = createAxiosInstance(isAuthenticated);
    try {
      const baseUrl = isAuthenticated ? 'url' : 'public/url';
      const response = await api.post<ApiResponse<ShortenUrlResponse>>(baseUrl, data);
      if (response.status === 200) {
        return response.data;
      }
      return response.data;
    } catch (error) {
      return error;
    }
  },

  getUserUrls: async (page: number, size: number): Promise<ApiResponse<PagedResponse<UrlItem>>> => {
    const api = createAxiosInstance(true); // Using authenticated instance
    try {
      const response = await api.get<ApiResponse<PagedResponse<UrlItem>>>('url', { params: { page, size } });
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