// lib/logout.ts
import axios from 'axios';
import { toast } from 'sonner';

export const logout = async (router: any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {},
      {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    console.log('Logout successful:', response.data);
    
    // Clear any stored data
    localStorage.removeItem('rememberMe');
    
    toast.success('Logged out successfully');
    router.push('/login');

  } catch (err: any) {
    console.error('Logout error:', err);

    if (err.response) {
      const errorMessage = err.response.data.detail || err.response.data.message;
      toast.error(errorMessage || 'Logout failed. Please try again.');
    } else if (err.request) {
      toast.error('Unable to connect to server. Please try again later.');
    } else {
      toast.error('An unexpected error occurred. Please try again.');
    }
  }
};