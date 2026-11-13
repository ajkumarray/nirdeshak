import { getCookies, setCookies, removeCookies } from '@/lib/utils';

// Matches the refresh token's lifetime; both cookies are re-set on every refresh
const TOKEN_EXPIRY_DAYS = 7;

export const getAccessToken = (): string | null => getCookies('token');

export const getRefreshToken = (): string | null => getCookies('refreshToken');

export const saveTokens = (token: string, refreshToken?: string) => {
  setCookies('token', token, TOKEN_EXPIRY_DAYS);
  if (refreshToken) {
    setCookies('refreshToken', refreshToken, TOKEN_EXPIRY_DAYS);
  }
};

export const clearSession = () => {
  removeCookies('token');
  removeCookies('refreshToken');
  localStorage.removeItem('user');
};
