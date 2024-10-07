#!/usr/bin/env tsx
import concurrently from "concurrently";
import chalk from "chalk";

concurrently(
  [
    {
      name: "FE",
      command: "yarn:start",
      prefixColor: "bgBlue.bold",
    },
    {
      name: "BE",
      command: "yarn:start.be",
      prefixColor: "bgMagenta.bold",
    },
  ],
  {
    killOthers: ["failure", "success"],
    killSignal: "SIGINT",
    handleInput: true,
    defaultInputTarget: "BE",
  }
);
// .result.then(_, () => {
//   console.error(chalk.red("coc fail"));
// });
console.log(chalk.blue("concurrently run"));
