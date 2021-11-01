import axios, { AxiosResponse } from "axios";

// axios.defaults.baseURL = "http://localhost:9889/api/";

axios.defaults.baseURL = "https://server-da-book.herokuapp.com/api/";

interface IApi {
  get: (url: string) => Promise<AxiosResponse | undefined>;
  post: (url: string, data: any) => Promise<AxiosResponse | undefined>;
}

class Api implements IApi {
  async get(url: string, option?: any) {
    try {
      const res = await axios.get(url, option);
      return res;
    } catch (err: any) {
      return Promise.reject(err.response.data.error);
    }
  }
  async post(url: string, data: any, option?: any) {
    try {
      const res = await axios.post(url, data, option);
      return res;
    } catch (err: any) {
      return Promise.reject(err.response.data.error);
    }
  }
  async put(url: string, data: any, option?: any) {
    try {
      const res = await axios.put(url, data, option);
      return res;
    } catch (err: any) {
      return Promise.reject(err.response.data.error);
    }
  }
}

const api = new Api();

export default api;
