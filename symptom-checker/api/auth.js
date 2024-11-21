// import api setup
import { NODE_BACKEND_URL, EXPRESS_API_AUTH_URL, client } from "./utils/setup";

// Intercept responses to retrieve 'auth_token' from 'Set-Cookie' header
client.interceptors.response.use(async (response) => {
    const setCookieHeader = response.headers['set-cookie']
    console.log('Set-Cookie header : ', setCookieHeader)
    if(setCookieHeader) {
      const authToken = setCookieHeader.find(cookie => cookie.includes('auth_token'))
      if(authToken) {
        const authTokenValue = authToken.split(';')[0] // based on values seperation
        console.log('Auth Token : ', authTokenValue)
        await AsyncStorage.setItem('auth_token', authTokenValue)
      }
    }
    return response;
    
    }, error => {
        return Promise.reject(error);
  });


// POST - Guest User registration and login
export const createGuestUser = async() => {
    try {
        const response = await client.post(`${EXPRESS_API_AUTH_URL}/guest`)
        return response.data
    } catch (error) {
        console.error('Error during user registration : ', error)
        throw error;
    }
}

// POST - User registration
export const registerUser = async(userInformation) => {
    try {
        const response = await client.post(`${EXPRESS_API_AUTH_URL}/signup`, userInformation)
        return response.data
    } catch (error) {
        console.error('Error during user registration : ', error)
        throw error;
    }
}

// POST - User login
export const authenticateUser = async(userInformation) => {
    try {
        const response = await client.post(`${EXPRESS_API_AUTH_URL}/login`, userInformation)
        return response.data
    } catch (error) {
        console.error('Error during user registration : ', error)
        throw error;
    }
}

// POST - User Logout
export const invalidateUserSession = async() => {
    try {
        await client.post(`${EXPRESS_API_AUTH_URL}/logout`)
    } catch (error) {
        console.error('Error during user registration : ', error)
        throw error;
    }
}
