import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface ApiErrorDetails {
  errorCode: string;
  errorMessage: string;
}

export interface ApiResponse<T> {
  mc: string;
  m: string;
  lc?: T;
  err?: ApiErrorDetails;
}

export interface LoginResponse {
  token: string;
}

export type AuthResponse = ApiResponse<LoginResponse>;

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
  profilePic?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

export type ApiErrorResponse = AxiosError<{
  message: string;
  status: number;
  data?: Record<string, unknown>;
}>; 