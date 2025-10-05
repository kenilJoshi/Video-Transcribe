// lib/auth.ts
import Cookies from 'js-cookie';

export const setAuthToken = (token: string, rememberMe: boolean = false) => {
  const cookieOptions = {
    expires: rememberMe ? 7 : undefined, // 7 days if remember me, session cookie otherwise
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  };
  
  Cookies.set('access_token', token, cookieOptions);
};

export const getAuthToken = (): string | undefined => {
  return Cookies.get('access_token');
};

export const removeAuthToken = () => {
  Cookies.remove('access_token', { path: '/' });
};

export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};