import axios from "axios";
import { server } from "./api";

const axiosClient = axios.create({
  baseURL: `${server.URL}/api`,
  headers: {
    "Cache-Control": "no-cache",
  },
});

export const axiosBaseQuery =
  ({ baseURL } = { baseURL: "" }) =>
  async ({ url, method, data, ...args }) => {
    try {
      const result = await axiosClient({
        url: baseURL + url,
        method,
        data,
        ...args,
      });
      return { data: result.data };
    } catch (err) {
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data?.message || err.message,
        },
      };
    }
  };

export default axiosClient;
