import { createAxiosInstance } from './config';
import { ApiResponse, ApiErrorResponse } from './types';

interface ShortenUrlRequest {
  url: string;
  expirationDays: number;
  status: string;
  code?: string;
}

interface ShortenUrlResponse {
  shortUrl: string;
  code?: string;
}

type ShortenUrlApiResponse = ApiResponse<ShortenUrlResponse> & { httpStatus?: number };

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
  shortenUrl: async (data: ShortenUrlRequest, isAuthenticated: boolean): Promise<ShortenUrlApiResponse> => {
    const api = createAxiosInstance(isAuthenticated);
    // `code` (custom short code) is only honored on the authenticated endpoint —
    // strip it here so it can never leak onto the anonymous/public request.
    const payload: ShortenUrlRequest = isAuthenticated
      ? data
      : { url: data.url, expirationDays: data.expirationDays, status: data.status };
    try {
      const baseUrl = isAuthenticated ? 'url' : 'public/url';
      const response = await api.post<ApiResponse<ShortenUrlResponse>>(baseUrl, payload);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: apiError.response?.data?.mc || "E00000",
        m: apiError.response?.data?.m || "Failed to shorten URL",
        err: {
          errorCode: apiError.response?.data?.err?.errorCode || "E00000",
          errorMessage: apiError.response?.data?.err?.errorMessage || apiError.response?.data?.m || 'Failed to shorten URL'
        },
        httpStatus: apiError.response?.status
      };
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