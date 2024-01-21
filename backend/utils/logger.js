// import { createLogger, format, transports } from "winston";
// import chalk from "chalk";
// const { combine, timestamp, printf, splat } = format;
// const consoleFormat = printf(({ level, message, label, timestamp }) => {
//   var levelUpper = level.toUpperCase();
//   switch (levelUpper) {
//     case "INFO":
//       message = chalk.green(message);
//       level = chalk.greenBright.bold(level);
//       break;

//     case "WARN":
//       message = chalk.yellow(message);
//       level = chalk.yellowBright(level);
//       break;

//     case "ERROR":
//       message = chalk.red(message);
//       level = chalk.redBright.bold(level);
//       break;

//     default:
//       break;
//   }
//   return `${chalk.underline(timestamp)} [${level}]: ${message}`;
// });
// // const fileFormat = printf(({ level, message, label, timestamp }) => {
// //   return `[${label}] [${timestamp}] [${level}]: ${message}`;
// // });
// const logger = createLogger({
//   level: "debug",
//   format: combine(
//     // label({ label: "BE" }),
//     timestamp({ format: "HH:MM:ss" }),
//     splat(),
//     consoleFormat
//   ),
//   transports: [
//     new transports.Console(),
//     // new transports.File({
//     //   filename: "logs/YOUR_LOG_FILE_NAME.log",
//     //   format: combine(
//     //     label({ label: "YOUR_LOG_FILE_NAME" }),
//     //     timestamp(),
//     //     format.splat(),
//     //     fileFormat
//     //   ),
//     // }),
//   ],
// });
import logger from "./logger-test.js";
export default logger;
