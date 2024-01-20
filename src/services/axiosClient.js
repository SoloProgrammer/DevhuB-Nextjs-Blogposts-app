import axios from "axios";
import { server } from "./api";

const axiosClient = axios.create({
  baseURL: `${server.URL}/api`,
});

export default axiosClient;
