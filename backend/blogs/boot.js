import { mkConnect } from "~/dao/connect.js";
import cors from "cors";
import express from "express";
import blogsRouter from "./controllers.js";
const app = express();

mkConnect();

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
