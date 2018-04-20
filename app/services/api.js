import { getAuthToken } from './localStorage';
import fetch from '../utils/fetch';

const createAPI = () => {
  const baseURL = 'localhost:8000';
  const httpMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  const headers = { 'Content-Type': 'application/json' };

  const api = {};

  httpMethods.forEach((method) => {
    api[method.toLowerCase()] = function* (endpoint, body, options) {
      const url = `${baseURL}${endpoint}`;
      let authToken = getAuthToken();
      if (authToken) {
        authToken = `Token ${authToken}`;
        headers.Authorization = authToken;
      }
      try {
        const response = yield fetch(url, { method, body: method === 'GET' ? null : JSON.stringify(body), headers, ...options });
        return response;
      } catch (error) {
        throw error;
      }
    };
  });

  return api;
};

export const authRequest = createAPI(null, null, getAuthToken);
export const request = createAPI();

export default createAPI;
