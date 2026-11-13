import axios, { InternalAxiosRequestConfig } from 'axios';
import { getUserCode } from '../../lib/utils';
import { clearSession, getAccessToken, getRefreshToken, saveTokens } from './tokens';
import { AuthResponse } from './types';
const BASE_URL = 'https://api.url.ajkumarray.com/api/v1';

// Real permission denial (as opposed to a missing/expired token), so no refresh is attempted
const ACCESS_DENIED_CODE = 'M01211';

export const commonHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'X-App-Version': '1.0.0', // You can update this based on your app version
  'X-Platform': 'web',
};

type RetryableRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };

const redirectToLogin = () => {
  clearSession();
  window.location.href = '/login';
};

// Resolves to a usable access token, or null when the session can't be renewed.
// Throws on network/server errors so a flaky connection doesn't log the user out.
const requestNewAccessToken = async (failedToken: string | null): Promise<string | null> => {
  const run = async () => {
    // Another tab may have refreshed while we waited for the lock; refresh tokens are
    // single-use, so reuse its result instead of spending the (now revoked) old one
    const currentToken = getAccessToken();
    if (currentToken && currentToken !== failedToken) {
      return currentToken;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return null;
    }

    try {
      const response = await axios.post<AuthResponse>(`${BASE_URL}/auth/refresh`, null, {
        headers: { ...commonHeaders, Authorization: `Bearer ${refreshToken}` },
      });
      const tokens = response.data.lc;
      if (!tokens?.token) {
        return null;
      }
      saveTokens(tokens.token, tokens.refreshToken);
      return tokens.token;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return null;
      }
      throw error;
    }
  };

  // Web Locks span tabs, so only one tab spends the refresh token at a time
  return 'locks' in navigator
    ? navigator.locks.request('nirdeshak-token-refresh', run)
    : run();
};

// Requests failing together within a tab share one refresh
let pendingRefresh: Promise<string | null> | null = null;

const refreshAccessToken = (failedToken: string | null) => {
  if (!pendingRefresh) {
    pendingRefresh = requestNewAccessToken(failedToken).finally(() => {
      pendingRefresh = null;
    });
  }
  return pendingRefresh;
};

export const createAxiosInstance = (withAuth = false) => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: commonHeaders,
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      if (withAuth) {
        const token = getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        } else {
          // If no token is found and auth is required, redirect to login
          redirectToLogin();
          return Promise.reject('No authentication token found');
        }
      } else {
        const userCode = getUserCode();
        if (userCode) {
          config.headers.UserCode = userCode;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      // Only authenticated requests: a 401 from a public endpoint like login just means bad credentials.
      // The API answers 403 (not 401) for a missing, invalid or expired access token.
      const status = error.response?.status;
      const isAuthError = withAuth && (status === 401 || status === 403)
        && error.response?.data?.mc !== ACCESS_DENIED_CODE;
      const originalRequest = error.config as RetryableRequestConfig | undefined;

      if (!isAuthError || !originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest._retry) {
        // Still rejected with a freshly refreshed token
        redirectToLogin();
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      const failedToken = String(originalRequest.headers.Authorization ?? '').replace('Bearer ', '') || null;
      let newToken: string | null;
      try {
        newToken = await refreshAccessToken(failedToken);
      } catch {
        return Promise.reject(error);
      }

      if (!newToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      // The request interceptor attaches the new token from the cookie
      return instance(originalRequest);
    }
  );

  return instance;
};
