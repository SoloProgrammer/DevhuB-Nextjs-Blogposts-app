import axios from "axios";
import { server } from "./api";

const axioxClient = axios.create({
  baseURL: `${server.URL}/api`,
});

export default axioxClient;
