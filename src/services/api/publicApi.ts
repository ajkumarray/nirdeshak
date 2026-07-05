import { createAxiosInstance } from './config';
import { AuthResponse, LoginRequest, SignupRequest, ApiErrorResponse } from './types';

const publicApi = createAxiosInstance(false);

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await publicApi.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: apiError.response?.data?.mc || "E00000",
        m: apiError.response?.data?.m || "Login failed",
        err: {
          errorCode: apiError.response?.data?.err?.errorCode || "E00000",
          errorMessage: apiError.response?.data?.err?.errorMessage || apiError.response?.data?.m || 'Failed to login'
        }
      };
    }
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    try {
      const response = await publicApi.post<AuthResponse>('/auth/register', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: apiError.response?.data?.mc || "E00000",
        m: apiError.response?.data?.m || "Registration failed",
        err: {
          errorCode: apiError.response?.data?.err?.errorCode || "E00000",
          errorMessage: apiError.response?.data?.err?.errorMessage || apiError.response?.data?.m || 'Failed to register'
        }
      };
    }
  }
}; 