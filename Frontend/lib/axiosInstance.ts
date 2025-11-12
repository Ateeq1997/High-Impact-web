// lib/axiosInstance.t

import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:4000', // Local host URL
  //: 'https://api.highimpact.com', // Production URL
  baseURL: 'https://highimpact.com', // Development URL

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
