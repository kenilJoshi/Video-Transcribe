// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import axiosInstance from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      
      console.log('Login successful:', response.data);
      
      if (response.data.access_token) {
        // Save access token in cookie
        const cookieOptions = {
          expires: rememberMe ? 7 : undefined, // 7 days if remember me, session cookie otherwise
          path: '/', // Available across entire app
          secure: process.env.NODE_ENV === 'production', // HTTPS only in production
          sameSite: 'lax' as const, // CSRF protection
        };
        
        Cookies.set('access_token', response.data.access_token, cookieOptions);
        
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }
      }
      
      toast.success('Login successful!');
      router.push('/app');

    } catch (err: any) {
      console.error('Login error:', err);

      if (err.response) {
        const errorMessage = err.response.data.detail || err.response.data.message;
        if (err.response.status === 401) {
          toast.error('Invalid email or password');
        } else if (err.response.status === 404) {
          toast.error('User not found. Please sign up first.');
        } else {
          toast.error(errorMessage || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        toast.error('Unable to connect to server. Please try again later.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
              ReelForge
            </h1>
          </Link>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">Welcome back</p>
        </div>

        {/* Login Form */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="h-9"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="h-9"
              />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <label htmlFor="remember" className="text-zinc-600 dark:text-zinc-400 cursor-pointer">
                  Remember me
                </label>
              </div>
              <Link 
                href="/forgot-password" 
                className="text-zinc-900 dark:text-zinc-100 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-9"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">Or continue with</span>
            </div>
          </div>

          {/* Google Login (Disabled) */}
          <Button
            disabled
            variant="outline"
            className="w-full h-9 text-zinc-500"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google (Coming Soon)
          </Button>

          {/* Sign Up Link */}
          <p className="text-center text-xs text-zinc-600 dark:text-zinc-400 mt-5">
            Don't have an account?{' '}
            <Link href="/signup" className="text-zinc-900 dark:text-zinc-100 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}