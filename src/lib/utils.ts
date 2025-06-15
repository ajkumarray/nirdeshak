import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
const ENCRYPTION_SECRET_KEY = "secret";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const encrypt = (value) => {
  try {
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    return CryptoJS.AES.encrypt(stringValue, ENCRYPTION_SECRET_KEY).toString();
  } catch (error) {
    console.error('Error encrypting value:', error);
    return null;
  }
};

export const decrypt = (value: any) => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, ENCRYPTION_SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    try {
      return JSON.parse(decrypted);
    } catch {
      return decrypted;
    }
  } catch (error) {
    console.error('Decryption error: ', error);
    return null;
  }
}

export const setLocalStorage = (key: string, value: any) => {
  try {
    const encrypted = encrypt(value);
    localStorage.setItem(key, encrypted);
  } catch (error) {
    console.error('Error setting local storage:', error);
  }
}

export const getLocalStorage = (key: string) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  return decrypt(encrypted);
}

export const removeLocalStorage = (key: string) => {
  localStorage.removeItem(key);
}

export const generateAlphaNumericCode = (length: number) => {
  const code = "ND" + Math.random().toString(36).substring(2, 2 + length);
  return code;
}

export const getUserCode = () => {
  const userCode = getCookies('userCode');
  if (!userCode) {
    const code = generateAlphaNumericCode(8);
    setCookies('userCode', code);
    return code;
  }
  return userCode;
}

export const setCookies = (key: string, value: any) => {
  const encrypted = encrypt(value);
  Cookies.set(key, encrypted);
}

export const getCookies = (key: string) => {
  const encrypted = Cookies.get(key);
  if (!encrypted) return null;
  return decrypt(encrypted);
}

export const removeCookies = (key: string) => {
  Cookies.remove(key);
}