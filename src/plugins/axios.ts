import axios from "axios";
import qs from "qs";

const baseURL = 'http://localhost:3001';
const axiosInstance = axios.create({
  baseURL: baseURL,
  paramsSerializer: (params: unknown) =>
    qs.stringify(params, { arrayFormat: "repeat" }),
});

export default axiosInstance;
