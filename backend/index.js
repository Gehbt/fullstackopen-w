import app from "~/app/index.js";
import http from "http";
import logger from "~/utils/logger.js";
import env from "~/utils/env.js";
import 'dotenv/config'
const server = http.createServer(app);
/// fin.
const PORT = env.PORT || 3001;
server.listen(PORT, () => {
  logger.info(`Server running on port http://localhost:${PORT}`);
});
