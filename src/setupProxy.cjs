const { createProxyMiddleware } = require("http-proxy-middleware");
// !!!! 此文件必须是cjs模块,否则将被浏览器拒绝
// export default function setupProxy(app) {
//   app.use(
//     "/api",
//     createProxyMiddleware({
//       target: "http://localhost:3001",
//       changeOrigin: true,
//     })
//   );
// }
module.exports = function setupProxy(app) {
  app.use(
    "/api", // <-- or whatever path segment precedes your server side routes
    createProxyMiddleware({
      target: "http://localhost:3001", // <-- or whatever your proxy endpoint is
      changeOrigin: true,
    })
  );
};
