import axios from "axios";

const port = process.env.BE_PORT ?? 3721;
const instance = axios.create({
  baseURL: `http://localhost:${port}`,
  timeout: 5000,
});
export default instance;
