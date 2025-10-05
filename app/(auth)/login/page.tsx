// app/login/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { config } from '@/lib/config';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${config.apiUrl}/auth/auth/login`,
        {
          email: email,
          password: password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true // Important for cookies
        }
      );

      // Login successful
      console.log('Login successful:', response.data);

      // Store token if needed (if not using cookies)
      if (response.data.access_token) {
        // Option 1: Store in memory or state management
        // Option 2: Let the backend handle it via cookies (recommended)

        if (rememberMe) {
          // You can store user preference
          localStorage.setItem('rememberMe', 'true');
        }
      }

      // Redirect to dashboard or home
      router.push('/onboarding');

    } catch (err: any) {
      console.error('Login error:', err);

      if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data.detail || err.response.data.message;

        if (err.response.status === 401) {
          setError('Invalid email or password');
        } else if (err.response.status === 404) {
          setError('User not found. Please sign up first.');
        } else {
          setError(errorMessage || 'Login failed. Please try again.');
        }
      } else if (err.request) {
        // Request made but no response
        setError('Unable to connect to server. Please try again later.');
      } else {
        // Other errors
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ReelForge
            </h1>
          </Link>
          <p className="text-slate-400 mt-2">Welcome back! Sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-slate-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2 rounded border-white/10 bg-slate-900/50" />
                <span className="text-slate-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight className="w-5 h-5" />}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/50 text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Google Login (Disabled) */}
          <button
            disabled
            className="w-full py-3 bg-slate-700/30 border border-white/10 rounded-lg font-semibold text-slate-500 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
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
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}