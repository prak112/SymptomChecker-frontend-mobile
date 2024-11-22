import axios from "axios"

// import backend config from .env
export const NODE_BACKEND_URL = process.env.EXPO_PUBLIC_NODE_BACKEND_URL
export const EXPRESS_API_SERVICE_URL = process.env.EXPO_PUBLIC_SERVICE_URL
export const EXPRESS_API_AUTH_URL = process.env.EXPO_PUBLIC_AUTH_URL


// Setup client config
export const client = axios.create({
  baseURL: NODE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,  // Ensure cookies are included in requests
});