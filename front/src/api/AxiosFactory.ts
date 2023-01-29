import axios from 'axios';

class AxiosFactory {
  public readonly axiosInstance: any;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:3001',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
  }
}

export const axiosFactory = new AxiosFactory();
