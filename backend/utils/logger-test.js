import pino from "pino";
/**
 * @type {import("pino-pretty".PrettyOptions)} type - description
 */
const customPPOption = {
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
  levelFirst: true,
  crlf: true,
  // hideObject: true,
  ignore: "hostname,pid,reqId,responseTime",
  messageKey: "msg",
  // include: "level,time,res,req",
  // singleLine: true,
};

const logger = pino({
  transport: {
    target: "pino-pretty",
    dedupe: true,
    options: customPPOption,
    levels: ["fatal", "error", "warn", "info", "debug", "trace"],
  },
  wrapSerializers: true,
  serializers: {
    err: pino.stdSerializers.err,
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
  },
  customLogLevel: function (req, res, err) {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return "warn";
    } else if (res.statusCode >= 500 || err) {
      return "error";
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return "silent";
    }
    return "info";
  },
  customSuccessMessage: function (req, res) {
    if (res.statusCode === 404) {
      return "resource not found";
    }
    return `${req.method} completed`;
  },
});

export default logger;
