import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { toast } from 'react-toastify';

const isDevelopment = import.meta.env.MODE === 'development';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:5000/api/v1' 
  : 'https://vehicle-bookings-jilan-mansuri.onrender.com/api/v1';

const api = axios.create({
  // Dynamically switches between local and render backend based on environment
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For cookies if needed
});

// Request Interceptor to add JWT
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Ignore canceled requests (e.g. from React Query unmounting)
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response) {
      // Token expired or invalid
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          // Attempt to refresh token
          const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh-token`,
            {},
            { withCredentials: true }
          );
          
          // Import login action dynamically to avoid circular dependencies if any
          const { login } = await import('../store/slices/authSlice');
          
          // Assuming user data is still in state, just update token. 
          // If we need user data, we could fetch /me, but we only strictly need to update token
          const state = store.getState();
          store.dispatch(login({ user: state.auth.user, token: data.data.accessToken }));

          // Update Authorization header and retry request
          originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Refresh token failed, logout
          store.dispatch(logout());
          toast.error('Session expired. Please login again.');
          return Promise.reject(refreshError);
        }
      } else if (error.response.status !== 401) {
        const message = error.response.data?.message || 'Something went wrong!';
        // Prevent showing toast for silent background requests if needed, but show by default
        toast.error(message);
      }
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    }
    return Promise.reject(error);
  }
);

export default api;
