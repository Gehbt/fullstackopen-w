import App from "~/app/index.js";
import http from "http";
import logger from "~/utils/logger.js";
import env from "~/utils/env.js";
import "dotenv/config";
const server = http.createServer(App);
/// fin.
const PORT = env.BE_PORT || 3721;
server.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
