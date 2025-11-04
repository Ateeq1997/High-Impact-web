// lib/axiosInstance.t

import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000', // Local host URL
  //: 'https://api.deventiatech.com', // Production URL
  baseURL: 'https://devapi.deventiatech.com', // Development URL

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
