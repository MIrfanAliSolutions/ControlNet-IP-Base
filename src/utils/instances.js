import { NEXT_PUBLIC_API_URL, NEXT_PUBLIC_CHAT_API_URL } from '@/config/config';
import axios from 'axios';

// Create cancel token sources
const { CancelToken } = axios;
export const cancelTokenSource = CancelToken.source();

export const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'skip-browser-warning',
  },
  cancelToken: cancelTokenSource.token,
});

export const chatInstance = axios.create({
  baseURL: NEXT_PUBLIC_CHAT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  cancelToken: cancelTokenSource.token,
});