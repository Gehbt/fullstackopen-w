import dotenv from "dotenv";
import path from "path";
const env = dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
console.log("env :>> ", env);
