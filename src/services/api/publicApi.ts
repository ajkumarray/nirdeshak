import { createAxiosInstance } from './config';
import { AuthResponse, LoginRequest, SignupRequest, ForgotPasswordRequest, ResetPasswordRequest, ApiErrorResponse } from './types';

const publicApi = createAxiosInstance(false);

export const authService = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    try {
      const response = await publicApi.post<AuthResponse>('/auth/login', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: "E00000",
        m: "Login failed",
        err: {
          errorCode: "E00000",
          errorMessage: apiError.response?.data?.message || 'Failed to login'
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
        mc: "E00000",
        m: "Registration failed",
        err: {
          errorCode: "E00000",
          errorMessage: apiError.response?.data?.message || 'Failed to register'
        }
      };
    }
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<AuthResponse> => {
    try {
      const response = await publicApi.post<AuthResponse>('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: "E00000",
        m: "Password reset request failed",
        err: {
          errorCode: "E00000",
          errorMessage: apiError.response?.data?.message || 'Failed to process forgot password request'
        }
      };
    }
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<AuthResponse> => {
    try {
      const response = await publicApi.post<AuthResponse>('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      const apiError = error as ApiErrorResponse;
      return {
        mc: "E00000",
        m: "Password reset failed",
        err: {
          errorCode: "E00000",
          errorMessage: apiError.response?.data?.message || 'Failed to reset password'
        }
      };
    }
  }
}; 