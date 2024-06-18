import pino from "pino";
/**
 * @type {import("pino-pretty".PrettyOptions)} type - description
 */
export const custom_pino_pretty_Option = {
  translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
  levelFirst: true,
  crlf: true,
  // hideObject: true,
  ignore: "hostname,pid,reqId,responseTime",
  messageKey: "msg",
  // include: "level,time,res,req",
  // singleLine: true,
};
/**
 * @param {object} obj
 * @returns {obj is {}}
 */
function isObjEmpty(obj) {
  return Object.keys(obj).length === 0;
}
/**
 *
 * @param {object} obj
 * @returns {object | undefined}
 */
const undefinedAEmpty = (obj) => {
  if (isObjEmpty(obj)) {
    return undefined;
  } else {
    return obj;
  }
};
/**
 * @type {pino.LoggerOptions<never>["serializers"]} type - description
 */
export const pino_serializers = {
  err: pino.stdSerializers.err,
  req: (income) => {
    const req = pino.stdSerializers.req(income);
    const query = undefinedAEmpty(req.query);
    const params = undefinedAEmpty(req.params);
    const maps = ["query", "params"];
    const notDisplayEmpty = () => {
      return /** @type {[string,string]} 这里的转换只是方便理解 */ ([
        query,
        params,
      ]).reduce((cur, acc, index) => {
        if (acc) {
          return `${cur} | ${maps[index]}:${acc}`;
        } else {
          return cur;
        }
      }, "");
    };
    return `${req.id} | ${req.method} | ${req.url}` + notDisplayEmpty();
  },
  res: (income) => {
    // res 的 statusCode 在最外
    // pino.stdSerializers.res(income) 似乎只输出 statusCode: null
    return `${income.statusCode}`;
  },
};

const logger = pino({
  transport: {
    target: "pino-pretty",
    dedupe: true,
    options: custom_pino_pretty_Option,
    levels: ["fatal", "error", "warn", "info", "debug", "trace"],
  },
  wrapSerializers: true,
  serializers: pino_serializers,
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
    } else return `${req.method} completed`;
  },
});

export default logger;
