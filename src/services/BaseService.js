import axios from 'axios';
import { getAccessToken, logout } from "../store/AccessTokenStore";

const createHttp = (useAccessToken = false) => {
  const http = axios.create({
    baseURL: process.env.REACT_APP_URI || "http://localhost:3001/api",
    //REACT_APP_URI=https://carbuddy.cyclic.app/api
  });
    http.interceptors.request.use((request) => {
      if (useAccessToken && getAccessToken()) {
        // set token on header
        request.headers.Authorization = `Bearer ${getAccessToken()}`;
      }
      return request;
    });
    http.interceptors.response.use(
      (response) => response.data,
      (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (
          error?.response?.status &&
          [401, 403].includes(error.response.status) // en este if puedo entrar si no envío token o bien si esta expirado y el back ha devuelto un 401/403
        ) {
          if (getAccessToken()) {
            // delete token
            logout(); 
            if (window.location.pathname !== "/login") {
              window.location.assign("/login");
            }
          }
        }
        return Promise.reject(error);
      }
    );
    return http;
}

export default createHttp;