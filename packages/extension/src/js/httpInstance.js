const API_URL = 'http://localhost:5000/api';

const http = axios.create({
  baseURL: API_URL,
  timeout: 3000,
  withCredentials: true,
});

http.interceptors.response.use(undefined, (error) => {
  if (axios.isCancel(error)) {
    console.log(`request cancelled`);
  }
  return Promise.reject(error.response.data.error);
});
