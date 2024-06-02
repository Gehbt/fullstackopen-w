import express from "express";
import pino_http from "pino-http";
import cors from "cors";
import personRouter from "~/persons/controllers.js";
import notesRouter from "~/notes/controllers.js";
import * as middleware from "~/middleware/index.js";
import { mkConnect } from "~/dao/connect.js";
// import { requestLogger } from "~/middleware/logger.js";
import favicon from "serve-favicon";
import path from "node:path";
import blogsRouter from "~/blogs/controllers.js";
import usersRouter from "~/users/controllers.js";
import loginRouter from "~/users/login.controllers.js";
// import "express-async-errors"; // 去除 catch (exception) {next(exception)}(仅能)
const app = express();
// 接收数据
mkConnect();

app.use(cors());
app.use(express.static("../../build"));
app.use(express.json());
// app.use(requestLogger);
app.use(
  pino_http({
    transport: {
      target: "pino-pretty",
    },
  })
);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.use(favicon(path.join(process.cwd(), "assets", "favicon.ico")));
app.get("/api", (request, response) => {
  response.send(/* html */`
    <div style="display:flex;flex-direction: column; place-items: center; gap:12px;">
      <h2>now we have</h2>
      <div>
        <a href="/api/persons">/api/persons<a>
      </div>
      <div>
        <a href="/api/notes">/api/notes<a/>
      </div>
    </div>`);
});
app.use(middleware.tokenExtractor);
app.use("/api/notes", notesRouter);
app.use("/api/persons", personRouter);
app.use("/api/blogs", middleware.userExtractor, blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
