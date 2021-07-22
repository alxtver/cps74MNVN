import axios, { AxiosInstance } from 'axios';

class AxiosFactory {
  public readonly axiosInstance: AxiosInstance;

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
