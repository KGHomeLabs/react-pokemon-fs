import axios from 'axios';


export function createAxiosInstance(baseURL: string, timeout = 10000) {
    
    const instance = axios.create({ baseURL, timeout });
    
    instance.interceptors.request.use((config) => {
    // Add auth headers or tokens here
    // config.headers.Authorization = `Bearer ${yourToken}`;
    return config;
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            // You could transform or log the error here globally
            console.error('[Axios Error]', error);
            return Promise.reject(error);
        }
    );

    return instance;
}

