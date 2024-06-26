import cors from "cors";
import express from "express";
const app = express();

// <!-- comments
app.use(cors());
app.use(express.json());

app.get("/me", (request, response) => {
  response.json({
    created_at: new Date("2024-1-1T00:00:00"),
    email: "100@qq.com",
    user_id: 1123,
    name: "MasterD",
    update_at: new Date("2024-2-1T00:00:00"),
  });
});
app.get("/session", (request, response) => {
  response.json({
    created_at: new Date("2024-1-1T00:00:00"),
    email: "100@qq.com",
    user_id: 1,
    name: "MasterD",
    update_at: new Date("2024-2-1T00:00:00"),
  });
});
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
