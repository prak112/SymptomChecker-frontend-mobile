import axios from "axios"

// import backend config from .env
const NODE_BACKEND_URL = process.env.EXPO_PUBLIC_NODE_BACKEND_URL
const EXPRESS_API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL

// Setup client config
const client = axios.create({
  baseURL: NODE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const apiURL = EXPRESS_API_BASE_URL


// POST - 'General' search result from symptoms payload (symptoms + diagnosis preference)
export const getGeneralDiagnosis = async(symptoms) => {
    try {
        const response = await client.post(`${apiURL}/symptoms/general`, symptoms)
        console.log('client service calling backend for General Diagnosis...')
        return response.data
    } catch (error) {
        console.error('Error during General search : ', error)
        throw error
    }
}

// POST - 'Specific' search result from symptoms payload (symptoms + diagnosis preference)
export const getSpecificDiagnosis = async(symptoms) => {
    try {
        const response = await client.post(`${apiURL}/symptoms/specific`, symptoms)
        console.log('client service calling backend for Specific Diagnosis...')
        return response.data
    } catch (error) {
        console.error('Error during Specific search : ', error)
        throw error
    }
}