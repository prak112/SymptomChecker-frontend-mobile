// import api setup
import axios from "axios";
import { NODE_BACKEND_URL, EXPRESS_API_SERVICE_URL, client } from "./utils/setup";
import AsyncStorage from "@react-native-async-storage/async-storage";


// Intercept requests to add 'Cookie' header
client.interceptors.request.use(async (config) => {
    const authToken = await AsyncStorage.getItem('auth_token')
    if (authToken) {
        config.headers['Cookie'] = authToken; // backend middleware requirement-header
    }
    return config;
    }, error => {
        return Promise.reject(error);
});


// POST - 'General' search result from symptoms payload (symptoms + diagnosis preference)
export const getGeneralDiagnosis = async(symptoms) => {
    try {
        const response = await client.post(`${EXPRESS_API_SERVICE_URL}/symptoms/general`, symptoms)
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
        const response = await client.post(`${EXPRESS_API_SERVICE_URL}/symptoms/specific`, symptoms)
        console.log('client service calling backend for Specific Diagnosis...')
        return response.data
    } catch (error) {
        console.error('Error during Specific search : ', error)
        throw error
    }
}