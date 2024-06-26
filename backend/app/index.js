import express from "express";
import pino from "pino";
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
import testingRouter from "~/testing/controllers";
import {
  custom_pino_pretty_Option,
  pino_serializers,
} from "~/utils/logger-pino";
// import "express-async-errors"; // 去除 catch (exception) {next(exception)}(仅能)
// import { createProxyMiddleware } from "http-proxy-middleware";
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
      /** @type {import("pino-pretty").PrettyOptions} */
      options: custom_pino_pretty_Option,
    },
    serializers: pino_serializers,
  })
);
// app.use(
//   "/api",
//   createProxyMiddleware({
//     target: "http://localhost:3720",
//     changeOrigin: true,
//   })
// );

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.use(favicon(path.join(process.cwd(), "assets", "favicon.ico")));
app.get("/api", (request, response) => {
  response.send(/* html */ `
    <div style="display:flex; flex-direction:column; place-items:center; gap:12px;">
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
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  app.use("/api/testing", testingRouter);
}
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
