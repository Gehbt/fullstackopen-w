import express from "express";
import cors from "cors";
import { createPersonServer } from "./persons/index.js";
import { createNotesServer } from "./notes/index.js";
import { errorHandler, unknownEndpoint } from "./middleware/error.js";

const app = express();
// 接收数据
app.use(express.json());
app.use(cors());
app.use(express.static("../build"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
app.get("/api", (request, response) => {
  response.send(/* html */ `<div style="display:flex;flex-direction: column; place-items: center; gap:12px;">
    <h2>now we have</h2>
      <div>
        <a href="/api/persons">/api/persons<a>
      </div>
      <div>
        <a href="/api/notes">/api/notes<a/>
      </div>
    </div>`);
});

createNotesServer(app);
createPersonServer(app);

app.use(unknownEndpoint);
app.use(errorHandler);
/// fin.
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
