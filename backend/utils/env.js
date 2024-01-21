import path from "path";
import dotenv from "dotenv";

const env = dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
}).parsed;
export default env;
