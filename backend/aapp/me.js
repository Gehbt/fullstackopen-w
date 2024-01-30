import cors from "cors";
import express from "express";
const app = express();
app.use(cors());
app.use(express.json());

app.get("/me", (request, response) => {
  response.json({
    created_at: new Date("2024-1-1T00:00:00"),
    email: "100@qq.com",
    id: 1,
    name: null,
    update_at: new Date(),
  });
});
app.get("/session", (request, response) => {
  response.json({
    created_at: new Date("2024-1-1T00:00:00"),
    email: "100@qq.com",
    id: 1,
    name: null,
    update_at: new Date(),
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
