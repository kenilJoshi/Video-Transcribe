// lib/server-auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000';

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
  // Add other user properties from your FastAPI response
}

interface AuthResult {
  user: User | null;
  error?: string;
}

export async function getCurrentUser(): Promise<User> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    redirect('/login');
  }

  try {
    const response = await fetch(`${FASTAPI_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    if (response.status === 401) {
      // Token expired or invalid
      redirect('/logout?reason=session_expired');
    }

    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }

    const user = await response.json();
    return user;

  } catch (error) {
    console.error('Get current user error:', error);
    redirect('/login');
  }
}

// Optional: Version that doesn't redirect (for optional auth)
export async function getCurrentUserOptional(): Promise<AuthResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');

  if (!token) {
    return { user: null };
  }

  try {
    const response = await fetch(`${FASTAPI_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token.value}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return { user: null, error: 'Invalid token' };
    }

    const user = await response.json();
    return { user };

  } catch (error) {
    return { user: null, error: 'Failed to fetch user' };
  }
}

// Helper to get just the token
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  return token?.value || null;
}